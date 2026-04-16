export default function HttpsAndTls() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">HTTPS & TLS</p>
            <p className="text-gray060 body-sm mt-[16px]">
                HTTPS = HTTP + TLS(Transport Layer Security).<br />
                데이터를 암호화하여 도청·변조·위장을 방지한다.
            </p>

            {/* HTTP vs HTTPS */}
            <div className="mt-[28px] flex gap-[8px]">
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">HTTP (평문)</p>
                    {[
                        "데이터가 평문으로 전송",
                        "중간자 공격(MITM)으로 도청 가능",
                        "데이터 변조 감지 불가",
                        "포트 80",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[5px]">
                            <span className="text-red040 body-xs">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">HTTPS (암호화)</p>
                    {[
                        "데이터 암호화 (기밀성)",
                        "무결성 검증 (변조 감지)",
                        "서버 신원 인증 (CA 인증서)",
                        "포트 443",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[5px]">
                            <span className="text-green050 body-xs">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 암호화 방식 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">대칭 암호화 vs 비대칭 암호화</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            label: "대칭 암호화",
                            desc: "같은 키로 암호화·복호화. 속도 빠름. 키 공유가 문제 (AES, ChaCha20)",
                            color: "text-blue040",
                        },
                        {
                            label: "비대칭 암호화",
                            desc: "공개키(암호화) + 개인키(복호화). 키 교환에 사용. 느림 (RSA, ECDH)",
                            color: "text-green050",
                        },
                        {
                            label: "TLS에서의 조합",
                            desc: "핸드셰이크(비대칭)로 세션 키 교환 → 이후 실제 데이터는 세션 키(대칭)로 암호화",
                            color: "text-yellow060",
                        },
                    ].map(({ label, desc, color }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className={`body-xs font-bold ${color} min-w-[110px]`}>{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* TLS 핸드셰이크 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">TLS 1.3 핸드셰이크 과정</p>
                <p className="text-gray060 body-sm">TLS 1.2는 2-RTT, TLS 1.3은 1-RTT로 단축. 재연결 시 0-RTT 가능.</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { step: "① ClientHello",  desc: "클라이언트 → 서버. 지원 TLS 버전, 암호화 방식 목록, 난수 전송" },
                        { step: "② ServerHello",  desc: "서버 → 클라이언트. 선택된 암호화 방식, 인증서, 서버 공개키 전송" },
                        { step: "③ 인증서 검증",  desc: "클라이언트가 CA 체인으로 서버 인증서 유효성 확인" },
                        { step: "④ 키 교환",      desc: "ECDH로 양측이 동일한 세션 키(Pre-Master Secret) 생성" },
                        { step: "⑤ Finished",     desc: "양측이 세션 키 생성 완료 확인. 이후 대칭 암호화로 통신" },
                    ].map(({ step, desc }) => (
                        <div key={step} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[100px]">{step}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 인증서 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">SSL/TLS 인증서 & CA</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "CA(Certificate Authority): 인증서를 발급·서명하는 공인 기관 (DigiCert, Let's Encrypt 등)",
                        "인증서에는 도메인, 공개키, 발급자, 만료일 포함",
                        "체인 구조: Root CA → Intermediate CA → 서버 인증서 순으로 신뢰 검증",
                        "Let's Encrypt: 무료 자동화 인증서. 90일마다 갱신 (certbot으로 자동화)",
                        "Mixed Content: HTTPS 페이지에서 HTTP 리소스 로드 시 브라우저가 차단",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* HSTS */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">HSTS (HTTP Strict Transport Security)</p>
                <p className="text-gray060 body-sm">
                    서버가 응답 헤더로 &quot;항상 HTTPS로만 접속하라&quot;고 브라우저에 지시.<br />
                    첫 접속 이후 HTTP 요청을 브라우저가 자동으로 HTTPS로 업그레이드.
                </p>
                <div className="bg-gray010 rounded-[8px] p-[12px] mt-[4px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// max-age: HSTS 유효기간(초)
// includeSubDomains: 서브도메인 포함
// preload: 브라우저 HSTS 프리로드 목록에 등재 요청`}</p>
                </div>
            </div>

        </article>
    )
}
