"use client"

export default function JavaScriptThis() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">JavaScript의 this</p>
            <p className="text-gray060 body-sm mt-[16px]">
                this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 참조 변수다.<br />
                Java와 달리, JavaScript의 this는 <strong>어떻게 호출됐는지</strong>에 따라 동적으로 결정된다.
            </p>

            {/* 4가지 바인딩 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">this 바인딩 4가지 규칙</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">

                    {/* 1. 기본 */}
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">1. 기본 바인딩 — 전역 객체</p>
                        <p className="body-xs text-gray060 mb-[6px]">일반 함수 호출 시 this는 전역 객체(브라우저: window, Node.js: global). strict mode에서는 undefined.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function greet() {
  console.log(this); // window (non-strict) | undefined (strict)
}
greet();`}</p>
                    </div>

                    {/* 2. 암시적 */}
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">2. 암시적 바인딩 — 메서드 호출</p>
                        <p className="body-xs text-gray060 mb-[6px]">객체의 메서드로 호출하면 this는 해당 객체에 바인딩.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const user = {
  name: '종현',
  greet() { console.log(this.name); }
};
user.greet(); // '종현' — this === user

// 주의: 메서드를 변수에 꺼내면 바인딩 잃음
const fn = user.greet;
fn(); // undefined (window.name) — this === window`}</p>
                    </div>

                    {/* 3. 명시적 */}
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">3. 명시적 바인딩 — call / apply / bind</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function introduce(greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
}
const person = { name: '종현' };

introduce.call(person, '안녕');    // '안녕, 종현' — 즉시 호출
introduce.apply(person, ['안녕']); // '안녕, 종현' — 즉시 호출 (인수 배열)

const boundFn = introduce.bind(person); // this 고정, 새 함수 반환
boundFn('반갑습니다');             // '반갑습니다, 종현'`}</p>
                    </div>

                    {/* 4. new */}
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">4. new 바인딩 — 생성자 함수</p>
                        <p className="body-xs text-gray060 mb-[6px]">new로 함수를 호출하면 빈 객체가 생성되고, this는 그 객체에 바인딩.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function Person(name: string) {
  this.name = name;
}
const p = new Person('종현');
console.log(p.name); // '종현' — this === p (새 객체)`}</p>
                    </div>
                </div>
            </div>

            {/* 화살표 함수 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">화살표 함수 — 렉시컬 this</p>
                <p className="text-gray060 body-sm">
                    화살표 함수는 자체 this를 가지지 않는다.<br />
                    선언될 당시의 <strong>상위 스코프 this</strong>를 그대로 사용한다 (call/apply/bind로도 변경 불가).
                </p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">일반 함수 — this 잃음</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`class Timer {
  count = 0;
  start() {
    setInterval(function() {
      this.count++; // this === window → NaN
    }, 1000);
  }
}`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">화살표 함수 — this 유지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`class Timer {
  count = 0;
  start() {
    setInterval(() => {
      this.count++; // this === Timer 인스턴스
    }, 1000);
  }
}`}</p>
                    </div>
                </div>
            </div>

            {/* 우선순위 요약 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">바인딩 우선순위</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["new 바인딩", "명시적 (call/apply/bind)", "암시적 (메서드)", "기본 (전역)"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className={`rounded-[8px] px-[10px] py-[7px] ${i === 0 ? 'bg-blue005 border border-blue030' : 'bg-gray010 border border-gray020'}`}>
                                <p className={`body-xs ${i === 0 ? 'text-blue040 font-bold' : 'text-gray060'}`}>{i + 1}순위: {step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[6px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
