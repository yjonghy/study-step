export default function IntersectionObserverDoc() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">IntersectionObserver</p>
            <p className="text-gray060 body-sm mt-[16px]">
                IntersectionObserver는 대상 요소가 뷰포트(또는 상위 컨테이너)와 교차하는지 비동기적으로 관찰하는 API다.<br />
                스크롤 이벤트 기반 처리보다 성능이 뛰어나고, 무한스크롤·이미지 지연 로딩 등에 활용된다.
            </p>

            {/* vs scroll event */}
            <div className="mt-[28px] flex gap-[8px]">
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">scroll 이벤트 기반</p>
                    <p className="body-xs text-gray060">스크롤마다 콜백 실행 → getBoundingClientRect() 호출 → Reflow 발생 → 성능 저하. 스로틀 적용해도 메인 스레드 점유.</p>
                </div>
                <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">IntersectionObserver</p>
                    <p className="body-xs text-gray060">브라우저가 비동기적으로 교차 감지. Reflow 없음. 교차 변화가 있을 때만 콜백 호출 → 성능 우수.</p>
                </div>
            </div>

            {/* 기본 API */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 API</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 요소가 뷰포트에 들어왔을 때
        console.log(entry.target, '화면에 보임');
        observer.unobserve(entry.target); // 한 번만 처리
      }
    });
  },
  {
    root: null,        // null = 뷰포트
    rootMargin: '0px', // 교차 판정 여백 ('200px' → 200px 전부터 감지)
    threshold: 0.1,    // 10% 이상 보일 때 콜백 (0~1 또는 배열)
  }
);

observer.observe(targetElement);   // 관찰 시작
observer.unobserve(targetElement); // 관찰 중지
observer.disconnect();             // 모든 관찰 중지`}</p>
                </div>
            </div>

            {/* 이미지 Lazy Loading */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">활용 1 — 이미지 Lazy Loading</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function useLazyImage(ref: React.RefObject<HTMLImageElement>, src: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.src = src; // 뷰포트에 들어올 때 실제 src 설정
        observer.disconnect();
      }
    }, { rootMargin: '200px' }); // 200px 전에 미리 로드

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);
}

// 사용
<img ref={imgRef} src="placeholder.png" alt="상품" />`}</p>
                </div>
            </div>

            {/* 무한 스크롤 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">활용 2 — 무한 스크롤</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function useInfiniteScroll(onLoadMore: () => void) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onLoadMore(); // 로더가 보이면 다음 페이지 로드
      }
    }, { threshold: 1.0 });

    observer.observe(loader);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return loaderRef;
}

// 사용
const loaderRef = useInfiniteScroll(fetchNextPage);
<div ref={loaderRef}>로딩 중...</div>`}</p>
                </div>
            </div>

            {/* 애니메이션 트리거 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">활용 3 — 스크롤 진입 애니메이션</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 요소가 뷰포트에 들어올 때 fade-in 적용
const observer = new IntersectionObserver(([entry]) => {
  entry.target.classList.toggle('visible', entry.isIntersecting);
});

document.querySelectorAll('.animate-on-scroll')
  .forEach(el => observer.observe(el));`}</p>
                </div>
            </div>
        </article>
    )
}
