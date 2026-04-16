export default function Prototype() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">프로토타입 (Prototype)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                JavaScript는 클래스 기반이 아닌 <strong>프로토타입 기반</strong> 언어다.<br />
                모든 객체는 자신의 부모 역할을 하는 프로토타입 객체를 참조하며, 이 연결이 이어진 것을 프로토타입 체인이라 한다.
            </p>

            {/* 프로토타입 체인 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">프로토타입 체인 (Prototype Chain)</p>
                <p className="text-gray060 body-sm">프로퍼티·메서드를 찾을 때 JS 엔진은 현재 객체 → 프로토타입 → 상위 프로토타입 순으로 탐색한다. <code>null</code>을 만나면 탐색 종료.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const arr = [1, 2, 3];

// arr → Array.prototype → Object.prototype → null
arr.hasOwnProperty('length'); // Object.prototype의 메서드를 체인으로 참조

// __proto__ (접근자, 비권장) vs Object.getPrototypeOf (권장)
Object.getPrototypeOf(arr) === Array.prototype; // true`}</p>
                </div>
            </div>

            {/* prototype vs __proto__ */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">prototype vs [[Prototype]] (__proto__)</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">함수의 .prototype</p>
                        <p className="body-xs text-gray060">생성자 함수(또는 클래스)에만 존재. new로 만든 인스턴스의 [[Prototype]]이 이 객체를 가리킨다.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line mt-[6px]">{`function Person(name) { this.name = name; }
Person.prototype.greet = function() { return \`Hi, \${this.name}\`; };

const p = new Person('종현');
p.greet();                              // 'Hi, 종현'
Object.getPrototypeOf(p) === Person.prototype; // true`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">ES6 class — 문법적 설탕</p>
                        <p className="body-xs text-gray060">class 키워드는 내부적으로 프로토타입 체인을 그대로 사용한다.</p>
                        <p className="body-xs text-gray060 whitespace-pre-line mt-[6px]">{`class Animal {
  speak() { return 'sound'; }
}
class Dog extends Animal {
  speak() { return 'woof'; }
}
const d = new Dog();
// d → Dog.prototype → Animal.prototype → Object.prototype → null`}</p>
                    </div>
                </div>
            </div>

            {/* hasOwnProperty */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">자체 프로퍼티 확인 — hasOwnProperty</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const obj = { a: 1 };
'a' in obj;                      // true  (체인 전체 탐색)
obj.hasOwnProperty('a');         // true  (자체 프로퍼티만)
obj.hasOwnProperty('toString');  // false (Object.prototype에 있음)

// 권장 방식 (obj.hasOwnProperty 오버라이드 방어)
Object.prototype.hasOwnProperty.call(obj, 'a'); // true`}</p>
                </div>
            </div>

            {/* 실무 포인트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        "for...in 루프는 프로토타입 체인 프로퍼티까지 순회한다 → hasOwnProperty 체크 필요",
                        "Object.create(null) 로 생성한 순수 딕셔너리 객체는 프로토타입이 없다 (가장 안전한 키-값 저장소)",
                        "프로토타입 메서드를 직접 수정하면 모든 인스턴스에 영향 — 절대 네이티브 프로토타입 수정 금지",
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
