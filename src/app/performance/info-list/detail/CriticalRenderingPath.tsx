export default function CriticalRenderingPath() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">크리티컬 렌더링 패스 (CRP)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                브라우저가 HTML을 받아 화면에 픽셀을 그리기까지의 일련의 단계를 크리티컬 렌더링 패스라 한다.<br />
                이 과정을 이해해야 렌더 블로킹 리소스를 줄이고 FCP·LCP를 개선할 수 있다.
            </p>

            {/* 전체 흐름 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">전체 렌더링 파이프라인</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["HTML 파싱 → DOM", "CSS 파싱 → CSSOM", "Render Tree 생성", "Layout (Reflow)", "Paint", "Composite"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className="bg-blue005 border border-blue020 rounded-[8px] px-[10px] py-[7px]">
                                <p className="body-xs text-blue040 text-center">{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[8px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* 단계별 설명 */}
            <div className="mt-[32px] flex flex-col gap-[8px]">
                <p className="text-blue030 body-md">단계별 핵심 내용</p>
                {[
                    {
                        title: "1. DOM 생성",
                        desc: "HTML을 바이트 → 문자 → 토큰 → 노드 → DOM 트리로 변환. CSS/JS가 없으면 위에서 아래로 순차 파싱.",
                    },
                    {
                        title: "2. CSSOM 생성",
                        desc: "CSS를 파싱해 스타일 규칙 트리 생성. CSS는 렌더 블로킹 리소스 — CSSOM 완성 전까지 렌더 트리 생성 불가.",
                    },
                    {
                        title: "3. Render Tree",
                        desc: "DOM + CSSOM 결합. visibility:hidden은 포함, display:none은 제외. 화면에 실제로 보이는 노드만 포함.",
                    },
                    {
                        title: "4. Layout (Reflow)",
                        desc: "각 노드의 크기·위치 계산. 박스 모델 기반. 비싼 연산 — width, height, top, left 변경 시 발생.",
                    },
                    {
                        title: "5. Paint",
                        desc: "픽셀을 레이어에 그림. color, background, box-shadow 변경 시 발생. Layout보다는 저렴.",
                    },
                    {
                        title: "6. Composite",
                        desc: "여러 레이어를 합성해 최종 화면 출력. transform, opacity 변경은 Layout/Paint를 건너뛰고 이 단계만 발생 → GPU 가속.",
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold">{item.title}</p>
                        <p className="body-xs text-gray060 mt-[4px]">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* 최적화 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">렌더 블로킹 제거 전략</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">CSS — 미디어 쿼리로 블로킹 제거</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 항상 블로킹 -->
<link rel="stylesheet" href="styles.css">

<!-- 인쇄 시에만 블로킹 → 화면 렌더는 블로킹 안 함 -->
<link rel="stylesheet" href="print.css" media="print">

<!-- 모바일에서만 블로킹 -->
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">`}</p>
                    </div>
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">JS — defer / async로 파싱 차단 방지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 파싱 차단 (나쁨) -->
<script src="app.js"></script>

<!-- defer: HTML 파싱 완료 후 실행, 순서 보장 -->
<script defer src="app.js"></script>

<!-- async: 다운로드 즉시 실행, 순서 보장 안 됨 (분석 스크립트 등) -->
<script async src="analytics.js"></script>`}</p>
                    </div>
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">애니메이션 — transform/opacity만 사용</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`/* Reflow 유발 — 나쁨 */
.box { left: 100px; width: 200px; }

/* Composite만 → GPU 가속, 매끄러운 60fps */
.box { transform: translateX(100px); opacity: 0.5; }`}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}
