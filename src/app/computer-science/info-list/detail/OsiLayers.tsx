export default function OsiLayers() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">OSI 7계층</p>
            <p className="text-gray060 body-sm mt-[16px]">
                네트워크 통신을 7단계로 나눈 국제 표준 모델.<br />
                각 계층은 독립적이며 인접 계층과만 통신한다.
            </p>

            {/* OSI vs TCP/IP */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">OSI 7계층 vs TCP/IP 4계층</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 flex flex-col gap-[3px]">
                        <p className="body-xs text-gray050 font-bold mb-[2px] text-center">OSI 7계층</p>
                        {[
                            { num: "7", name: "응용 (Application)",   color: "bg-blue020",   text: "text-blue060" },
                            { num: "6", name: "표현 (Presentation)",   color: "bg-blue015",   text: "text-blue050" },
                            { num: "5", name: "세션 (Session)",        color: "bg-blue010",   text: "text-blue040" },
                            { num: "4", name: "전송 (Transport)",      color: "bg-green015",  text: "text-green060" },
                            { num: "3", name: "네트워크 (Network)",    color: "bg-yellow015", text: "text-yellow060" },
                            { num: "2", name: "데이터링크 (Data Link)", color: "bg-red010",    text: "text-red040" },
                            { num: "1", name: "물리 (Physical)",       color: "bg-gray020",   text: "text-gray060" },
                        ].map(({ num, name, color, text }) => (
                            <div key={num} className={`${color} rounded-[6px] px-[10px] py-[5px] flex items-center gap-[6px]`}>
                                <span className={`body-xs font-bold ${text} w-[14px]`}>{num}</span>
                                <span className="body-xs text-gray070">{name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-[3px]">
                        <p className="body-xs text-gray050 font-bold mb-[2px] text-center">TCP/IP 4계층</p>
                        {[
                            { name: "응용 (Application)",  proto: "HTTP, DNS, FTP",  color: "bg-blue015", rows: 3 },
                            { name: "전송 (Transport)",    proto: "TCP, UDP",         color: "bg-green015", rows: 1 },
                            { name: "인터넷 (Internet)",   proto: "IP, ICMP, ARP",    color: "bg-yellow015", rows: 1 },
                            { name: "네트워크 접근",       proto: "Ethernet, Wi-Fi",  color: "bg-red010", rows: 2 },
                        ].map(({ name, proto, color }) => (
                            <div key={name} className={`${color} rounded-[6px] px-[10px] py-[5px] flex flex-col`}>
                                <span className="body-xs text-gray070 font-bold">{name}</span>
                                <span className="body-xs text-gray040">{proto}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 각 계층 상세 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">각 계층 역할과 프로토콜</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            num: "7", name: "응용 계층",
                            role: "사용자와 네트워크 간 인터페이스 제공",
                            proto: "HTTP/HTTPS, FTP, SMTP, DNS, WebSocket",
                            pdu: "데이터 (Message)",
                        },
                        {
                            num: "6", name: "표현 계층",
                            role: "데이터 포맷 변환, 암호화/복호화, 압축",
                            proto: "SSL/TLS, JPEG, MPEG, ASCII",
                            pdu: "데이터",
                        },
                        {
                            num: "5", name: "세션 계층",
                            role: "통신 세션 설정·유지·종료 관리",
                            proto: "NetBIOS, RPC, PPTP",
                            pdu: "데이터",
                        },
                        {
                            num: "4", name: "전송 계층",
                            role: "종단 간 신뢰성 있는 데이터 전송, 흐름/오류 제어",
                            proto: "TCP (신뢰성), UDP (빠른 전송)",
                            pdu: "세그먼트 (TCP) / 데이터그램 (UDP)",
                        },
                        {
                            num: "3", name: "네트워크 계층",
                            role: "목적지까지 경로 결정 (라우팅), 논리 주소(IP)",
                            proto: "IP, ICMP, ARP, 라우터",
                            pdu: "패킷",
                        },
                        {
                            num: "2", name: "데이터링크 계층",
                            role: "인접 노드 간 데이터 전송, MAC 주소, 오류 감지",
                            proto: "Ethernet, Wi-Fi (802.11), 스위치",
                            pdu: "프레임",
                        },
                        {
                            num: "1", name: "물리 계층",
                            role: "비트를 전기/광 신호로 변환, 물리적 전송 매체",
                            proto: "케이블, 허브, 리피터, 광섬유",
                            pdu: "비트",
                        },
                    ].map(({ num, name, role, proto, pdu }) => (
                        <div key={num} className="bg-gray010 px-[12px] py-[8px] rounded-[8px] flex flex-col gap-[2px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="body-xs text-blue040 font-bold">{num}. {name}</span>
                                <span className="body-xs text-gray030">PDU: {pdu}</span>
                            </div>
                            <span className="body-xs text-gray060">{role}</span>
                            <span className="body-xs text-gray040">{proto}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 프론트엔드 연관 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">프론트엔드 개발자가 주로 다루는 계층</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "7계층 (응용): HTTP/HTTPS 요청, REST API, WebSocket, CORS",
                        "6계층 (표현): TLS 암호화 — HTTPS 연결 수립",
                        "4계층 (전송): TCP 연결 (3-way handshake), 포트 번호",
                        "3계층 (네트워크): DNS 조회 → IP 주소 획득",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
