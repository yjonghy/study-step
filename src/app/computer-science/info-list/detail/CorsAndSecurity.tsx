export default function CorsAndSecurity() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">CORS & 웹 보안</p>
            <p className="text-gray060 body-sm mt-[16px]">
                브라우저는 Same-Origin Policy로 다른 출처의 리소스를 제한한다.<br />
                CORS는 이 정책을 안전하게 우회하는 메커니즘이며, XSS·CSRF는 웹의 대표적 보안 취약점이다.
            </p>

            {/* Same-Origin Policy */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Same-Origin Policy (동일 출처 정책)</p>
                <p className="text-gray060 body-sm">
                    Origin = 프로토콜 + 도메인 + 포트. 세 가지가 모두 일치해야 같은 출처.
                </p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { url: "https://example.com/api",        same: "○", reason: "동일 출처" },
                        { url: "http://example.com",             same: "×", reason: "프로토콜 다름" },
                        { url: "https://sub.example.com",        same: "×", reason: "도메인 다름" },
                        { url: "https://example.com:8080",       same: "×", reason: "포트 다름" },
                        { url: "https://other.com",              same: "×", reason: "도메인 다름" },
                    ].map(({ url, same, reason }) => (
                        <div key={url} className="flex items-center gap-[8px] bg-gray010 px-[12px] py-[6px] rounded-[8px]">
                            <span className={`body-xs font-bold w-[16px] ${same === "○" ? "text-green050" : "text-red040"}`}>{same}</span>
                            <span className="body-xs text-gray060 flex-1">{url}</span>
                            <span className="body-xs text-gray040">{reason}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CORS */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CORS (Cross-Origin Resource Sharing)</p>
                <p className="text-gray060 body-sm">서버가 응답 헤더로 허용할 Origin을 명시해 브라우저가 교차 출처 요청을 허용하도록 하는 메커니즘.</p>

                <div className="mt-[6px] flex flex-col gap-[4px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">단순 요청 (Simple Request)</p>
                        <p className="body-xs text-gray060 mb-[6px]">GET/POST + 특정 헤더만 사용 시. Preflight 없이 바로 전송.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 서버 응답 헤더
Access-Control-Allow-Origin: https://example.com
// 또는 모든 출처 허용 (보안 주의)
Access-Control-Allow-Origin: *`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">Preflight 요청</p>
                        <p className="body-xs text-gray060 mb-[6px]">PUT/DELETE, 커스텀 헤더, JSON Content-Type 등 사용 시 OPTIONS 요청 먼저 전송.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// Preflight OPTIONS 응답
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400  // 이 시간동안 preflight 캐시`}</p>
                    </div>
                </div>

                <div className="mt-[4px] flex flex-col gap-[3px]">
                    <p className="body-xs text-gray050 font-bold mb-[2px]">CORS 해결 방법</p>
                    {[
                        "서버에서 Access-Control-Allow-Origin 헤더 설정 (가장 정석)",
                        "Next.js: next.config.js의 headers() 또는 API Route에서 설정",
                        "개발환경: Vite/webpack devServer의 proxy 설정으로 우회",
                        "credentials 요청 시: withCredentials: true + Allow-Origin에 * 불가 (명시 필요)",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* XSS */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">XSS (Cross-Site Scripting)</p>
                <p className="text-gray060 body-sm">공격자가 악성 스크립트를 웹페이지에 삽입해 다른 사용자 브라우저에서 실행시키는 공격.</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "저장형 XSS",   desc: "악성 스크립트가 DB에 저장 → 다른 유저가 페이지 로드 시 실행" },
                        { label: "반사형 XSS",   desc: "URL 파라미터의 악성 스크립트가 응답에 그대로 반영되어 실행" },
                        { label: "DOM 기반 XSS", desc: "서버 개입 없이 JS가 DOM을 수정할 때 발생 (innerHTML, eval)" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-red040 font-bold min-w-[90px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-[4px] flex flex-col gap-[3px]">
                    <p className="body-xs text-gray050 font-bold mb-[2px]">방어 방법</p>
                    {[
                        "입력값 이스케이프 처리 (&lt; → &lt;amp;lt;)",
                        "React는 JSX 렌더링 시 자동 이스케이프 — dangerouslySetInnerHTML 사용 주의",
                        "CSP(Content Security Policy) 헤더로 허용 스크립트 출처 제한",
                        "HttpOnly 쿠키로 토큰 탈취 방지",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-green050 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSRF */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CSRF (Cross-Site Request Forgery)</p>
                <p className="text-gray060 body-sm">
                    로그인된 사용자가 공격자 사이트를 방문했을 때, 사용자 모르게 인증된 요청을 서버에 전송하는 공격.
                </p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "방어: CSRF 토큰 — 서버가 발급한 토큰을 폼·헤더에 포함 (쿠키만으로는 불충분)",
                        "방어: SameSite=Strict/Lax 쿠키 — 크로스 사이트 요청에 쿠키 자동 제외",
                        "방어: Referer / Origin 헤더 검증",
                        "XSS vs CSRF: XSS는 스크립트 실행(다른 사용자 대상), CSRF는 요청 위조(현재 사용자 대상)",
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
