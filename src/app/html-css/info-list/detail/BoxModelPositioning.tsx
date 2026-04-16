export default function BoxModelPositioning() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">CSS 박스 모델 & 포지셔닝</p>
            <p className="text-gray060 body-sm mt-[16px]">
                모든 HTML 요소는 박스 모델로 표현된다.<br />
                포지셔닝은 요소가 문서 흐름 안에서 어떻게 배치되는지를 결정한다.
            </p>

            {/* 박스 모델 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">박스 모델 구조</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { layer: "Content",  desc: "실제 내용(텍스트, 이미지). width/height로 크기 지정" },
                        { layer: "Padding",  desc: "Content 주변 내부 여백. 배경색 적용됨" },
                        { layer: "Border",   desc: "Padding 바깥 테두리. 두께·스타일·색상 지정" },
                        { layer: "Margin",   desc: "Border 바깥 외부 여백. 인접 요소와의 간격. 배경색 없음" },
                    ].map(({ layer, desc }, i) => (
                        <div key={layer} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold w-[70px]">{layer}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-[4px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">content-box (기본값)</p>
                        <p className="body-xs text-gray060">width = Content만.<br />실제 크기 = width + padding + border</p>
                        <p className="body-xs text-gray040 mt-[2px]">width:100px + padding:10px → 렌더 120px</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">border-box (권장)</p>
                        <p className="body-xs text-gray060">width = Content + Padding + Border.<br />레이아웃 예측이 쉬움</p>
                        <p className="body-xs text-gray040 mt-[2px]">width:100px + padding:10px → 렌더 100px</p>
                    </div>
                </div>
                <div className="bg-gray010 rounded-[8px] p-[10px] mt-[2px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`/* 전역 border-box 설정 (권장) */
*, *::before, *::after {
    box-sizing: border-box;
}`}</p>
                </div>
            </div>

            {/* Margin Collapse */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">마진 상쇄 (Margin Collapse)</p>
                <p className="text-gray060 body-sm">수직으로 인접한 블록 요소의 마진은 더 큰 값 하나로 합쳐진다.</p>
                <div className="mt-[4px] flex flex-col gap-[3px]">
                    {[
                        "형제 요소: margin-bottom:20px + margin-top:30px → 실제 간격 30px",
                        "부모-자식: 부모에 border/padding/overflow 없으면 자식 margin이 부모로 전파",
                        "해결: BFC 생성 (overflow:hidden, display:flex/grid, position:absolute/fixed)",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Position */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">position 속성</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { val: "static",   desc: "기본값. 문서 흐름대로 배치. top/left 등 무효" },
                        { val: "relative", desc: "문서 흐름 유지, 자신의 원래 위치 기준으로 이동. 주변 요소에 영향 없음" },
                        { val: "absolute", desc: "문서 흐름에서 제거. 가장 가까운 position:relative(이상) 조상 기준 배치" },
                        { val: "fixed",    desc: "문서 흐름에서 제거. 뷰포트 기준 고정. 스크롤해도 위치 유지" },
                        { val: "sticky",   desc: "스크롤 전: relative처럼 동작. 임계점 도달 후: fixed처럼 고정 (헤더, 사이드바에 활용)" },
                    ].map(({ val, desc }) => (
                        <div key={val} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[80px]">{val}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stacking Context */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">z-index & 스태킹 컨텍스트</p>
                <p className="text-gray060 body-sm">z-index는 스태킹 컨텍스트 내에서만 비교된다. position이 static이면 z-index 무효.</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    <p className="body-xs text-gray050 font-bold mb-[2px]">스태킹 컨텍스트가 생성되는 조건</p>
                    {[
                        "position: relative/absolute/fixed/sticky + z-index 값이 auto 아닐 때",
                        "opacity < 1",
                        "transform, filter, will-change 속성 적용",
                        "display: flex/grid의 자식 중 z-index가 auto가 아닐 때",
                        "isolation: isolate — 명시적으로 새 컨텍스트 생성 (z-index 격리에 활용)",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-yellow005 border border-yellow030 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">z-index 안 먹히는 이유</p>
                    <p className="body-xs text-gray060">대부분 부모가 새 스태킹 컨텍스트를 형성해서 자식의 z-index가 부모 컨텍스트 내에서만 적용되기 때문. isolation:isolate로 범위 격리하거나 DOM 구조를 조정해야 한다.</p>
                </div>
            </div>

        </article>
    )
}
