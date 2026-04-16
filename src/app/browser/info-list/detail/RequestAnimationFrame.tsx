export default function RequestAnimationFrame() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">requestAnimationFrame (rAF)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                requestAnimationFrame은 브라우저의 다음 리페인트 전에 콜백을 실행해달라고 요청하는 API다.<br />
                디스플레이 주사율(보통 60fps = 16.67ms)에 맞춰 콜백을 호출하여 매끄러운 애니메이션을 구현한다.
            </p>

            {/* rAF vs setTimeout */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">rAF vs setTimeout(fn, 16) — 왜 rAF가 나은가</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="flex gap-[8px]">
                        <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                            <p className="body-xs text-red050 font-bold mb-[4px]">setTimeout(fn, 16)</p>
                            <p className="body-xs text-gray060">16ms는 추정값. 실제로 브라우저가 바쁘면 콜백이 더 늦게 실행. 탭이 백그라운드여도 계속 실행.</p>
                        </div>
                        <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                            <p className="body-xs text-green060 font-bold mb-[4px]">requestAnimationFrame</p>
                            <p className="body-xs text-gray060">브라우저 리페인트 직전에 정확히 실행. 탭이 숨겨지면 자동 일시 정지 → CPU 낭비 없음.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기본 사용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 애니메이션 루프</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`let rafId: number;
let start: number;

function animate(timestamp: number) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;

  const progress = Math.min(elapsed / 1000, 1); // 1초 동안
  element.style.transform = \`translateX(\${progress * 300}px)\`;

  if (progress < 1) {
    rafId = requestAnimationFrame(animate); // 다음 프레임 예약
  }
}

rafId = requestAnimationFrame(animate);

// 정리
cancelAnimationFrame(rafId);`}</p>
                </div>
            </div>

            {/* 렌더링 파이프라인 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">브라우저 렌더링 파이프라인에서의 위치</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["JS 실행", "rAF 콜백", "Style", "Layout", "Paint", "Composite"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className={`rounded-[8px] px-[10px] py-[7px] ${i === 1 ? 'bg-blue005 border border-blue030' : 'bg-gray010 border border-gray020'}`}>
                                <p className={`body-xs text-center ${i === 1 ? 'text-blue040 font-bold' : 'text-gray060'}`}>{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[6px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray040 mt-[4px]">rAF는 JS 실행 직후, Style 계산 전에 실행된다. DOM 읽기는 Layout 이전에 수행하는 것이 Reflow를 최소화한다.</p>
            </div>

            {/* React에서 활용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React에서 활용 — 스크롤 프로그레스 바</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // 스크롤 이벤트는 많이 발생 → rAF로 쓰로틀
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const pct = scrollTop / (scrollHeight - clientHeight);
        setProgress(pct * 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}`}</p>
                </div>
            </div>

            {/* CSS vs rAF */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CSS 애니메이션 vs rAF — 선택 기준</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "단순 전환 (hover, 페이드인): CSS transition / animation 우선 — GPU 가속, JS 오버헤드 없음",
                        "JS 로직 필요 (물리 시뮬레이션, 게임, 데이터 기반 애니메이션): rAF 사용",
                        "framer-motion / GSAP 같은 라이브러리는 내부적으로 rAF를 사용하므로 별도 구현 불필요",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-blue030 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
