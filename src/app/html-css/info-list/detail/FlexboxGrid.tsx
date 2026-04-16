export default function FlexboxGrid() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">Flexbox & Grid 레이아웃</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Flexbox는 1차원(단일 축) 레이아웃, Grid는 2차원(행+열) 레이아웃에 적합하다.<br />
                두 방식은 서로 배타적이지 않으며 함께 사용한다.
            </p>

            {/* Flexbox */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Flexbox</p>

                <div className="mt-[4px] flex flex-col gap-[4px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">컨테이너 속성 (display: flex 적용 요소)</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                { prop: "flex-direction",  val: "row | column | row-reverse | column-reverse — 주축 방향" },
                                { prop: "justify-content", val: "flex-start | center | flex-end | space-between | space-around | space-evenly — 주축 정렬" },
                                { prop: "align-items",     val: "stretch | center | flex-start | flex-end | baseline — 교차축 정렬" },
                                { prop: "flex-wrap",       val: "nowrap(기본) | wrap | wrap-reverse — 줄바꿈 여부" },
                                { prop: "gap",             val: "아이템 간격. row-gap / column-gap으로 분리 가능" },
                                { prop: "align-content",   val: "여러 줄일 때 교차축 전체 정렬 (flex-wrap:wrap 필요)" },
                            ].map(({ prop, val }) => (
                                <div key={prop} className="flex items-start gap-[8px]">
                                    <span className="body-xs text-blue040 font-bold min-w-[130px]">{prop}</span>
                                    <span className="body-xs text-gray060">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">아이템 속성</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                { prop: "flex-grow",   val: "남는 공간을 채우는 비율 (기본 0). flex-grow:1이면 균등 분배" },
                                { prop: "flex-shrink", val: "공간 부족 시 줄어드는 비율 (기본 1). 0이면 줄어들지 않음" },
                                { prop: "flex-basis",  val: "초기 크기. px/% 또는 auto. flex-grow 전 기준값" },
                                { prop: "flex",        val: "shorthand: flex: grow shrink basis. flex:1 = 1 1 0%" },
                                { prop: "align-self",  val: "해당 아이템만 교차축 정렬 (align-items 오버라이드)" },
                                { prop: "order",       val: "시각적 순서 변경. 기본 0. 낮을수록 앞에" },
                            ].map(({ prop, val }) => (
                                <div key={prop} className="flex items-start gap-[8px]">
                                    <span className="body-xs text-blue040 font-bold min-w-[100px]">{prop}</span>
                                    <span className="body-xs text-gray060">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CSS Grid</p>

                <div className="mt-[4px] flex flex-col gap-[4px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">컨테이너 속성 (display: grid)</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                { prop: "grid-template-columns", val: "열 구조 정의. repeat(3, 1fr) = 3등분. minmax(200px, 1fr)" },
                                { prop: "grid-template-rows",    val: "행 구조 정의" },
                                { prop: "gap",                   val: "행/열 간격. row-gap / column-gap 분리 가능" },
                                { prop: "auto-fill",             val: "repeat(auto-fill, minmax(200px, 1fr)) — 가능한 많은 열 생성" },
                                { prop: "auto-fit",              val: "auto-fill과 비슷하지만 빈 열을 아이템이 채움 → 아이템이 늘어남" },
                                { prop: "grid-template-areas",   val: "이름으로 레이아웃 정의. 직관적인 2D 레이아웃" },
                            ].map(({ prop, val }) => (
                                <div key={prop} className="flex items-start gap-[8px]">
                                    <span className="body-xs text-blue040 font-bold min-w-[160px]">{prop}</span>
                                    <span className="body-xs text-gray060">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">아이템 속성</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                { prop: "grid-column",  val: "1 / 3 — 1번 선~3번 선까지 차지. span 2로도 표현" },
                                { prop: "grid-row",     val: "행 범위 지정" },
                                { prop: "grid-area",    val: "grid-template-areas에서 지정한 이름으로 위치 배정" },
                                { prop: "justify-self", val: "해당 아이템의 셀 안 가로 정렬" },
                                { prop: "align-self",   val: "해당 아이템의 셀 안 세로 정렬" },
                            ].map(({ prop, val }) => (
                                <div key={prop} className="flex items-start gap-[8px]">
                                    <span className="body-xs text-blue040 font-bold min-w-[100px]">{prop}</span>
                                    <span className="body-xs text-gray060">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">{`/* grid-template-areas 예시 */
.layout {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 240px 1fr;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`}</p>
                    </div>
                </div>
            </div>

            {/* Flex vs Grid */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Flexbox vs Grid — 언제 무엇을?</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "Flex: 내비게이션 바, 버튼 그룹, 카드 한 줄 — 단일 방향 정렬",
                        "Grid: 페이지 전체 레이아웃, 대시보드, 갤러리 — 2차원 배치",
                        "Grid 안 Flex 아이템: Grid로 영역 잡고, 각 셀 내부를 Flex로 정렬하는 패턴 자주 사용",
                        "auto-fill + minmax: 반응형 카드 그리드를 media query 없이 구현 가능",
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
