export default function BrowserStorage() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">브라우저 저장소</p>
            <p className="text-gray060 body-sm mt-[16px]">
                브라우저에서 데이터를 클라이언트 측에 저장하는 방법은 여러 가지가 있다.<br />
                각각의 저장 범위, 용량, 만료 정책, 보안 특성이 다르므로 상황에 맞게 선택해야 한다.
            </p>

            {/* Cookie */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Cookie</p>
                <p className="text-gray060 body-sm">
                    서버가 Set-Cookie 헤더로 내려주며, 이후 모든 HTTP 요청에 자동으로 포함된다.
                </p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "용량",        desc: "도메인당 약 4KB, 20~50개 제한" },
                        { label: "만료",        desc: "Expires / Max-Age 속성으로 설정. 없으면 세션 쿠키(탭 종료 시 삭제)" },
                        { label: "HttpOnly",   desc: "JS에서 document.cookie 접근 불가 → XSS 공격으로부터 토큰 보호" },
                        { label: "Secure",     desc: "HTTPS 연결에서만 전송" },
                        { label: "SameSite",   desc: "Strict/Lax/None — 크로스 사이트 요청에 쿠키 포함 여부 제어 (CSRF 방어)" },
                        { label: "Domain/Path", desc: "쿠키를 전송할 도메인과 경로 범위 지정" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[90px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gray010 rounded-[8px] p-[12px] mt-[2px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 서버 응답 헤더
Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600

// JS에서 쓰기 (HttpOnly 없는 쿠키만)
document.cookie = "theme=dark; Max-Age=86400; path=/"`}</p>
                </div>
            </div>

            {/* localStorage / sessionStorage */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">localStorage / sessionStorage</p>
                <p className="text-gray060 body-sm">HTML5에서 도입. HTTP 요청에 자동으로 포함되지 않는다.</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-blue005 border border-blue020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-blue040 font-bold mb-[4px]">localStorage</p>
                        {[
                            "약 5~10MB",
                            "브라우저 종료 후에도 영구 유지",
                            "같은 Origin이면 탭·창 간 공유",
                            "JS로만 읽기/쓰기",
                        ].map((t, i) => (
                            <div key={i} className="flex items-start gap-[5px]">
                                <span className="text-blue030 body-xs">•</span>
                                <span className="body-xs text-gray060">{t}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">sessionStorage</p>
                        {[
                            "약 5~10MB",
                            "탭/창 종료 시 데이터 삭제",
                            "같은 Origin이어도 탭 간 공유 안 됨",
                            "JS로만 읽기/쓰기",
                        ].map((t, i) => (
                            <div key={i} className="flex items-start gap-[5px]">
                                <span className="text-green050 body-xs">•</span>
                                <span className="body-xs text-gray060">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray010 rounded-[8px] p-[12px] mt-[2px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme')
localStorage.removeItem('theme')
localStorage.clear()`}</p>
                </div>
            </div>

            {/* IndexedDB */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">IndexedDB</p>
                <p className="text-gray060 body-sm">
                    브라우저 내장 비관계형 DB. 수백 MB 이상 저장 가능, 비동기 API.
                </p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "구조화된 데이터(JS 객체, 파일, Blob) 저장 가능",
                        "트랜잭션 지원, 인덱스 기반 쿼리",
                        "오프라인 앱, PWA에 주로 활용",
                        "직접 사용보다 idb, Dexie.js 등 래퍼 라이브러리 추천",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 비교표 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">저장소 비교</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-gray015 rounded-[6px]">
                        <span className="body-xs text-gray050 font-bold w-[110px]">저장소</span>
                        <span className="body-xs text-gray050 font-bold w-[70px]">용량</span>
                        <span className="body-xs text-gray050 font-bold w-[80px]">만료</span>
                        <span className="body-xs text-gray050 font-bold w-[70px]">HTTP 포함</span>
                        <span className="body-xs text-gray050 font-bold flex-1">주용도</span>
                    </div>
                    {[
                        { name: "Cookie",         size: "4KB",    exp: "설정 가능",   http: "○ 자동",  use: "인증 토큰, 세션" },
                        { name: "localStorage",   size: "5~10MB", exp: "영구",        http: "×",       use: "유저 설정, 테마" },
                        { name: "sessionStorage", size: "5~10MB", exp: "탭 종료 시",  http: "×",       use: "임시 폼 데이터" },
                        { name: "IndexedDB",      size: "수백MB+", exp: "영구",        http: "×",       use: "오프라인, 대용량" },
                    ].map(({ name, size, exp, http, use }) => (
                        <div key={name} className="flex items-center gap-[8px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold w-[110px]">{name}</span>
                            <span className="body-xs text-gray060 w-[70px]">{size}</span>
                            <span className="body-xs text-gray060 w-[80px]">{exp}</span>
                            <span className="body-xs text-gray060 w-[70px]">{http}</span>
                            <span className="body-xs text-gray060 flex-1">{use}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
