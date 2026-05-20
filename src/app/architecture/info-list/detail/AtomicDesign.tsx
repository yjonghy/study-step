export default function AtomicDesign() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Atomic Design — 컴포넌트 설계 전략</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <strong>Atomic Design</strong>은 UI를 원자(Atom) → 분자(Molecule) → 유기체(Organism) → 템플릿 → 페이지로 계층화해 설계하는 방법론이다.
                재사용성과 일관성을 높이고, 팀 내 컴포넌트 분류 기준을 통일한다.
            </p>

            {/* 5단계 계층 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">5단계 계층 구조</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["단계", "설명", "예시"],
                        ["Atoms (원자)", "더 이상 분해 불가한 최소 단위", "Button, Input, Label, Icon"],
                        ["Molecules (분자)", "Atom을 결합한 작은 기능 단위", "SearchBar, FormField, Toast"],
                        ["Organisms (유기체)", "독립 기능을 갖는 복합 영역", "Header, ProductCard, Modal"],
                        ["Templates (템플릿)", "레이아웃 와이어프레임 — 실 데이터 없음", "TwoColumnLayout, DashboardTemplate"],
                        ["Pages (페이지)", "실 데이터가 채워진 최종 화면", "HomePage, InterviewDetailPage"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-blue040 font-bold"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs font-mono ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 디렉토리 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 디렉토리 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`src/component/
├── atoms/              # 최소 단위 — 외부 의존성 없음
│   ├── Button/
│   ├── Input/
│   └── Icon/
│
├── molecules/          # Atom 조합 — 작은 기능 단위
│   ├── SearchBar/
│   ├── Modal/
│   └── Toast/
│
├── feature/            # 도메인 기능 컴포넌트 (Organism 수준)
│   ├── interview/      # 면접 관련 기능 컴포넌트 묶음
│   │   ├── rating/     # 평가 UI
│   │   ├── chatting/   # 채팅
│   │   └── timer/      # 타이머
│   └── result/         # 결과 화면 컴포넌트 묶음
│
└── assets/             # 폰트, 아이콘, 이미지 정의`}</p>
                </div>
            </div>

            {/* 계층별 원칙 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">계층별 핵심 원칙</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Atoms — 순수 UI, 의존성 없음</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// ✅ Atom: props만 받고 외부 상태 없음
function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }))}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ❌ Atom에서 API 호출 금지
function Button() {
  const { data } = useQuery(...); // Atom에 들어오면 안 됨
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Feature 컴포넌트 — 도메인 로직 포함</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// Feature: 도메인 상태·API 호출 가능
function InterviewRating() {
  const { data: evaluation } = useEvaluationQuery();
  const { mutate: saveScore } = useSaveScoreMutation();
  const { RatingComponent } = useDomainConfig().components;

  return (
    <div>
      <RatingComponent
        items={evaluation.competencies}
        onSave={saveScore}
      />
    </div>
  );
}`}</p>
                    </div>
                </div>
            </div>

            {/* 실무에서의 변형 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 적용 시 유연한 해석</p>
                <p className="text-gray060 body-sm">
                    교과서대로 5단계를 엄격히 지키면 오히려 복잡해진다. 실무에서는 보통 3단계로 단순화한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["atoms/", "재사용 가능한 최소 UI 단위 (Button, Input 등)"],
                        ["molecules/ or components/", "atoms 조합 또는 공통 UI 컴포넌트 (Modal, Toast)"],
                        ["feature/ or pages/", "도메인 로직이 있는 페이지 수준 컴포넌트"],
                    ].map(([dir, desc], i) => (
                        <div key={i} className="flex items-start gap-[8px] px-[10px] py-[6px] bg-gray010 rounded-[6px]">
                            <p className="body-xs font-mono text-blue040 min-w-[120px] flex-shrink-0">{dir}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">설계 원칙 요약</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 하위 계층은 상위 계층에 의존하지 않는다 — Atom은 Molecule을 import하지 않음</p>
                    <p className="body-xs text-blue030">• Atom·Molecule은 외부 상태(Zustand, React Query) 의존 금지 — props로만 통신</p>
                    <p className="body-xs text-blue030">• 컴포넌트가 어느 계층인지 모호하면 더 작게 쪼개거나 상위 계층으로 올린다</p>
                    <p className="body-xs text-blue030">• 5단계 엄격 적용보다 팀이 합의한 3단계 구조가 실무에서 더 효과적</p>
                </div>
            </div>
        </article>
    )
}
