export default function WebWorker() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Web Worker</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Web Worker는 메인 스레드(UI 스레드)와 분리된 백그라운드 스레드에서 JS를 실행한다.<br />
                CPU 집약 작업을 메인 스레드에서 분리하여 UI가 멈추지 않도록 한다.
            </p>

            {/* 왜 필요한가 */}
            <div className="mt-[28px] flex gap-[8px]">
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">메인 스레드 블로킹</p>
                    <p className="body-xs text-gray060">무거운 연산이 메인 스레드에서 실행되면 렌더링·입력 이벤트가 처리되지 않아 UI 프리즈 발생.</p>
                </div>
                <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">Web Worker 분리</p>
                    <p className="body-xs text-gray060">무거운 작업을 워커에서 처리 → 메인 스레드는 자유롭게 렌더링·이벤트 처리.</p>
                </div>
            </div>

            {/* 기본 통신 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">postMessage / onmessage 통신</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray040 font-bold mb-[4px]">main.ts — 메인 스레드</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const worker = new Worker(new URL('./worker.ts', import.meta.url));

// 워커에 데이터 전송
worker.postMessage({ type: 'PROCESS', data: largeArray });

// 워커 결과 수신
worker.onmessage = (e) => {
  console.log('결과:', e.data);
};

worker.onerror = (e) => console.error('워커 오류:', e);

// 사용 완료 후 종료
worker.terminate();`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray040 font-bold mb-[4px]">worker.ts — 워커 스레드</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`self.onmessage = (e) => {
  const { type, data } = e.data;

  if (type === 'PROCESS') {
    // 무거운 연산 (메인 스레드 블로킹 없음)
    const result = data.reduce((acc, n) => acc + n, 0);
    self.postMessage(result);
  }
};`}</p>
                    </div>
                </div>
            </div>

            {/* 이력서 실무 사례 — 재시도 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 적용 — AI 인터뷰 재시도 & 임시 저장</p>
                <p className="text-gray060 body-sm">통신 실패 시 데이터 유실을 방지하기 위해 Web Worker로 재시도 큐와 임시 저장을 관리하는 구조.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// retry-worker.ts
const queue: any[] = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;

  const item = queue[0];
  try {
    await fetch('/api/answer', { method: 'POST', body: JSON.stringify(item) });
    queue.shift(); // 성공 시 제거
    self.postMessage({ type: 'SUCCESS', item });
  } catch {
    // 실패 시 대기 후 재시도 (Exponential Backoff)
    await new Promise(r => setTimeout(r, 2000));
  } finally {
    isProcessing = false;
    processQueue(); // 다음 아이템 처리
  }
}

self.onmessage = (e) => {
  if (e.data.type === 'ENQUEUE') {
    queue.push(e.data.payload);
    // localStorage에 임시 저장 (워커에서도 접근 가능)
    // ※ Worker에서 localStorage 접근 불가 → IndexedDB 사용
    processQueue();
  }
};`}</p>
                </div>
            </div>

            {/* Worker 종류 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Worker 종류 비교</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { name: "Dedicated Worker", desc: "하나의 스크립트에서만 사용. new Worker()로 생성. 가장 일반적." },
                        { name: "Shared Worker", desc: "같은 Origin의 여러 탭/창에서 공유. 탭 간 상태 공유에 활용." },
                        { name: "Service Worker", desc: "네트워크 프록시 역할. 오프라인 캐싱, Push 알림, 백그라운드 동기화." },
                    ].map((item) => (
                        <div key={item.name} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray080 font-bold">{item.name}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
