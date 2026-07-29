export default function BroadcastChannelDoc() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">BroadcastChannel</p>
            <p className="text-gray060 body-sm mt-[16px]">
                BroadcastChannel은 같은 origin 안에서 열린 여러 탭, 창, iframe 사이에 메시지를 주고받는 브라우저 API다.<br />
                로그인 상태 동기화, 다중 탭 알림, 중복 작업 방지처럼 “한 사용자가 여러 탭을 열었을 때”의 상태 일관성을 맞출 때 유용하다.
            </p>

            <div className="mt-[28px] grid grid-cols-2 mobile:grid-cols-1 gap-[8px]">
                <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">적합한 상황</p>
                    <p className="body-xs text-gray060">탭 A에서 로그아웃하면 탭 B도 즉시 로그아웃 처리, 결제/업로드 같은 중복 실행 방지, 관리자 화면 간 알림 동기화.</p>
                </div>
                <div className="bg-yellow005 border border-yellow020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-yellow060 font-bold mb-[4px]">주의할 점</p>
                    <p className="body-xs text-gray060">같은 origin에서만 동작하고, 메시지는 영구 저장되지 않는다. 새로 열린 탭은 이전 메시지를 받을 수 없다.</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 사용</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const channel = new BroadcastChannel("auth");

channel.postMessage({
  type: "LOGOUT",
  reason: "USER_CLICK",
});

channel.onmessage = (event) => {
  if (event.data.type === "LOGOUT") {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/sign-in";
  }
};

// 컴포넌트 unmount 시 정리
channel.close();`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React Hook 예시</p>
                <p className="text-gray060 body-sm">
                    채널 생성과 이벤트 정리를 Hook으로 감싸면 인증, 알림, 작업 잠금 같은 기능에서 재사용하기 쉽다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function useBroadcastChannel<T>(
  name: string,
  onMessage: (message: T) => void
) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel(name);
    channelRef.current = channel;

    channel.onmessage = (event) => onMessage(event.data);

    return () => channel.close();
  }, [name, onMessage]);

  return (message: T) => {
    channelRef.current?.postMessage(message);
  };
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">로그아웃 동기화 패턴</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`type AuthMessage =
  | { type: "LOGOUT" }
  | { type: "TOKEN_REFRESHED"; accessToken: string };

function useAuthSync() {
  const publish = useBroadcastChannel<AuthMessage>("auth", (message) => {
    if (message.type === "LOGOUT") {
      clearAuthStorage();
      router.replace("/sign-in");
    }

    if (message.type === "TOKEN_REFRESHED") {
      setAccessToken(message.accessToken);
    }
  });

  return {
    logoutAllTabs: () => {
      clearAuthStorage();
      publish({ type: "LOGOUT" });
    },
  };
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 메시지 타입을 union type으로 정의하면 수신부 분기 누락을 줄일 수 있다.</p>
                    <p className="body-xs text-blue030">• Safari 구버전 대응이 필요하면 localStorage storage 이벤트를 fallback으로 둔다.</p>
                    <p className="body-xs text-blue030">• 탭 간 “현재 상태”가 필요하면 메시지만 믿지 말고 localStorage, IndexedDB, 서버 상태를 함께 조회한다.</p>
                </div>
            </div>
        </article>
    )
}
