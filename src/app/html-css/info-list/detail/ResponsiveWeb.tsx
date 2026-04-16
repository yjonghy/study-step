export default function ResponsiveWeb() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">반응형 웹 & 미디어 쿼리</p>
            <p className="text-gray060 body-sm mt-[16px]">
                다양한 화면 크기에서 최적의 사용자 경험을 제공하기 위한 기법.<br />
                모바일 우선(Mobile First) 접근이 현재 표준이다.
            </p>

            {/* viewport */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Viewport 메타 태그</p>
                <p className="text-gray060 body-sm">없으면 모바일 브라우저가 데스크탑 화면으로 가정해 축소 렌더링한다.</p>
                <div className="bg-gray010 rounded-[8px] p-[12px] mt-[4px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`<meta name="viewport" content="width=device-width, initial-scale=1">

// width=device-width: 뷰포트를 디바이스 실제 화면 너비로 설정
// initial-scale=1: 초기 줌 배율 1 (100%)`}</p>
                </div>
            </div>

            {/* 미디어 쿼리 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">미디어 쿼리</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`/* Mobile First — min-width 기준 (권장) */
.container { width: 100%; }           /* 모바일 기본 */
@media (min-width: 768px) { ... }     /* 태블릿 이상 */
@media (min-width: 1024px) { ... }    /* 데스크탑 이상 */

/* Desktop First — max-width 기준 */
.container { max-width: 1200px; }
@media (max-width: 1023px) { ... }    /* 태블릿 이하 */
@media (max-width: 767px)  { ... }    /* 모바일 이하 */

/* 기타 미디어 쿼리 */
@media (prefers-color-scheme: dark) { ... }   /* 다크모드 */
@media (prefers-reduced-motion: reduce) { ... } /* 모션 감소 */
@media print { ... }                          /* 인쇄 */`}</p>
                </div>
                <div className="mt-[4px] bg-yellow005 border border-yellow030 rounded-[8px] p-[10px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">Mobile First가 권장되는 이유</p>
                    <p className="body-xs text-gray060">모바일 트래픽이 과반. 성능 측면에서도 모바일 기본 스타일이 작고, 데스크탑은 추가하는 방식이 효율적.</p>
                </div>
            </div>

            {/* 상대 단위 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">반응형 단위</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { unit: "rem",   desc: "루트(html) 폰트 크기 기준. 1rem = 16px(기본). 접근성에 유리 — 유저 폰트 설정 반영" },
                        { unit: "em",    desc: "부모 요소 폰트 크기 기준. 컴포넌트 내부 상대적 크기에 활용" },
                        { unit: "vw/vh", desc: "뷰포트 너비/높이의 1%. 100vw = 전체 너비. 풀스크린 섹션, 히어로에 활용" },
                        { unit: "vmin/vmax", desc: "vw와 vh 중 작은/큰 값. 정사각형 요소 유지에 활용" },
                        { unit: "%",     desc: "부모 요소 기준 비율. width에 자주 사용" },
                        { unit: "clamp()", desc: "clamp(min, preferred, max) — 유동적 타이포그래피, 반응형 크기" },
                    ].map(({ unit, desc }) => (
                        <div key={unit} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[90px] font-mono">{unit}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gray010 rounded-[8px] p-[12px] mt-[2px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`/* clamp() 활용 예시 */
h1 {
    /* 최소 1.5rem, 선호 5vw, 최대 3rem */
    font-size: clamp(1.5rem, 5vw, 3rem);
}

.container {
    /* 최소 320px, 유동, 최대 1200px */
    width: clamp(320px, 90%, 1200px);
}`}</p>
                </div>
            </div>

            {/* 반응형 이미지 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">반응형 이미지 패턴</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">CSS 유동 이미지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`img { max-width: 100%; height: auto; }
/* 부모 너비를 넘지 않고 비율 유지 */`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">srcset / sizes — 해상도별 이미지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="설명"
/>`}</p>
                    </div>
                </div>
            </div>

            {/* 반응형 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">반응형 레이아웃 전략</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "Fluid Grid: %나 fr 단위로 유동적 열 구성 (fixed px 지양)",
                        "CSS Grid auto-fill/auto-fit: media query 없이 반응형 카드 그리드",
                        "컨테이너 쿼리(@container): 뷰포트가 아닌 부모 컨테이너 크기 기준으로 스타일 적용 (최신)",
                        "Tailwind: sm/md/lg/xl 프리픽스로 breakpoint 적용. mobile-first 방식",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
