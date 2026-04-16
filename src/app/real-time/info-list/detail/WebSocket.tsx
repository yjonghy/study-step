export default function WebSocket() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">WebSocket</p>
            <p className="text-gray060 body-sm mt-[16px]">
                WebSocket은 하나의 TCP 연결 위에서 클라이언트-서버 간 양방향 실시간 통신을 가능하게 하는 프로토콜이다.<br />
                HTTP Upgrade 핸드셰이크로 연결을 수립하고, 이후 상시 연결을 유지한다.
            </p>

            {/* HTTP vs WebSocket */}
            <div className="mt-[28px] flex gap-[8px]">
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">HTTP Polling</p>
                    <p className="body-xs text-gray060">클라이언트가 주기적으로 서버에 요청. 데이터 없어도 요청 발생 → 불필요한 트래픽, 지연 발생.</p>
                </div>
                <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">WebSocket</p>
                    <p className="body-xs text-gray060">연결 수립 후 양쪽에서 언제든 데이터 전송 가능. 오버헤드 없음, 낮은 지연.</p>
                </div>
            </div>

            {/* 연결 수립 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">연결 수립 — HTTP Upgrade 핸드셰이크</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 클라이언트 요청 헤더
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

// 서버 응답 (101 Switching Protocols)
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
// 이후 HTTP 아님 → WebSocket 프레임 통신`}</p>
                </div>
            </div>

            {/* 브라우저 API */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">브라우저 WebSocket API</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const ws = new WebSocket('wss://api.example.com/chat');

ws.onopen    = () => console.log('연결됨');
ws.onmessage = (e) => console.log('수신:', e.data);
ws.onerror   = (e) => console.error('오류:', e);
ws.onclose   = (e) => console.log('닫힘:', e.code, e.reason);

// 데이터 전송
ws.send(JSON.stringify({ type: 'chat', message: '안녕' }));

// 연결 종료
ws.close(1000, 'Normal closure');`}</p>
                </div>
            </div>

            {/* 재연결 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">재연결 전략 — Exponential Backoff</p>
                <p className="text-gray060 body-sm">네트워크 불안정 환경에서 WebSocket 연결이 끊길 수 있다. 지수 백오프로 재연결 시도 간격을 늘려 서버 부하를 방지한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private retryCount = 0;
  private maxRetries = 5;

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onclose = () => {
      if (this.retryCount < this.maxRetries) {
        const delay = Math.min(1000 * 2 ** this.retryCount, 30000);
        setTimeout(() => {
          this.retryCount++;
          this.connect(url); // 재연결 시도
        }, delay);
      }
    };

    this.ws.onopen = () => {
      this.retryCount = 0; // 성공 시 카운트 초기화
    };
  }
}`}</p>
                </div>
            </div>

            {/* 실무 포인트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "ws:// → wss:// (TLS) 사용 필수 — HTTP 환경에서 ws:// 차단될 수 있음",
                        "Heartbeat (Ping/Pong) — 30초마다 서버에 ping 전송으로 연결 유지",
                        "연결 상태 관리 — readyState: 0(CONNECTING), 1(OPEN), 2(CLOSING), 3(CLOSED)",
                        "컴포넌트 언마운트 시 ws.close() 반드시 호출하여 리소스 정리",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-blue030 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
