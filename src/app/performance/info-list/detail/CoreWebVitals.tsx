export default function CoreWebVitals() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">Core Web Vitals</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Google이 정의한 웹 성능의 핵심 지표. 검색 랭킹에도 반영된다.<br />
                실제 사용자 경험을 측정하는 세 가지 지표 — LCP, CLS, INP.
            </p>

            {/* 세 가지 지표 */}
            <div className="mt-[28px] flex flex-col gap-[10px]">

                {/* LCP */}
                <div className="bg-blue005 border border-blue020 rounded-[12px] p-[16px]">
                    <div className="flex items-center justify-between mb-[8px]">
                        <div className="flex items-center gap-[8px]">
                            <span className="bg-blue030 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">LCP</span>
                            <span className="body-sm text-gray080 font-bold">Largest Contentful Paint</span>
                        </div>
                        <div className="flex gap-[6px]">
                            <span className="body-xs text-green060 bg-green005 px-[6px] py-[1px] rounded-[4px]">좋음 ≤2.5s</span>
                            <span className="body-xs text-red050 bg-red005 px-[6px] py-[1px] rounded-[4px]">나쁨 &gt;4s</span>
                        </div>
                    </div>
                    <p className="body-xs text-gray060 mb-[8px]">
                        뷰포트에서 가장 큰 콘텐츠(이미지, 텍스트 블록)가 렌더링되는 시간. 사용자가 "페이지가 로드됐다"고 느끼는 시점.
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">개선 방법</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                "히어로 이미지에 fetchpriority=\"high\" 또는 next/image priority 적용",
                                "서버 응답 속도 개선 (TTFB 줄이기) — CDN, 캐싱, SSG 활용",
                                "render-blocking 리소스 제거 — CSS/JS defer, async",
                                "이미지 크기 최적화 — WebP/AVIF, srcset, 적절한 sizes",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <span className="text-blue030 body-xs mt-[1px]">•</span>
                                    <span className="body-xs text-gray060">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CLS */}
                <div className="bg-yellow005 border border-yellow020 rounded-[12px] p-[16px]">
                    <div className="flex items-center justify-between mb-[8px]">
                        <div className="flex items-center gap-[8px]">
                            <span className="bg-yellow050 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">CLS</span>
                            <span className="body-sm text-gray080 font-bold">Cumulative Layout Shift</span>
                        </div>
                        <div className="flex gap-[6px]">
                            <span className="body-xs text-green060 bg-green005 px-[6px] py-[1px] rounded-[4px]">좋음 ≤0.1</span>
                            <span className="body-xs text-red050 bg-red005 px-[6px] py-[1px] rounded-[4px]">나쁨 &gt;0.25</span>
                        </div>
                    </div>
                    <p className="body-xs text-gray060 mb-[8px]">
                        페이지 로드 중 예기치 않게 발생하는 레이아웃 이동의 누적 점수. 읽던 글이 밀리거나 버튼이 이동하는 현상.
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">주요 원인 & 개선</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                "이미지 width/height 명시 → 브라우저가 공간 미리 확보",
                                "폰트 교체 시 FOUT — next/font 또는 font-display: swap + size-adjust",
                                "동적으로 삽입되는 광고/배너 — 크기 예약 (min-height 설정)",
                                "skeleton UI로 콘텐츠 자리 미리 확보",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <span className="text-yellow060 body-xs mt-[1px]">•</span>
                                    <span className="body-xs text-gray060">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* INP */}
                <div className="bg-green005 border border-green020 rounded-[12px] p-[16px]">
                    <div className="flex items-center justify-between mb-[8px]">
                        <div className="flex items-center gap-[8px]">
                            <span className="bg-green050 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">INP</span>
                            <span className="body-sm text-gray080 font-bold">Interaction to Next Paint</span>
                        </div>
                        <div className="flex gap-[6px]">
                            <span className="body-xs text-green060 bg-green005 px-[6px] py-[1px] rounded-[4px]">좋음 ≤200ms</span>
                            <span className="body-xs text-red050 bg-red005 px-[6px] py-[1px] rounded-[4px]">나쁨 &gt;500ms</span>
                        </div>
                    </div>
                    <p className="body-xs text-gray060 mb-[8px]">
                        클릭/탭/키 입력에서 다음 화면 갱신까지의 시간. 2024년 3월 FID를 대체. 페이지 전체 반응성 측정.
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">개선 방법</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                "Long Task 분리 — 200ms 이상 걸리는 JS 작업을 청크로 쪼개기",
                                "무거운 계산은 Web Worker로 메인 스레드 밖으로 분리",
                                "이벤트 핸들러 최적화 — debounce/throttle, 불필요한 리렌더링 방지",
                                "React Transition API — startTransition으로 비긴급 업데이트 지연",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <span className="text-green060 body-xs mt-[1px]">•</span>
                                    <span className="body-xs text-gray060">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 측정 도구 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">측정 도구</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { tool: "Lighthouse",         type: "Lab",   desc: "Chrome DevTools / CI 통합. 시뮬레이션 기반" },
                        { tool: "PageSpeed Insights", type: "Lab+Field", desc: "Google CrUX 실사용자 데이터 + Lab 데이터 함께 제공" },
                        { tool: "Chrome DevTools",    type: "Lab",   desc: "Performance 탭 — 프레임별 렌더링 분석, Long Task 파악" },
                        { tool: "Datadog RUM",         type: "Field", desc: "실사용자 Core Web Vitals 수집. 세션별 재현 가능" },
                        { tool: "web-vitals (npm)",   type: "Field", desc: "JS로 직접 측정 → 분석 서버로 전송" },
                    ].map(({ tool, type, desc }) => (
                        <div key={tool} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-gray080 font-bold min-w-[150px]">{tool}</span>
                            <span className={`body-xs font-bold min-w-[60px] ${type === "Field" ? "text-green060" : type === "Lab" ? "text-blue040" : "text-yellow060"}`}>{type}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray050 mt-[4px]">
                    Lab: 통제된 환경 시뮬레이션 / Field: 실제 사용자 데이터(RUM).<br />
                    Lab이 좋아도 Field가 나쁠 수 있음 → 실사용자 모니터링 필수.
                </p>
            </div>

        </article>
    )
}
