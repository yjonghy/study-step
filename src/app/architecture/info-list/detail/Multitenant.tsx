export default function Multitenant() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">멀티테넌트 아키텍처</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <strong>멀티테넌트(Multi-tenant)</strong>란 단일 빌드 결과물이 여러 기관(테넌트)에서 서로 다른 UI·로직으로 동작하는 아키텍처다.
                각 기관마다 별도 레포를 유지하면 유지보수 비용이 N배로 늘어나므로,
                <strong>런타임에 기관을 식별해 분기</strong>하는 패턴을 사용한다.
            </p>

            {/* 문제 상황 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">왜 필요한가?</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["기관별 레포 분리", "코드 중복, 버그 수정 N번, 배포 N번 → 유지보수 지옥"],
                        ["단순 if 분기", "컴포넌트 내부에 if/else 난무 → 코드 가독성 파괴"],
                        ["멀티테넌트 패턴", "단일 진입점에서 기관 감지 후 설정 객체로 전달 → 관심사 분리"],
                    ].map(([label, desc], i) => (
                        <div key={i} className="flex items-start gap-[8px] px-[10px] py-[6px] bg-gray010 rounded-[6px]">
                            <p className={`body-xs font-bold min-w-[140px] flex-shrink-0 ${i === 2 ? "text-blue040" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 2 ? "text-gray060" : "text-gray050"}`}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* DomainConfig 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">DomainConfig 패턴 — hostname 기반 런타임 분기</p>
                <p className="text-gray060 body-sm">
                    <span className="font-mono text-gray080">window.location.hostname</span>을 보고 기관 설정 객체를 반환하는 함수를 단 한 곳에 작성한다.
                    모든 분기는 이 함수를 통해서만 이루어진다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">DomainConfig 인터페이스 정의</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// shared/constant/domain-object/types.ts
type DomainConfig = {
  name: string;
  hostnames: string[];

  // 기관별 컴포넌트 교체
  components: {
    RatingComponent: ComponentType;
    ScoreTableComponent: ComponentType;
  };

  // 기관별 상태 판별 로직
  stateFunctions: {
    isInterviewStarted: (state: InterviewState) => boolean;
  };

  // 기능 플래그 (서버 options와 분리)
  features: {
    recordEnabled: boolean;
    chatEnabled: boolean;
  };
};`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기관별 설정 파일</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// domain-object/domains/kb.ts
export const kbConfig: DomainConfig = {
  name: "KB",
  hostnames: ["kb-interview.com", "kb-dev.com"],
  components: {
    RatingComponent: KBRatingComponent, // KB 전용 평가표
    ScoreTableComponent: KBScoreTable,
  },
  stateFunctions: {
    isInterviewStarted: (s) => s.status === "KB_ACTIVE",
  },
  features: { recordEnabled: true, chatEnabled: false },
};

// domain-object/domains/korail.ts
export const korailConfig: DomainConfig = {
  name: "Korail",
  hostnames: ["korail-interview.com"],
  components: {
    RatingComponent: KorailRatingComponent,
    ScoreTableComponent: DefaultScoreTable,
  },
  stateFunctions: {
    isInterviewStarted: (s) => s.status === "ACTIVE",
  },
  features: { recordEnabled: false, chatEnabled: true },
};`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">단일 분기 진입점</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// domain-object/index.ts — 여기서만 분기
export function getDomainConfig(): DomainConfig {
  const host = window.location.hostname;

  if (kbConfig.hostnames.some((h) => host.includes(h))) return kbConfig;
  if (korailConfig.hostnames.some((h) => host.includes(h))) return korailConfig;
  if (kospocvConfig.hostnames.some((h) => host.includes(h))) return kospocvConfig;

  return originConfig; // 기본값

  // 로컬 테스트 시 임시 활성화:
  // return kbConfig;
}

// 편의 함수
export const useDomainConfig = () => getDomainConfig();
export const isKB = () => getDomainConfig().name === "KB";`}</p>
                    </div>
                </div>
            </div>

            {/* 컴포넌트에서 사용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">컴포넌트에서 사용</p>
                <p className="text-gray060 body-sm">
                    컴포넌트는 분기를 모른다. <span className="font-mono text-gray080">DomainConfig</span>에서 받은 컴포넌트·함수를 그대로 사용한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">컴포넌트 교체</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function InterviewPage() {
  const config = useDomainConfig();
  const { RatingComponent } = config.components;

  // 기관에 따라 다른 컴포넌트가 렌더링됨 — if/else 없음
  return (
    <div>
      <RatingComponent />
    </div>
  );
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기능 플래그</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function InterviewController() {
  const { features } = useDomainConfig();

  return (
    <div>
      {features.recordEnabled && <RecordButton />}
      {features.chatEnabled && <ChatPanel />}
    </div>
  );
}`}</p>
                    </div>
                </div>
            </div>

            {/* 서버 options와의 관계 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">서버 Options vs DomainConfig 분리</p>
                <p className="text-gray060 body-sm">
                    런타임에 서버 API 응답으로 오는 옵션(<span className="font-mono text-gray080">workspaces[].options</span>)과
                    빌드 타임에 결정되는 DomainConfig를 혼용하면 복잡해진다. 역할을 명확히 분리한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "DomainConfig", "Server Options"],
                        ["결정 시점", "빌드 타임 / 앱 초기화", "로그인 후 API 응답"],
                        ["관리 위치", "프론트엔드 코드", "서버 DB"],
                        ["용도", "컴포넌트 교체, 기관 식별", "기능 on/off, 세부 설정"],
                        ["변경 방법", "코드 수정 + 배포", "서버 DB 수정 (즉시 반영)"],
                        ["예시", "KB 전용 평가 UI", "녹화 기능 활성화 여부"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-blue040"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 멀티테넌트 에셋 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">멀티테넌트 에셋 — 타이틀 · 로고 · 파비콘 동적 교체</p>
                <p className="text-gray060 body-sm">
                    기관별 브랜딩(로고, 파비콘, 타이틀)을 S3에 저장하고 앱 초기화 시 fetch해 동적으로 교체한다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 앱 초기화 시 기관별 에셋 fetch
async function initAssets() {
  // S3 URL에 기관 식별자 포함
  const url = \`\${VITE_ASSET_S3_URL}/client_settings.json\`;
  const settings = await fetch(url).then((r) => r.json());

  // 타이틀 교체
  document.title = settings.title;

  // 파비콘 교체
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
  link.href = settings.faviconUrl;

  // 전역 상태에 저장
  useAssetStore.getState().setSettings(settings);
}

// App.tsx
useEffect(() => { initAssets(); }, []);`}</p>
                </div>
            </div>

            {/* 새 기관 추가 방법 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">새 기관 추가 체크리스트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">① domains/neworg.ts — DomainConfig 구현 후 export</p>
                    <p className="body-xs text-blue030">② index.ts의 getDomainConfig()에 hostname 조건 추가</p>
                    <p className="body-xs text-blue030">③ 기관별 컴포넌트가 필요하면 component/feature/ 하위에 neworg 폴더 추가</p>
                    <p className="body-xs text-blue030">④ S3에 기관별 client_settings.json 업로드</p>
                    <p className="body-xs text-blue030">⑤ 로컬 테스트: index.ts localhost 분기 임시 활성화</p>
                    <p className="body-xs text-blue030">• 컴포넌트 내부에서 hostname 직접 체크 금지 — 분기는 getDomainConfig() 한 곳에만</p>
                </div>
            </div>
        </article>
    )
}
