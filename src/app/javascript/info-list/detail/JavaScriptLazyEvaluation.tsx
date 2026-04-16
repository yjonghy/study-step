"use client"

export default function JavaScriptLazyEvaluation() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">제너레이터 / 이터러블 / 지연 평가</p>
            <p className="text-gray060 body-sm mt-[16px]">
                이터러블, 이터레이터, 제너레이터는 JS의 순회 프로토콜 핵심이다.<br />
                지연 평가(Lazy Evaluation)와 결합하면 무한 수열, 대용량 데이터를 효율적으로 처리할 수 있다.
            </p>

            {/* 이터러블 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">이터러블 (Iterable)</p>
                <p className="text-gray060 body-sm">[Symbol.iterator]() 메서드를 가진 객체. for...of, 스프레드 연산자, 구조분해가 모두 이터러블 프로토콜을 사용한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// Array, String, Map, Set은 모두 이터러블
for (const v of [1, 2, 3]) { ... }
for (const ch of 'hello') { ... }

// 이터러블이 아닌 일반 객체에 프로토콜 구현
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let cur = this.from;
    return {
      next: () => cur <= this.to
        ? { value: cur++, done: false }
        : { value: undefined, done: true }
    };
  }
};
for (const n of range) console.log(n); // 1 2 3 4 5`}</p>
                </div>
            </div>

            {/* 이터레이터 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">이터레이터 (Iterator)</p>
                <p className="text-gray060 body-sm">{`{ value, done } 형태의 객체를 반환하는 next() 메서드를 가진 객체.`}</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const arr = [10, 20, 30];
const iter = arr[Symbol.iterator](); // 이터레이터 획득

iter.next(); // { value: 10, done: false }
iter.next(); // { value: 20, done: false }
iter.next(); // { value: 30, done: false }
iter.next(); // { value: undefined, done: true }`}</p>
                </div>
            </div>

            {/* 제너레이터 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">제너레이터 (Generator)</p>
                <p className="text-gray060 body-sm">
                    function* 키워드로 선언. yield로 실행을 일시 중단하고 값을 반환한다.<br />
                    이터러블 + 이터레이터를 동시에 구현하는 가장 간편한 방법.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function* counter(start = 0) {
  while (true) {
    yield start++; // yield마다 실행 일시 중단
  }
}

const gen = counter(1);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
// 무한 수열이지만 pull 방식이라 메모리 문제 없음

// for...of로 순회 (take 패턴)
function* take(iter, n) {
  for (const v of iter) {
    yield v;
    if (--n === 0) return;
  }
}

[...take(counter(1), 5)]; // [1, 2, 3, 4, 5]`}</p>
                </div>
            </div>

            {/* 지연 평가 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">지연 평가 (Lazy Evaluation)</p>
                <p className="text-gray060 body-sm">값이 <strong>필요한 시점</strong>에만 계산한다. 제너레이터 기반 파이프라인을 만들면 중간 배열 생성 없이 대용량 데이터를 효율적으로 처리할 수 있다.</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">즉시 평가 — 중간 배열 3개 생성</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const result = [1,2,3,4,5,6,7,8,9,10]
  .filter(n => n % 2 === 0)  // [2,4,6,8,10]
  .map(n => n * n)            // [4,16,36,64,100]
  .slice(0, 3);               // [4,16,36]`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">지연 평가 — 필요한 만큼만 처리</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function* lazyFilter(iter, pred) {
  for (const v of iter) if (pred(v)) yield v;
}
function* lazyMap(iter, fn) {
  for (const v of iter) yield fn(v);
}

const pipeline = take(
  lazyMap(
    lazyFilter(counter(1), n => n % 2 === 0),
    n => n * n
  ), 3
);
[...pipeline]; // [4, 16, 36] — 중간 배열 없음`}</p>
                    </div>
                </div>
            </div>

            {/* async generator */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">async 제너레이터 — 비동기 스트리밍</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`async function* streamPages(url) {
  let page = 1;
  while (true) {
    const res = await fetch(\`\${url}?page=\${page++}\`);
    const data = await res.json();
    if (!data.length) return;
    yield data; // 페이지 단위로 스트리밍
  }
}

// SSE / AI 응답 스트리밍에도 동일 패턴 활용
for await (const chunk of streamPages('/api/items')) {
  renderChunk(chunk);
}`}</p>
                </div>
            </div>
        </article>
    )
}
