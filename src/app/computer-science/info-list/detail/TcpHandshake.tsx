export default function TcpHandshake() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">TCP & 3-way Handshake</p>
            <p className="text-gray060 body-sm mt-[16px]">
                TCP(Transmission Control Protocol)는 신뢰성 있는 연결 지향형 프로토콜이다.<br />
                데이터 전송 전 반드시 연결을 수립하고, 종료 시 정식으로 연결을 해제한다.
            </p>

            {/* TCP vs UDP */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">TCP vs UDP</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 flex flex-col gap-[3px]">
                        <p className="body-xs text-gray050 font-bold mb-[2px]">TCP</p>
                        {[
                            "연결 지향 (3-way handshake)",
                            "신뢰성 있는 전송 (ACK 확인)",
                            "순서 보장 (Sequence Number)",
                            "흐름 제어 / 혼잡 제어",
                            "느림 — 오버헤드 있음",
                            "HTTP, HTTPS, FTP, SMTP",
                        ].map((t, i) => (
                            <div key={i} className="flex items-start gap-[5px]">
                                <span className="text-blue030 body-xs">•</span>
                                <span className="body-xs text-gray060">{t}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-[3px]">
                        <p className="body-xs text-gray050 font-bold mb-[2px]">UDP</p>
                        {[
                            "비연결 지향",
                            "신뢰성 없음 (ACK 없음)",
                            "순서 보장 없음",
                            "흐름 제어 없음",
                            "빠름 — 오버헤드 적음",
                            "DNS, 스트리밍, VoIP, 게임",
                        ].map((t, i) => (
                            <div key={i} className="flex items-start gap-[5px]">
                                <span className="text-green050 body-xs">•</span>
                                <span className="body-xs text-gray060">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3-way Handshake */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">3-way Handshake — 연결 수립</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            step: "① SYN",
                            from: "클라이언트 → 서버",
                            desc: "클라이언트가 연결 요청. 임의의 시퀀스 번호(A) 포함. 상태: SYN_SENT",
                            color: "text-blue040",
                        },
                        {
                            step: "② SYN-ACK",
                            from: "서버 → 클라이언트",
                            desc: "서버가 수락. 서버 시퀀스(B) + ACK(A+1) 전송. 상태: SYN_RECEIVED",
                            color: "text-green050",
                        },
                        {
                            step: "③ ACK",
                            from: "클라이언트 → 서버",
                            desc: "클라이언트가 ACK(B+1) 전송. 연결 수립 완료. 상태: ESTABLISHED",
                            color: "text-blue040",
                        },
                    ].map(({ step, from, desc, color }) => (
                        <div key={step} className="bg-gray010 px-[12px] py-[8px] rounded-[8px] flex items-start gap-[10px]">
                            <span className={`body-xs font-bold ${color} min-w-[70px]`}>{step}</span>
                            <div>
                                <p className="body-xs text-gray040 mb-[2px]">{from}</p>
                                <p className="body-xs text-gray060">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4-way Handshake */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">4-way Handshake — 연결 해제</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            step: "① FIN",
                            from: "클라이언트 → 서버",
                            desc: "클라이언트가 종료 요청 전송. 상태: FIN_WAIT_1",
                        },
                        {
                            step: "② ACK",
                            from: "서버 → 클라이언트",
                            desc: "서버가 FIN 수신 확인. 클라이언트 상태: FIN_WAIT_2. 서버는 아직 데이터 전송 가능",
                        },
                        {
                            step: "③ FIN",
                            from: "서버 → 클라이언트",
                            desc: "서버가 종료 준비 완료 후 FIN 전송. 상태: LAST_ACK",
                        },
                        {
                            step: "④ ACK",
                            from: "클라이언트 → 서버",
                            desc: "클라이언트가 ACK 전송 후 TIME_WAIT 대기 (2MSL). 이후 CLOSED",
                        },
                    ].map(({ step, from, desc }) => (
                        <div key={step} className="bg-gray010 px-[12px] py-[8px] rounded-[8px] flex items-start gap-[10px]">
                            <span className="body-xs font-bold text-blue040 min-w-[70px]">{step}</span>
                            <div>
                                <p className="body-xs text-gray040 mb-[2px]">{from}</p>
                                <p className="body-xs text-gray060">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-yellow005 border border-yellow030 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">TIME_WAIT란?</p>
                    <p className="body-xs text-gray060">
                        마지막 ACK가 서버에 도달하지 못할 경우를 대비해 일정 시간(2 × MSL = 약 60초~120초) 대기.<br />
                        새 연결에서 이전 패킷이 재사용되는 것을 방지.
                    </p>
                </div>
            </div>

            {/* TCP 신뢰성 특징 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">TCP 신뢰성 보장 메커니즘</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "순서 제어",  desc: "세그먼트 헤더의 Sequence Number로 수신측에서 올바른 순서로 재조립" },
                        { label: "오류 제어",  desc: "Checksum으로 오류 감지, NAK(재전송 요청) 또는 타임아웃 후 재전송" },
                        { label: "흐름 제어",  desc: "Sliding Window: 수신 버퍼 크기(rwnd)에 맞춰 송신량 동적 조절" },
                        { label: "혼잡 제어",  desc: "Slow Start → Congestion Avoidance → Fast Retransmit으로 네트워크 혼잡 방지" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[70px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
