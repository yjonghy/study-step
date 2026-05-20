export default function DNS() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">DNS 동작 방식</p>
            <p className="text-gray060 body-sm mt-[16px]">
                DNS(Domain Name System)는 사람이 읽을 수 있는 도메인 이름을 IP 주소로 변환하는 분산 계층 데이터베이스다.
                브라우저에서 URL을 입력하면 페이지가 렌더링되기 전에 DNS 조회가 먼저 일어난다.
            </p>

            {/* 조회 과정 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">DNS 조회 과정 (www.example.com 예시)</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["1", "브라우저 캐시 확인", "최근 방문 시 IP가 브라우저에 캐시되어 있으면 바로 사용. TTL이 남아 있어야 유효."],
                        ["2", "OS 캐시 / hosts 파일", "브라우저 캐시 미스 시 운영체제 DNS 캐시 및 /etc/hosts 파일 확인."],
                        ["3", "Recursive Resolver (통신사 DNS)", "ISP가 제공하는 DNS 서버. 캐시에 없으면 Root → TLD → Authoritative 순으로 대신 조회해 줌."],
                        ["4", "Root Name Server", "최상위 DNS. .com, .kr 등 TLD 서버의 주소를 알려줌. 전 세계 13개 루트 서버 클러스터."],
                        ["5", "TLD Name Server", ".com 담당 서버. example.com의 Authoritative 서버 주소를 반환."],
                        ["6", "Authoritative Name Server", "example.com의 실제 IP를 보유. 최종적으로 IP 반환."],
                        ["7", "응답 캐시 & 연결", "Resolver → 브라우저로 IP 전달, TTL 동안 캐시. 브라우저가 TCP 연결 시작."],
                    ].map(([step, title, desc]) => (
                        <div key={step} className="flex gap-[10px] bg-gray010 rounded-[6px] px-[10px] py-[8px]">
                            <span className="w-[20px] h-[20px] min-w-[20px] rounded-full bg-blue030 text-white body-xs flex items-center justify-center font-bold mt-[1px]">{step}</span>
                            <div>
                                <p className="body-xs text-gray080 font-bold">{title}</p>
                                <p className="body-xs text-gray060 mt-[2px] leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DNS 레코드 종류 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 DNS 레코드</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["A", "도메인 → IPv4 주소 (example.com → 93.184.216.34)"],
                        ["AAAA", "도메인 → IPv6 주소"],
                        ["CNAME", "도메인 → 다른 도메인 (www.example.com → example.com)"],
                        ["MX", "이메일 수신 서버 지정 (mail.example.com)"],
                        ["TXT", "도메인 소유권 확인, SPF, DKIM 등 텍스트 데이터"],
                        ["NS", "도메인의 Authoritative 네임 서버 지정"],
                        ["SOA", "도메인 영역의 권한·관리 정보 (TTL, 시리얼 번호 등)"],
                    ].map(([record, desc]) => (
                        <div key={record} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs font-mono text-blue030 font-bold w-[50px] shrink-0">{record}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* TTL & 캐싱 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">TTL (Time To Live) & DNS 전파</p>
                <p className="text-gray060 body-sm">TTL은 DNS 레코드가 캐시에 유지되는 시간(초)이다. 짧을수록 변경이 빠르게 반영되지만 조회 횟수가 늘어난다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">{`; example.com Authoritative 레코드 예시
@ IN A   93.184.216.34   ; TTL 3600 (1시간)
www IN CNAME example.com ; TTL 300  (5분)

# 도메인 이전 시 전략
# 1. 이전 2~3일 전 TTL을 300s로 줄임 (캐시 빠르게 소멸)
# 2. IP 변경 적용
# 3. 전파 완료 후 TTL 다시 3600s로 복원`}</p>
                    </div>
                    <div className="bg-blue010 rounded-[8px] p-[10px]">
                        <p className="body-xs text-blue030">DNS 전파(propagation)는 전 세계 resolver 캐시가 갱신되는 시간으로, TTL에 따라 몇 분~48시간까지 걸릴 수 있다.</p>
                    </div>
                </div>
            </div>

            {/* 성능 최적화 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">DNS와 웹 성능</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">DNS Prefetch — 미리 조회</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 외부 도메인 DNS를 미리 조회해 지연 감소 -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="dns-prefetch" href="//cdn.example.com" />`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Preconnect — DNS + TCP + TLS 미리 완료</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- dns-prefetch보다 강력 — 연결 전체를 미리 맺음 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<!-- cross-origin이면 crossorigin 속성 필요 -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`}</p>
                    </div>
                </div>
            </div>

            {/* DoH / DoT */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">DNS over HTTPS (DoH) & DNS over TLS (DoT)</p>
                <p className="text-gray060 body-sm">기존 DNS 쿼리는 평문(UDP 53)으로 전송되어 ISP·공격자가 조회 내역을 볼 수 있다. DoH/DoT는 쿼리를 암호화한다.</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "DoH (DNS over HTTPS)", "DoT (DNS over TLS)"],
                        ["포트", "443", "853"],
                        ["전송 방식", "HTTPS (HTTP/2)", "TLS"],
                        ["브라우저 지원", "Chrome, Firefox 지원", "OS 레벨 지원 중심"],
                        ["감지·차단", "일반 HTTPS와 구분 어려움", "포트로 식별 가능"],
                    ].map(([label, a, b], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
