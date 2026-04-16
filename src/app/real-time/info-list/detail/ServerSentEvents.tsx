export default function ServerSentEvents() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Server-Sent Events (SSE)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                SSE는 서버에서 클라이언트로의 단방향 실시간 스트리밍을 HTTP 위에서 구현하는 방식이다.<br />
                EventSource API를 통해 서버가 언제든 클라이언트에 데이터를 푸시할 수 있다.
            </p>

            {/* SSE vs WebSocket */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">SSE vs WebSocket — 언제 무엇을 쓸까</p>
                <div className="mt-[8px] overflow-x-auto">
                    <table className="w-full text-[11px] border-collapse">
                        <thead>
                            <tr>
                                {["구분", "SSE", "WebSocket"].map((h) => (
                                    <th key={h} className="bg-gray010 border border-gray020 px-[10px] py-[8px] text-left text-gray060 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["방향성", "단방향 (서버 → 클라이언트)", "양방향"],
                                ["프로토콜", "HTTP/HTTPS", "ws:// / wss://"],
                                ["자동 재연결", "기본 제공", "직접 구현 필요"],
                                ["적합한 사례", "알림, 뉴스피드, AI 스트리밍", "채팅, 게임, 실시간 협업"],
                                ["브라우저 지원", "IE 제외 모두 지원", "IE11+ 포함 모두 지원"],
                            ].map(([label, sse, ws]) => (
                                <tr key={label}>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060 font-bold bg-gray005">{label}</td>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060">{sse}</td>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060">{ws}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 클라이언트 코드 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">EventSource API</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const es = new EventSource('/api/notifications');

// 기본 메시지 수신
es.onmessage = (e) => {
  console.log('수신:', JSON.parse(e.data));
};

// 커스텀 이벤트 수신
es.addEventListener('alert', (e) => {
  showNotification(JSON.parse(e.data));
});

es.onerror = () => {
  // 자동으로 재연결 시도 (기본 동작)
  console.log('오류 발생, 재연결 중...');
};

// 연결 종료
es.close();`}</p>
                </div>
            </div>

            {/* 서버 응답 형식 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">서버 응답 형식</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// Content-Type: text/event-stream 필수
// Cache-Control: no-cache 필수

// 기본 메시지
data: {"type":"notification","message":"주문 완료"}\\n\\n

// 커스텀 이벤트 타입
event: alert\\n
data: {"level":"warning","text":"재고 부족"}\\n\\n

// 재연결 대기 시간 설정 (ms)
retry: 3000\\n\\n

// 이벤트 ID (재연결 시 Last-Event-ID 헤더로 전송)
id: 42\\n
data: {"seq":42,"content":"..."}\\n\\n`}</p>
                </div>
            </div>

            {/* Next.js Route Handler */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Next.js App Router — SSE 스트리밍</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        controller.enqueue(
          encoder.encode(\`data: \${JSON.stringify({ count: i })}\\n\\n\`)
        );
        await new Promise(r => setTimeout(r, 500));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}`}</p>
                </div>
            </div>
        </article>
    )
}
