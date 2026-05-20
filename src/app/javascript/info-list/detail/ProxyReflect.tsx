export default function ProxyReflect() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Proxy & Reflect</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <span className="font-mono text-gray080">Proxy</span>는 객체에 가해지는 기본 동작(읽기·쓰기·삭제 등)을 가로채어 커스텀 로직을 실행할 수 있게 하는 래퍼 객체다.
                <span className="font-mono text-gray080"> Reflect</span>는 Proxy 핸들러 안에서 원래 동작을 그대로 수행할 때 사용하는 내장 객체다.
                Vue 3의 reactivity, Mobx 등 주요 라이브러리가 내부적으로 사용한다.
            </p>

            {/* Proxy 기본 구조 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Proxy 기본 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const proxy = new Proxy(target, handler);
// target  : 감싸려는 원본 객체
// handler : 트랩(trap)을 정의하는 객체

const user = { name: "종현", age: 30 };

const userProxy = new Proxy(user, {
  get(target, key) {               // 읽기 트랩
    console.log(\`읽기: \${key}\`);
    return Reflect.get(target, key); // 원래 동작 위임
  },
  set(target, key, value) {        // 쓰기 트랩
    if (key === "age" && typeof value !== "number") {
      throw new TypeError("age는 숫자여야 합니다");
    }
    return Reflect.set(target, key, value);
  },
});

console.log(userProxy.name); // 읽기: name → "종현"
userProxy.age = "서른";      // TypeError!
userProxy.age = 31;          // 정상`}</p>
                </div>
            </div>

            {/* 주요 트랩 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 트랩 (Trap)</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["get(target, key)", "프로퍼티 읽기 obj.key"],
                        ["set(target, key, value)", "프로퍼티 쓰기 obj.key = val"],
                        ["has(target, key)", "in 연산자 'key' in obj"],
                        ["deleteProperty(target, key)", "delete obj.key"],
                        ["apply(target, thisArg, args)", "함수 호출 fn()"],
                        ["construct(target, args)", "new 연산자 new Fn()"],
                        ["ownKeys(target)", "Object.keys(), for…in"],
                    ].map(([trap, when]) => (
                        <div key={trap} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs font-mono text-blue030 shrink-0 w-[220px]">{trap}</p>
                            <p className="body-xs text-gray060">{when}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 유효성 검사 예시 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">활용 — 유효성 검사 래퍼</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function createValidator(target, validators) {
  return new Proxy(target, {
    set(obj, key, value) {
      if (validators[key]) {
        const error = validators[key](value);
        if (error) throw new Error(\`[\${key}] \${error}\`);
      }
      return Reflect.set(obj, key, value);
    },
  });
}

const person = createValidator({}, {
  age: (v) => (v < 0 || v > 150 ? "0~150 범위여야 합니다" : null),
  name: (v) => (typeof v !== "string" ? "문자열이어야 합니다" : null),
});

person.name = "종현";  // OK
person.age  = -1;      // Error: [age] 0~150 범위여야 합니다`}</p>
                </div>
            </div>

            {/* 관찰 가능한 객체 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">활용 — Observable 패턴 (Vue 3 reactivity 원리)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function reactive(obj) {
  const subscribers = new Map();

  return new Proxy(obj, {
    get(target, key) {
      // 현재 실행 중인 effect를 수집 (의존성 추적)
      track(subscribers, key);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      // 구독자들에게 변경 알림
      trigger(subscribers, key);
      return result;
    },
  });
}

const state = reactive({ count: 0 });
effect(() => console.log("count:", state.count)); // "count: 0"
state.count++;  // "count: 1" ← 자동 재실행`}</p>
                </div>
            </div>

            {/* Reflect */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Reflect — 트랩 안의 안전한 원본 동작</p>
                <p className="text-gray060 body-sm"><span className="font-mono text-gray080">Reflect</span>는 Proxy 트랩 안에서 원본 동작을 그대로 실행할 때 사용한다. <span className="font-mono text-gray080">target[key]</span> 대신 쓰는 이유는 <span className="font-mono text-gray080">this</span> 바인딩을 올바르게 유지하기 위해서다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Reflect.get vs target[key]</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 위험: getter가 있는 경우 this가 proxy가 아닌 target을 가리킴
get(target, key) { return target[key]; }

// 안전: receiver(proxy)를 전달해 getter의 this를 올바르게 유지
get(target, key, receiver) { return Reflect.get(target, key, receiver); }`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Reflect 주요 메서드</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`Reflect.get(target, key, receiver)
Reflect.set(target, key, value, receiver)
Reflect.has(target, key)              // 'key' in target
Reflect.deleteProperty(target, key)   // delete target[key]
Reflect.ownKeys(target)               // Object.getOwnPropertyNames + Symbols
Reflect.apply(fn, thisArg, args)      // fn.apply(thisArg, args)`}</p>
                    </div>
                </div>
            </div>

            {/* Proxy vs Object.defineProperty */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Proxy vs Object.defineProperty (Vue 2 vs Vue 3)</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "Object.defineProperty", "Proxy"],
                        ["배열 감지", "직접 인덱스 변경 불가", "완전 감지"],
                        ["새 프로퍼티 추가", "감지 불가 (Vue.$set 필요)", "자동 감지"],
                        ["삭제 감지", "불가", "가능"],
                        ["지원 환경", "IE9+", "ES6+ (IE 미지원)"],
                        ["성능", "프로퍼티별 정의 필요", "객체 단위로 래핑"],
                    ].map(([label, a, b], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
