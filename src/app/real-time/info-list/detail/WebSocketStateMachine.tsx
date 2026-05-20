export default function WebSocketStateMachine() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">WebSocket 재연결 & 상태머신</p>
            <p className="text-gray060 body-sm mt-[16px]">
                프로덕션 WebSocket 시스템은 단순한 on/off가 아니라 <strong>명확한 상태 전이를 갖는 상태머신</strong>으로 설계해야 한다.
                네트워크 단절 · 서버 재배포 · 클라이언트 오프라인 등 다양한 예외 상황을 일관되게 처리할 수 있다.
            </p>

            {/* 5단계 상태머신 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">5단계 연결 상태머신</p>
                <p className="text-gray060 body-sm">각 상태는 명확한 진입 조건과 전이 조건을 갖는다.</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["상태", "의미", "전이 조건"],
                        ["idle", "초기 / 로그아웃 상태", "userId 확보 시 → bootstrapping"],
                        ["bootstrapping", "소켓 연결 중 · register emit 대기", "ack 수신 시 → ready / 타임아웃 시 → reconnecting"],
                        ["ready", "정상 연결 · 룸 참여 완료", "서버 disconnect 시 → reconnecting"],
                        ["pending_rebalance", "서버 재시작으로 인한 재배치 대기", "rebalance 완료 시 → bootstrapping"],
                        ["reconnecting", "자동 재연결 시도 중", "재연결 성공 시 → bootstrapping"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs font-mono ${i === 0 ? "text-gray080 font-bold" : "text-blue040"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{c}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line font-mono">{`idle → bootstrapping → ready → pending_rebalance → reconnecting
                              ↑___________________________|`}</p>
                </div>
            </div>

            {/* connectionGeneration */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">connectionGeneration — stale ack 방지</p>
                <p className="text-gray060 body-sm">
                    소켓이 끊겼다 재연결되면 이전 연결의 비동기 응답(ack, setTimeout)이 <strong>뒤늦게 도착</strong>해 현재 상태를 덮어쓸 수 있다.
                    <span className="font-mono text-gray080"> connectionGeneration</span> (연결 순번)을 비교해 구세대 응답을 무시한다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 재연결마다 generation 증가
let connectionGeneration = 0;

function onConnect() {
  connectionGeneration++;
  const myGeneration = connectionGeneration;

  socket.emit("register", { userId }, (ack) => {
    // 재연결 중에 이전 ack가 늦게 도착한 경우 무시
    if (myGeneration !== connectionGeneration) {
      console.info("Ignoring stale register ack");
      return;
    }
    // 정상 처리 계속
    completeBootstrap(myGeneration);
  });
}

// useEffect에도 동일하게 적용
useEffect(() => {
  const gen = connectionGeneration;
  // ... 리스너 등록

  return () => {
    if (gen === connectionGeneration) cleanup();
  };
}, [connectionGeneration]); // 재연결 시마다 effect 재실행`}</p>
                </div>
            </div>

            {/* Room Registry */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Room Registry — 자동 복구</p>
                <p className="text-gray060 body-sm">
                    재연결 시 어떤 룸에 있었는지 기억해야 자동으로 다시 joinRoom할 수 있다.
                    클라이언트가 참여 중인 룸을 <strong>메모리 Map으로 관리</strong>하고, 재연결 완료 후 전부 replay한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Room Registry 구조</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// room-registry.ts
const roomRegistry = new Map<string, RoomMeta>();

export function joinRoom(roomId: string, meta: RoomMeta) {
  roomRegistry.set(roomId, meta);
  socket.emit("joinRoom", { roomId });
}

export function leaveRoom(roomId: string) {
  roomRegistry.delete(roomId);
  socket.emit("leaveRoom", { roomId });
}

// 재연결 시 replay
export function replayAllRooms() {
  for (const [roomId] of roomRegistry) {
    socket.emit("joinRoom", { roomId });
  }
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">재연결 시 복구 흐름</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`socket.on("connect", () => {
  connectionGeneration++;
  rebalanceState = "bootstrapping";

  socket.emit("register", { userId }, (ack) => {
    if (!validateGeneration()) return;

    // 이전에 있던 룸 전부 다시 참여
    replayAllRooms();

    rebalanceState = "ready";
  });
});`}</p>
                    </div>
                </div>
            </div>

            {/* register ack 타임아웃 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">register ack 타임아웃 처리</p>
                <p className="text-gray060 body-sm">
                    서버가 응답하지 않으면 무한 대기 상태가 된다. 일정 시간 내에 ack가 오지 않으면 <strong>강제 재연결</strong>한다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const REGISTER_ACK_TIMEOUT_MS = 5000;

function emitRegisterWithTimeout(generation: number) {
  const timer = setTimeout(() => {
    if (generation !== connectionGeneration) return;
    console.warn("register ack timeout — reconnecting");
    socket.disconnect();
    socket.connect(); // 재연결 시도
  }, REGISTER_ACK_TIMEOUT_MS);

  socket.emit("register", { userId }, (ack) => {
    clearTimeout(timer);
    if (generation !== connectionGeneration) return;
    handleRegisterSuccess(ack);
  });
}`}</p>
                </div>
            </div>

            {/* Zustand + useEffect 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Zustand + 전역 훅 패턴</p>
                <p className="text-gray060 body-sm">
                    소켓 인스턴스와 상태를 <strong>Zustand 스토어</strong>에서 관리하면 어느 컴포넌트에서든 상태를 구독·emit 할 수 있다.
                    전역 훅은 앱 최상단에 단 한 번만 마운트한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">소켓 스토어 (Zustand)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// stores/socket.ts
type RebalanceState = "idle" | "bootstrapping" | "ready" | "pending_rebalance" | "reconnecting";

const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  rebalanceState: "idle" as RebalanceState,
  connectionGeneration: 0,

  connect: (userId: string) => {
    const socket = io(SOCKET_URL, { autoConnect: false });
    set({ socket });
    socket.connect();
  },

  emit: (event, data) => get().socket?.emit(event, data),
}));`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">전역 훅 — 앱 최상단에 1회 마운트</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// hooks/use-workspace-socket.tsx
export function useWorkspaceSocket() {
  const { socket, connectionGeneration } = useSocketStore();

  // 재연결마다 리스너 재등록
  useEffect(() => {
    if (!socket) return;
    const gen = connectionGeneration;

    socket.on("connect", () => handleConnect(gen));
    socket.on("disconnect", () => handleDisconnect());
    socket.on("server:rebalance", () => handleRebalance(gen));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("server:rebalance");
    };
  }, [socket, connectionGeneration]);
}

// App.tsx
function App() {
  useWorkspaceSocket(); // 단 한 번만
  return <Router />;
}`}</p>
                    </div>
                </div>
            </div>

            {/* 핵심 원칙 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">설계 원칙 요약</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 소켓 연결은 상태머신으로 모델링 — 각 상태의 책임을 명확히 분리</p>
                    <p className="body-xs text-blue030">• connectionGeneration으로 stale 비동기 응답을 방지 — race condition 차단</p>
                    <p className="body-xs text-blue030">• Room Registry로 룸 참여 목록을 메모리에 유지 — 재연결 시 자동 복구</p>
                    <p className="body-xs text-blue030">• register ack 타임아웃으로 무한 대기 방지 — 5초 내 응답 없으면 강제 재연결</p>
                    <p className="body-xs text-blue030">• 전역 훅은 앱 최상단 1회 마운트 — 하위 컴포넌트에서 소켓 인스턴스 직접 생성 금지</p>
                </div>
            </div>
        </article>
    )
}
