export default function BrowserNavigation() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">URL 입력 → 화면 렌더링까지</p>
            <p className="text-gray060 body-sm mt-[16px]">
                주소창에 URL을 입력하고 화면이 나타나기까지의 전체 과정을 이해하면<br />
                네트워크, DNS, TCP, HTTP, 브라우저 렌더링 전반의 성능 병목을 파악할 수 있다.
            </p>

            {/* 전체 흐름 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">전체 흐름</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        {
                            step: "1. URL 파싱",
                            desc: "브라우저가 프로토콜(https), 호스트(example.com), 경로(/page), 쿼리 파라미터를 분리한다.",
                        },
                        {
                            step: "2. HSTS 체크",
                            desc: "브라우저 내 HSTS 목록 확인. https://example.com이 목록에 있으면 http:// 요청도 자동으로 https://로 업그레이드.",
                        },
                        {
                            step: "3. DNS 조회",
                            desc: "브라우저 캐시 → OS 캐시 → 로컬 호스트 파일 → DNS 리졸버(ISP) → 루트 NS → TLD NS → 권한 NS 순으로 IP 주소 조회.",
                        },
                        {
                            step: "4. TCP 연결 (3-Way Handshake)",
                            desc: "클라이언트 SYN → 서버 SYN-ACK → 클라이언트 ACK. 연결 수립에 1 RTT 소요.",
                        },
                        {
                            step: "5. TLS 핸드셰이크 (HTTPS)",
                            desc: "서버 인증서 검증, 암호화 방식 협상, 세션 키 교환. 추가 1~2 RTT 소요. TLS 1.3은 1 RTT로 단축.",
                        },
                        {
                            step: "6. HTTP 요청 전송",
                            desc: "GET /page HTTP/2. 요청 헤더에 Host, Accept, Cookie, Cache-Control 등 포함.",
                        },
                        {
                            step: "7. 서버 처리 & 응답",
                            desc: "서버가 로직 처리 후 HTML 응답. 200 OK + Content-Type: text/html.",
                        },
                        {
                            step: "8. 브라우저 렌더링",
                            desc: "HTML 파싱 → DOM, CSS 파싱 → CSSOM, JS 실행, Render Tree → Layout → Paint → Composite.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[10px]">
                            <div className="w-[24px] h-[24px] min-w-[24px] rounded-full bg-blue005 border border-blue020 flex items-center justify-center flex-shrink-0 mt-[1px]">
                                <span className="body-xs text-blue040 font-bold">{i + 1}</span>
                            </div>
                            <div>
                                <p className="body-sm text-gray080 font-bold">{item.step.replace(/^\d+\. /, '')}</p>
                                <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 성능 관점 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">성능 최적화 — 각 단계별</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { phase: "DNS", tip: "dns-prefetch로 크로스-오리진 DNS 미리 조회: <link rel='dns-prefetch' href='//api.example.com'>" },
                        { phase: "TCP/TLS", tip: "preconnect로 연결 미리 수립: <link rel='preconnect' href='https://fonts.googleapis.com'>" },
                        { phase: "HTTP", tip: "HTTP/2 멀티플렉싱으로 다수 리소스 병렬 전송. Keep-Alive로 연결 재사용." },
                        { phase: "캐싱", tip: "Cache-Control: max-age, ETag, Last-Modified로 재요청 최소화. CDN으로 지리적 지연 단축." },
                        { phase: "렌더링", tip: "defer/async 스크립트, 크리티컬 CSS 인라인, 이미지 width/height 명시로 CLS 방지." },
                    ].map((item) => (
                        <div key={item.phase} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray080 font-bold">{item.phase}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* HTTP/2 vs HTTP/1.1 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">HTTP/1.1 vs HTTP/2 핵심 차이</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">HTTP/1.1</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`요청 1개 완료 후 다음 요청
(Head-of-Line Blocking)
→ 브라우저가 6개 병렬 연결로 우회`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">HTTP/2</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`멀티플렉싱: 하나의 연결로
여러 요청/응답 동시 처리
+ 헤더 압축 (HPACK)
+ 서버 푸시`}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}
