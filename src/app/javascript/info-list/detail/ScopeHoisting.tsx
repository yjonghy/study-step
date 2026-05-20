export default function ScopeHoisting() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">스코프 & 호이스팅</p>
            <p className="text-gray060 body-sm mt-[16px]">
                스코프는 변수·함수가 참조될 수 있는 유효 범위이고, 호이스팅은 선언이 코드 실행 전에 해당 스코프 최상단으로 끌어올려지는 동작이다.
                이 두 개념은 JavaScript 실행 컨텍스트의 핵심이다.
            </p>

            {/* 스코프 종류 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">스코프 종류</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">전역 스코프 / 함수 스코프 / 블록 스코프</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`var x = 1;           // 전역 스코프 (어디서든 접근 가능)

function foo() {
  var y = 2;         // 함수 스코프 (foo 안에서만)
  if (true) {
    let z = 3;       // 블록 스코프 (if 블록 안에서만)
    const w = 4;     // 블록 스코프
    var v = 5;       // 함수 스코프 (if 블록 밖에서도 접근 가능!)
  }
  console.log(v);    // 5  ← var는 블록을 무시
  console.log(z);    // ReferenceError ← let/const는 블록에 갇힘
}

foo();
console.log(y);      // ReferenceError ← 함수 바깥 접근 불가`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">렉시컬 스코프 (정적 스코프)</p>
                        <p className="body-xs text-gray050 mb-[6px]">함수가 선언된 위치에 따라 스코프가 결정된다 — 호출 위치가 아님.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const name = "전역";

function outer() {
  const name = "outer";
  function inner() {
    console.log(name); // "outer" ← 선언 위치 기준
  }
  inner();
}

outer(); // "outer"  (호출 위치인 전역의 "전역"이 아님)`}</p>
                    </div>
                </div>
            </div>

            {/* 스코프 체인 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">스코프 체인</p>
                <p className="text-gray060 body-sm">변수를 찾을 때 현재 스코프 → 바깥 스코프 → ... → 전역 스코프 순으로 올라가며 탐색한다. 없으면 <span className="font-mono text-gray080">ReferenceError</span>.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const a = 1;
function outer() {
  const b = 2;
  function inner() {
    const c = 3;
    console.log(a + b + c); // 6
    // c → inner, b → outer, a → 전역 순으로 탐색
  }
  inner();
}
outer();`}</p>
                </div>
            </div>

            {/* 호이스팅 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">호이스팅 (Hoisting)</p>
                <p className="text-gray060 body-sm">JavaScript 엔진은 코드를 실행하기 전 선언(변수·함수)을 스코프 최상단으로 끌어올린다. 초기화는 끌어올리지 않는다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">var — 선언만 호이스팅, undefined로 초기화</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`console.log(x); // undefined  (에러 아님!)
var x = 5;
console.log(x); // 5

// 엔진이 실제로 처리하는 방식
var x;           // 선언 호이스팅
console.log(x);  // undefined
x = 5;           // 할당은 제자리`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">let / const — TDZ (Temporal Dead Zone)</p>
                        <p className="body-xs text-gray050 mb-[6px]">선언은 호이스팅되지만 초기화 전 접근 시 ReferenceError. 선언 라인에 도달하기 전까지를 TDZ라 부른다.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;      // 이 라인에서 TDZ 종료

// const도 동일
console.log(z); // ReferenceError
const z = 20;`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">함수 선언식 vs 함수 표현식</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 함수 선언식 → 전체(선언 + 함수 몸체) 호이스팅
greet(); // "안녕!" ← 정상 동작
function greet() { console.log("안녕!"); }

// 함수 표현식 → 변수 호이스팅만 (var이면 undefined)
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("안녕히!"); };

// 화살표 함수도 동일 (표현식이므로 TDZ 대상)
hi(); // ReferenceError
const hi = () => console.log("Hi!");`}</p>
                    </div>
                </div>
            </div>

            {/* var vs let vs const */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">var / let / const 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "var", "let", "const"],
                        ["스코프", "함수", "블록", "블록"],
                        ["재선언", "가능", "불가", "불가"],
                        ["재할당", "가능", "가능", "불가"],
                        ["호이스팅", "undefined", "TDZ", "TDZ"],
                        ["전역 객체 프로퍼티", "O (window.x)", "X", "X"],
                    ].map(([label, a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-4 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 실전 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실전 함정 — var in 루프</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">문제: var 루프에서의 클로저</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 3, 3, 3  ← var는 함수 스코프라 i가 공유됨`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">해결: let으로 교체 (블록 스코프)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 0, 1, 2  ← let은 반복마다 새로운 바인딩 생성`}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}
