export default function Closure() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">클로저 (Closure)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                클로저란 함수가 선언될 당시의 렉시컬 환경(Lexical Environment)을 기억하여,<br />
                함수가 외부 스코프 밖에서 실행될 때도 그 환경에 접근할 수 있는 함수를 말한다.
            </p>

            {/* 핵심 개념 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">렉시컬 스코프 (Lexical Scope)</p>
                <p className="text-gray060 body-sm">
                    JS는 함수를 어디서 <strong>호출</strong>했는지가 아니라, 어디서 <strong>정의</strong>했는지에 따라 상위 스코프가 결정된다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function outer() {
  const x = 10;
  function inner() {
    console.log(x); // 10 — 정의 시점의 스코프를 기억
  }
  return inner;
}

const fn = outer(); // outer 실행 컨텍스트는 종료
fn();               // 그러나 inner는 x에 접근 가능 → 클로저`}</p>
                </div>
            </div>

            {/* 주요 활용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 활용 패턴</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">1. 데이터 은닉 (캡슐화)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function makeCounter() {
  let count = 0; // 외부에서 직접 접근 불가
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
}
const counter = makeCounter();
counter.increment(); // 1
counter.get();       // 1`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">2. 부분 적용 / 커링 (Partial Application)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function multiply(x: number) {
  return (y: number) => x * y; // x를 클로저로 기억
}
const double = multiply(2);
double(5); // 10
double(7); // 14`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">3. React의 useState / useCallback</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// useCallback은 deps 배열의 값을 클로저로 캡처한다
const handleClick = useCallback(() => {
  console.log(count); // 클로저로 count 캡처
}, [count]);          // count가 변경될 때만 새 함수 생성`}</p>
                    </div>
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의 — 메모리 누수 & 루프 함정</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">루프 + var 함정</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 출력: 3, 3, 3 — var는 클로저로 같은 i 참조`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">let으로 해결</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 출력: 0, 1, 2 — let은 블록 스코프마다 새 바인딩`}</p>
                    </div>
                </div>
                <div className="mt-[8px] bg-yellow005 border border-yellow020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-yellow060 font-bold mb-[4px]">메모리 누수 주의</p>
                    <p className="body-xs text-gray060">클로저가 대용량 객체를 참조하면 GC 대상에서 제외된다. 이벤트 리스너나 타이머에서 클로저를 사용할 때 반드시 cleanup을 수행해야 한다.</p>
                </div>
            </div>
        </article>
    )
}
