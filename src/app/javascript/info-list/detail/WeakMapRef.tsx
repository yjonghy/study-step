export default function WeakMapRef() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">WeakMap & WeakRef — 메모리 관리</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <span className="font-mono text-gray080">WeakMap</span>과 <span className="font-mono text-gray080">WeakRef</span>는 가비지 컬렉터가 객체를 수거하는 것을 막지 않는 <strong>약한 참조(weak reference)</strong>를 제공한다.
                불필요한 메모리 누수를 방지할 때 유용하다.
            </p>

            {/* WeakMap */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">WeakMap</p>
                <p className="text-gray060 body-sm">키가 반드시 <strong>객체</strong>여야 하며, 해당 객체가 다른 곳에서 참조되지 않으면 GC가 엔트리를 자동 제거한다. 이터러블이 아니므로 열거 불가.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기본 사용</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const wm = new WeakMap();

let user = { name: "종현" };
wm.set(user, { visitCount: 5 });

console.log(wm.get(user)); // { visitCount: 5 }

user = null; // 참조 제거
// → user 객체가 GC 대상이 되고, WeakMap 엔트리도 사라짐`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">활용 — 프라이빗 데이터 저장</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const _private = new WeakMap();

class BankAccount {
  constructor(balance) {
    _private.set(this, { balance });
  }
  deposit(amount) {
    _private.get(this).balance += amount;
  }
  get balance() {
    return _private.get(this).balance;
  }
}

const acc = new BankAccount(1000);
acc.deposit(500);
console.log(acc.balance); // 1500
// _private.get(acc).balance 는 외부에서 접근 가능하지만
// 인스턴스가 사라지면 WeakMap 엔트리도 자동 정리`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">활용 — DOM 노드 메타데이터 (메모리 누수 방지)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const cache = new WeakMap();

function getMetadata(domNode) {
  if (!cache.has(domNode)) {
    cache.set(domNode, computeExpensiveMetadata(domNode));
  }
  return cache.get(domNode);
}
// domNode가 DOM에서 제거되면 cache 엔트리도 자동 해제
// Map을 쓰면 node가 제거돼도 엔트리가 남아 메모리 누수 발생`}</p>
                    </div>
                </div>
            </div>

            {/* Map vs WeakMap 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Map vs WeakMap</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "Map", "WeakMap"],
                        ["키 타입", "모든 값", "객체만"],
                        ["GC 영향", "강한 참조 — GC 방지", "약한 참조 — GC 허용"],
                        ["이터러블", "O (for…of, .keys())", "X"],
                        ["size 속성", "O", "X"],
                        ["주요 용도", "일반 캐시·자료구조", "DOM/인스턴스 메타데이터"],
                    ].map(([label, a, b], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* WeakSet */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">WeakSet — 객체 추적용</p>
                <p className="text-gray060 body-sm">객체만 저장 가능하며 GC를 막지 않는다. &ldquo;이 객체를 처리했는가?&rdquo; 같은 플래그 용도에 적합.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const processed = new WeakSet();

function process(obj) {
  if (processed.has(obj)) {
    console.log("이미 처리됨");
    return;
  }
  // ... 처리 로직
  processed.add(obj);
}

let task = { id: 1 };
process(task); // 처리
process(task); // "이미 처리됨"
task = null;   // processed의 엔트리도 자동 정리`}</p>
                </div>
            </div>

            {/* WeakRef */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">WeakRef (ES2021)</p>
                <p className="text-gray060 body-sm">객체를 약하게 참조한다. <span className="font-mono text-gray080">.deref()</span>로 객체를 얻되, GC가 수거했으면 <span className="font-mono text-gray080">undefined</span>를 반환한다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기본 사용</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`let obj = { data: "중요한 데이터" };
const ref = new WeakRef(obj);

console.log(ref.deref()?.data); // "중요한 데이터"

obj = null; // 강한 참조 제거
// GC 실행 이후 (시점 불확정)
console.log(ref.deref()); // undefined (수거되었을 수 있음)`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">FinalizationRegistry와 함께 사용</p>
                        <p className="body-xs text-gray050 mb-[6px]">객체가 GC될 때 콜백을 실행하는 API. WeakRef와 함께 캐시 무효화에 활용된다.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const registry = new FinalizationRegistry((key) => {
  console.log(\`\${key}가 수거됨 — 캐시 정리\`);
  cache.delete(key);
});

function cacheObject(key, obj) {
  cache.set(key, new WeakRef(obj));
  registry.register(obj, key); // obj가 수거되면 콜백 실행
}`}</p>
                    </div>
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의사항</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• GC 실행 시점은 엔진이 결정하므로 WeakRef.deref()가 언제 undefined를 반환할지 예측 불가</p>
                    <p className="body-xs text-blue030">• 프로그램 로직의 핵심 흐름에는 사용하지 말 것 — 캐시·메타데이터처럼 없어도 되는 부가 데이터에만 사용</p>
                    <p className="body-xs text-blue030">• WeakMap/WeakSet은 키가 살아있는 동안은 항상 접근 가능 — 즉시 사라지는 것이 아님</p>
                </div>
            </div>
        </article>
    )
}
