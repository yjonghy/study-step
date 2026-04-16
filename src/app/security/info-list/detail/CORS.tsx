export default function CORS() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">CORS (Cross-Origin Resource Sharing)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                CORS는 브라우저의 Same-Origin Policy(SOP)로 인한 크로스-오리진 요청 제한을 HTTP 헤더로 완화하는 메커니즘이다.<br />
                서버가 어떤 출처의 요청을 허용할지 명시적으로 선언한다.
            </p>

            {/* Same-Origin Policy */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Same-Origin Policy — 출처(Origin) 기준</p>
                <p className="text-gray060 body-sm">출처(Origin) = 프로토콜 + 호스트 + 포트. 하나라도 다르면 다른 출처.</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        { url: "https://example.com/page", base: "https://example.com", ok: true, reason: "같은 출처" },
                        { url: "http://example.com/page", base: "https://example.com", ok: false, reason: "프로토콜 다름" },
                        { url: "https://api.example.com", base: "https://example.com", ok: false, reason: "호스트 다름 (서브도메인)" },
                        { url: "https://example.com:8080", base: "https://example.com", ok: false, reason: "포트 다름" },
                    ].map((item) => (
                        <div key={item.url} className="flex items-center gap-[8px]">
                            <div className={`w-[14px] h-[14px] min-w-[14px] rounded-full flex items-center justify-center ${item.ok ? 'bg-green005 border border-green020' : 'bg-red005 border border-red020'}`}>
                                <span className={`text-[9px] font-bold ${item.ok ? 'text-green060' : 'text-red050'}`}>{item.ok ? '○' : '✗'}</span>
                            </div>
                            <p className="body-xs text-gray060"><span className="font-bold">{item.url}</span> — {item.reason}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 단순 vs 프리플라이트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">단순 요청 vs Preflight 요청</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">단순 요청 (Simple Request)</p>
                        <p className="body-xs text-gray060 mb-[6px]">GET/HEAD/POST + 안전한 헤더 + Content-Type이 특정 값일 때만 해당. 브라우저가 바로 요청.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 서버 응답 헤더
Access-Control-Allow-Origin: https://my-app.com`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Preflight 요청 (OPTIONS)</p>
                        <p className="body-xs text-gray060 mb-[6px]">DELETE/PUT, Authorization 헤더, application/json 등의 경우. 실제 요청 전 OPTIONS 요청으로 허용 여부 확인.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// OPTIONS 응답 헤더
Access-Control-Allow-Origin: https://my-app.com
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400  // Preflight 캐시 시간 (초)`}</p>
                    </div>
                </div>
            </div>

            {/* 자격증명 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">자격증명 요청 (Credentials)</p>
                <p className="text-gray060 body-sm">쿠키·인증 헤더를 크로스-오리진 요청에 포함하려면 클라이언트와 서버 모두 설정 필요.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 클라이언트
fetch('https://api.example.com/user', {
  credentials: 'include', // 쿠키 포함
});

// 서버 응답 헤더
Access-Control-Allow-Origin: https://my-app.com  // * 불가, 명시적 origin 필수
Access-Control-Allow-Credentials: true`}</p>
                </div>
            </div>

            {/* 해결 방법 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">개발 환경 CORS 해결 방법</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { method: "서버에서 허용 헤더 추가", desc: "가장 정석. 백엔드에서 Access-Control-Allow-Origin 설정." },
                        { method: "Next.js rewrites (프록시)", desc: "next.config.js의 rewrites로 API 요청을 서버에서 프록시. 브라우저는 같은 origin으로 인식." },
                        { method: "Vite / CRA proxy", desc: "vite.config.js의 server.proxy 또는 package.json의 proxy 설정." },
                    ].map((item) => (
                        <div key={item.method} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray080 font-bold">{item.method}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
