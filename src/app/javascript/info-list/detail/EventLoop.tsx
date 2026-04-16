"use client"

export default function EventLoop() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">이벤트 루프 (Event Loop)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                JavaScript는 싱글 스레드 언어지만, 이벤트 루프 덕분에 비동기 작업을 처리할 수 있다.<br />
                이벤트 루프는 JS 엔진이 아니라 <strong>런타임 환경</strong>(브라우저, Node.js)의 일부다.
            </p>

            {/* 구성 요소 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">런타임 구성 요소</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { name: "Call Stack", desc: "함수 실행 컨텍스트가 쌓이는 스택. 선입후출(LIFO). JS 엔진의 일부." },
                        { name: "Heap (Memory)", desc: "객체, 변수 등이 저장되는 메모리 공간. GC가 관리." },
                        { name: "Web APIs", desc: "브라우저가 제공하는 API. setTimeout, fetch, DOM 이벤트 등. 콜스택과 별도 스레드." },
                        { name: "Callback Queue (Task Queue)", desc: "Web API 콜백이 대기하는 큐. setTimeout, setInterval, UI 이벤트 등." },
                        { name: "Microtask Queue", desc: "Promise.then, async/await, queueMicrotask의 콜백 대기 큐. Task Queue보다 우선순위 높음." },
                        { name: "Event Loop", desc: "Call Stack이 비어있을 때 큐에서 콜백을 꺼내 콜스택에 넣는 역할. 마이크로태스크 큐를 먼저 소진 후 태스크 큐 처리." },
                    ].map((item) => (
                        <div key={item.name} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-sm text-gray080 font-bold">{item.name}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 동작 흐름 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">비동기 코드 실행 흐름</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["JS 코드 실행", "비동기 함수 만남", "Web API로 위임", "콜백 → 큐에 등록", "Call Stack 비면", "이벤트 루프가 꺼내 실행"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className="bg-blue005 border border-blue020 rounded-[8px] px-[10px] py-[7px]">
                                <p className="body-xs text-blue040 text-center">{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[8px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* 큐 우선순위 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">큐 우선순위 — 마이크로태스크 &gt; 태스크</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`console.log('1');                           // 콜스택 — 동기

setTimeout(() => console.log('2'), 0);      // Task Queue (Web API)

Promise.resolve()
  .then(() => console.log('3'));            // Microtask Queue

console.log('4');                           // 콜스택 — 동기

// 출력 순서: 1 → 4 → 3 → 2
// 이유: 동기 코드 실행 → 마이크로태스크 큐 전부 소진 → 태스크 큐`}</p>
                </div>
            </div>

            {/* async/await */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">async/await와 이벤트 루프</p>
                <p className="text-gray060 body-sm">await 지점에서 함수 실행이 일시 중단되고, 나머지 코드는 마이크로태스크 큐에 등록된다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`async function fetchData() {
  console.log('A');
  const data = await fetch('/api'); // ← 여기서 중단, 제어권 반납
  console.log('B');                 // await 완료 후 마이크로태스크로 재개
}

console.log('X');
fetchData();
console.log('Y');

// 출력: X → A → Y → B`}</p>
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의 — 콜스택 블로킹</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">블로킹 (나쁨)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 무거운 루프가 콜스택 점유
// → 이벤트 루프 정지 → UI 프리즈
for (let i = 0; i < 1e9; i++) {}`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">Web Worker로 분리 (좋음)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 무거운 연산은 Web Worker로 분리
// → 메인 스레드 이벤트 루프 유지
const worker = new Worker('heavy.js');`}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}
