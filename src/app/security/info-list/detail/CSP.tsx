export default function CSP() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">CSP (Content Security Policy)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                CSP는 브라우저에게 어떤 출처의 리소스만 로드·실행을 허용할지 지시하는 HTTP 응답 헤더다.<br />
                XSS 공격의 마지막 방어선으로, 악성 스크립트가 삽입되더라도 실행을 차단한다.
            </p>

            {/* 기본 구조 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">헤더 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`Content-Security-Policy: [directive] [source]; [directive] [source]; ...

// 예시
Content-Security-Policy:
  default-src 'self';                    // 기본: 같은 origin만
  script-src 'self' 'nonce-abc123';     // 스크립트: self + nonce
  style-src 'self' 'unsafe-inline';     // 스타일: self + 인라인 허용
  img-src 'self' https://cdn.example.com data:;  // 이미지
  connect-src 'self' https://api.example.com;    // fetch/XHR
  frame-ancestors 'none';               // iframe 삽입 금지 (Clickjacking 방어)`}</p>
                </div>
            </div>

            {/* 주요 Directive */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 Directive</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { name: "default-src", desc: "다른 directive의 기본값. 명시되지 않은 리소스 유형의 폴백." },
                        { name: "script-src", desc: "JS 실행 허용 출처. 'unsafe-inline', 'unsafe-eval' 최대한 지양." },
                        { name: "style-src", desc: "CSS 허용 출처. styled-components 등 CSS-in-JS는 'unsafe-inline' 필요할 수 있음." },
                        { name: "connect-src", desc: "fetch, XHR, WebSocket, EventSource 연결 허용 출처." },
                        { name: "frame-ancestors", desc: "이 페이지를 iframe에 삽입 가능한 출처. 'none'으로 Clickjacking 방어." },
                        { name: "report-uri / report-to", desc: "정책 위반 발생 시 보고할 URL. 차단 없이 모니터링만 원하면 CSP-Report-Only 헤더 사용." },
                    ].map((item) => (
                        <div key={item.name} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray080 font-mono font-bold">{item.name}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* nonce 방식 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">nonce 방식 — 인라인 스크립트 허용</p>
                <p className="text-gray060 body-sm">요청마다 랜덤 nonce를 생성하여, 해당 nonce를 가진 인라인 스크립트만 실행 허용. &apos;unsafe-inline&apos; 없이도 인라인 스크립트 사용 가능.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 서버 (Next.js Middleware)
const nonce = crypto.randomUUID();
headers.set('Content-Security-Policy',
  \`script-src 'self' 'nonce-\${nonce}'\`
);

// HTML
<script nonce={nonce}>
  // 이 nonce를 모르는 공격자의 스크립트는 차단됨
</script>

// Next.js App Router — next.config.js
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{ key: 'Content-Security-Policy', value: cspValue }],
    }];
  },
};`}</p>
                </div>
            </div>

            {/* 단계적 적용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">단계적 적용 — Report-Only 먼저</p>
                <div className="mt-[8px] bg-yellow005 border border-yellow020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-yellow060 font-bold mb-[4px]">권장 도입 순서</p>
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 1단계: 차단 없이 위반 사항만 수집
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report

// 2단계: 위반 로그 분석 후 허용 목록 정리
// 3단계: Content-Security-Policy 헤더로 전환 (실제 차단 적용)`}</p>
                </div>
            </div>
        </article>
    )
}
