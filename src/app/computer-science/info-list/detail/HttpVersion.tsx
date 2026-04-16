export default function HttpVersion() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">HTTP 버전 특징</p>
            <p className="text-gray060 body-sm mt-[16px]">
                HTTP(HyperText Transfer Protocol)는 클라이언트-서버 간 데이터를 전송하는 애플리케이션 레이어 프로토콜이다.<br />
                버전이 올라갈수록 성능과 효율성이 크게 개선됐다.
            </p>

            {/* HTTP/1.0 vs 1.1 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">HTTP/1.0 → HTTP/1.1</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">HTTP/1.0 문제</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                "매 요청마다 TCP 연결 생성 → 오버헤드",
                                "응답 후 즉시 연결 종료",
                                "Host 헤더 없음 → 가상 호스팅 불가",
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-[5px]">
                                    <span className="text-red040 body-xs">•</span>
                                    <span className="body-xs text-gray060">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">HTTP/1.1 개선</p>
                        <div className="flex flex-col gap-[3px]">
                            {[
                                "Keep-Alive: TCP 연결 재사용 (기본값)",
                                "파이프라이닝: 응답 전 다음 요청 전송",
                                "Host 헤더 필수 → 가상 호스팅 지원",
                                "청크 전송 인코딩",
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-[5px]">
                                    <span className="text-green050 body-xs">•</span>
                                    <span className="body-xs text-gray060">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-yellow005 border border-yellow030 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">HTTP/1.1의 한계 — HOLB (Head-of-Line Blocking)</p>
                    <p className="body-xs text-gray060">파이프라이닝은 순서를 보장해야 해서 앞 응답이 느리면 뒤 요청이 모두 대기. 실제로는 잘 사용 안 됨.</p>
                </div>
            </div>

            {/* HTTP/2 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">HTTP/2 — 멀티플렉싱</p>
                <p className="text-gray060 body-sm">구글의 SPDY 프로토콜 기반. 하나의 TCP 연결에서 여러 스트림을 동시에 처리한다.</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "멀티플렉싱",      desc: "하나의 TCP 연결에서 여러 요청/응답을 동시에 처리. HOLB 해결" },
                        { label: "헤더 압축 (HPACK)", desc: "중복 헤더를 허프만 코딩으로 압축. 반복 헤더는 인덱스로 참조" },
                        { label: "서버 Push",        desc: "클라이언트 요청 전에 서버가 필요한 리소스를 미리 전송" },
                        { label: "바이너리 프레이밍", desc: "텍스트 기반 → 바이너리 프레임 단위 전송. 파싱 효율 향상" },
                        { label: "스트림 우선순위",   desc: "중요한 리소스(CSS, Critical JS)에 우선순위 부여 가능" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[130px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* HTTP/3 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">HTTP/3 — QUIC (UDP 기반)</p>
                <p className="text-gray060 body-sm">
                    TCP 대신 UDP 위에 구현된 QUIC 프로토콜을 사용.<br />
                    HTTP/2의 TCP 레벨 HOLB까지 해결했다.
                </p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "0-RTT 연결",     desc: "이전에 연결한 서버라면 핸드셰이크 없이 바로 데이터 전송" },
                        { label: "QUIC",            desc: "UDP 기반이지만 신뢰성/순서보장을 애플리케이션 레이어에서 구현" },
                        { label: "독립 스트림",     desc: "스트림마다 독립적 오류 처리 → TCP HOLB 완전 해결" },
                        { label: "연결 이동성",     desc: "IP 변경(Wi-Fi → LTE)에도 연결 유지 (Connection ID 기반)" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[130px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 버전 비교표 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">버전 비교</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { version: "HTTP/1.0", transport: "TCP",      conn: "요청마다 새 연결",   multi: "×", compress: "×",    holb: "있음" },
                        { version: "HTTP/1.1", transport: "TCP",      conn: "Keep-Alive 재사용",  multi: "△", compress: "×",    holb: "있음 (앱 레벨)" },
                        { version: "HTTP/2",   transport: "TCP",      conn: "단일 연결 멀티플렉싱", multi: "○", compress: "HPACK", holb: "TCP 레벨 있음" },
                        { version: "HTTP/3",   transport: "UDP(QUIC)", conn: "0-RTT 가능",         multi: "○", compress: "QPACK", holb: "없음" },
                    ].map(({ version, transport, conn, multi, compress, holb }) => (
                        <div key={version} className="flex items-center gap-[8px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold w-[70px]">{version}</span>
                            <span className="body-xs text-gray050 w-[80px]">{transport}</span>
                            <span className="body-xs text-gray060 flex-1">{conn}</span>
                            <span className="body-xs text-gray050 w-[40px] text-center">{multi}</span>
                            <span className="body-xs text-gray050 w-[50px]">{compress}</span>
                            <span className="body-xs text-gray040 w-[90px] text-right">{holb}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
