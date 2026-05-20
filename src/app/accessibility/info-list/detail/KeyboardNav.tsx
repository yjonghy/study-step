export default function KeyboardNav() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">키보드 내비게이션 & 포커스 관리</p>
            <p className="text-gray060 body-sm mt-[16px]">
                마우스를 사용하지 못하는 사용자는 키보드만으로 페이지를 탐색한다.
                포커스 순서·표시·트랩이 올바르게 구현되어야 접근 가능한 UI가 된다.
            </p>

            {/* tabIndex */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">tabIndex — 포커스 순서 제어</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["tabIndex={0}", "기본 탭 순서에 포함 (비인터랙티브 요소를 포커스 가능하게)"],
                        ["tabIndex={-1}", "탭 순서에서 제외, 하지만 .focus()로 프로그래밍 포커스 가능"],
                        ["tabIndex={N > 0}", "사용 금지 — 자연스러운 DOM 순서를 뒤흔들어 혼란 유발"],
                    ].map(([attr, desc]) => (
                        <div key={attr} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs font-mono text-blue030 shrink-0 w-[160px]">{attr}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 커스텀 카드 컴포넌트 — 클릭·엔터·스페이스 모두 처리
function ClickableCard({ onClick, children }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}
// 사실 <button>을 쓰면 이 모든 처리가 내장됨 — 가능하면 button을 쓸 것`}</p>
                </div>
            </div>

            {/* 포커스 표시 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">포커스 표시 — outline 절대 숨기지 말 것</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">나쁜 패턴</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`/* 절대 금지 — 키보드 사용자가 위치를 잃음 */
* { outline: none; }
button:focus { outline: none; }`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">좋은 패턴 — :focus-visible 활용</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`/* 마우스 클릭 시엔 숨기고, 키보드 포커스 시에만 표시 */
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Tailwind */
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"`}</p>
                    </div>
                </div>
            </div>

            {/* 포커스 트랩 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">포커스 트랩 — 모달 안에 포커스 가두기</p>
                <p className="text-gray060 body-sm">모달이 열려 있는 동안 Tab 키로 모달 밖의 요소에 포커스가 이동하면 안 된다. 마지막 요소에서 Tab 시 첫 요소로 돌아와야 한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function useFocusTrap(ref: RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusable = ref.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [isActive]);
}

// 라이브러리 대안: focus-trap-react, @radix-ui/react-dialog`}</p>
                </div>
            </div>

            {/* Skip Link */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Skip Link — 반복 내비게이션 건너뛰기</p>
                <p className="text-gray060 body-sm">페이지마다 반복되는 헤더/네비게이션을 키보드 사용자가 건너뛸 수 있도록 하는 첫 번째 요소. 평소에는 숨겨지고 Tab 시 나타난다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// CSS
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}
.skip-link:focus {
  top: 0;
}

// JSX
<a href="#main-content" className="skip-link">
  본문으로 바로가기
</a>

<nav>...</nav>

<main id="main-content">
  {/* 여기서부터 탐색 시작 */}
</main>`}</p>
                </div>
            </div>

            {/* 실전 체크리스트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">키보드 접근성 체크리스트</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "Tab으로 모든 인터랙티브 요소에 도달 가능한가?",
                        "포커스 표시(:focus-visible)가 명확하게 보이는가?",
                        "Enter/Space로 버튼·링크가 동작하는가?",
                        "Escape로 모달·드롭다운이 닫히는가?",
                        "모달 열릴 때 포커스가 모달 안으로 이동하는가?",
                        "모달 닫힐 때 포커스가 트리거 버튼으로 복귀하는가?",
                        "포커스가 화면 밖으로 이탈하지 않는가?",
                        "방향키로 라디오·탭·메뉴 이동이 되는가?",
                    ].map((item) => (
                        <div key={item} className="flex gap-[6px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <span className="text-green060 body-xs shrink-0">✓</span>
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
