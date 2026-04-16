export default function BrowserRendering() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">브라우저 렌더링 파이프라인</p>
            <p className="text-gray060 body-sm mt-[16px]">
                URL 입력부터 화면에 픽셀이 그려지기까지의 전체 과정.<br />
                각 단계를 이해하면 성능 최적화의 근거가 명확해진다.
            </p>

            {/* 네트워크 탐색 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">1단계 — 네트워크 탐색</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "DNS 조회",        desc: "도메인(example.com)을 IP 주소로 변환. 캐시(브라우저 → OS → 라우터 → DNS 서버) 순으로 탐색" },
                        { label: "TCP 연결",         desc: "IP 주소로 서버에 3-way handshake 수행. HTTPS라면 TLS 협상 추가" },
                        { label: "HTTP 요청/응답",   desc: "GET / HTTP/1.1 요청 → 서버가 HTML 파일 응답 (첫 바이트까지 시간 = TTFB)" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[100px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 파싱 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">2단계 — 파싱 (DOM & CSSOM 생성)</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">HTML → DOM 트리</p>
                        <div className="flex flex-col gap-[2px]">
                            {[
                                "바이트 → 문자 변환 (인코딩 선언 기준)",
                                "문자 → 토큰 (W3C HTML 명세 기반)",
                                "토큰 → 노드 객체",
                                "노드 → 트리 구조 (DOM Tree)",
                            ].map((t, i) => (
                                <div key={i} className="flex items-center gap-[6px]">
                                    <span className="text-blue030 body-xs">{i + 1}.</span>
                                    <span className="body-xs text-gray060">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">CSS → CSSOM 트리</p>
                        <p className="body-xs text-gray060">동일한 과정으로 CSS를 파싱해 CSSOM 생성. CSS는 렌더 블로킹 리소스 — CSSOM 완성 전까지 렌더링 차단.</p>
                    </div>
                    <div className="bg-yellow005 border border-yellow030 rounded-[8px] p-[10px]">
                        <p className="body-xs text-yellow060 font-bold mb-[2px]">파싱 중단 — script 태그</p>
                        <p className="body-xs text-gray060">
                            일반 &lt;script&gt;는 파싱 차단 — HTML 파싱을 멈추고 JS 다운로드·실행 후 재개.<br />
                            <span className="text-blue040">async</span>: 비동기 다운로드, 완료 즉시 실행 (순서 무관) ·
                            <span className="text-blue040"> defer</span>: 비동기 다운로드, HTML 파싱 완료 후 순서대로 실행
                        </p>
                    </div>
                </div>
            </div>

            {/* 렌더 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">3단계 — 렌더 (Style → Layout → Paint → Composite)</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            step: "Style",
                            desc: "DOM + CSSOM 결합 → 렌더 트리. 화면에 보이는 요소만 포함. display:none 제외, visibility:hidden 포함.",
                        },
                        {
                            step: "Layout (Reflow)",
                            desc: "렌더 트리 각 노드의 위치·크기 계산. 뷰포트 기준. 비용이 가장 큰 단계.",
                        },
                        {
                            step: "Paint (Repaint)",
                            desc: "픽셀로 변환. 텍스트, 색상, 경계선, 그림자 등 그리기. 레이어 단위로 처리.",
                        },
                        {
                            step: "Composite",
                            desc: "레이어들을 올바른 순서로 합성해 최종 화면 완성. GPU 가속 발생.",
                        },
                    ].map(({ step, desc }) => (
                        <div key={step} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[110px]">{step}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reflow vs Repaint */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Reflow vs Repaint 트리거</p>
                <p className="text-gray060 body-sm">Reflow(레이아웃 재계산)는 Repaint보다 비용이 크다. transform/opacity는 Composite만 발생.</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Reflow (+ Repaint)</p>
                        <p className="body-xs text-gray050">width, height, margin, padding, border, top, left, font-size, display, position...</p>
                    </div>
                    <div className="flex-1 bg-yellow005 border border-yellow030 rounded-[8px] p-[10px]">
                        <p className="body-xs text-yellow060 font-bold mb-[4px]">Repaint만</p>
                        <p className="body-xs text-gray050">background-color, color, visibility, border-style, border-radius, outline...</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">Composite만 (GPU)</p>
                        <p className="body-xs text-gray050">transform, opacity — 성능 최적화에 적극 활용</p>
                    </div>
                </div>
            </div>

        </article>
    )
}
