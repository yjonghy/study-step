export default function TypeScriptBasic() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">TypeScript 기초 & 타입 시스템</p>
            <p className="text-gray060 body-sm mt-[16px]">
                TypeScript는 JavaScript의 슈퍼셋으로, 정적 타입을 추가한다.<br />
                컴파일 타임에 오류를 잡아내고 IDE 자동완성, 리팩토링을 돕는다.
            </p>

            {/* 기본 타입 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 타입</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 원시 타입
let name: string = '종현'
let age: number = 27
let isActive: boolean = true

// 배열
let nums: number[] = [1, 2, 3]
let strs: Array<string> = ['a', 'b']

// 튜플 — 길이와 타입이 고정된 배열
let point: [number, number] = [10, 20]
let pair: [string, number] = ['age', 27]

// any — 타입 검사 비활성화 (남용 금지)
let data: any = fetchData()

// unknown — any보다 안전. 사용 전 타입 좁히기 필요
let input: unknown = getInput()
if (typeof input === 'string') input.toUpperCase()

// never — 절대 반환하지 않는 함수
function throwError(msg: string): never {
    throw new Error(msg)
}`}
                    </p>
                </div>
            </div>

            {/* interface vs type */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">interface vs type</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">interface</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`interface User {
    id: number
    name: string
    email?: string  // 선택적 프로퍼티
}

// 선언 병합 (Declaration Merging)
interface User {
    phone: string  // 자동으로 합쳐짐
}

// 상속
interface Admin extends User {
    role: 'admin'
}`}
                        </p>
                    </div>
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">type alias</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`type User = {
    id: number
    name: string
}

// 유니온, 인터섹션
type ID = string | number
type Admin = User & { role: 'admin' }

// 튜플, 함수 타입
type Point = [number, number]
type Callback = (err: Error | null) => void

// 선언 병합 불가
// type User = { ... }  // 에러!`}
                        </p>
                    </div>
                </div>
                <p className="text-gray060 body-xs mt-[4px]">
                    → 객체 타입은 <strong>interface</strong> 권장 (확장성). 유니온·튜플·함수 타입은 <strong>type</strong>.
                </p>
            </div>

            {/* 타입 좁히기 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">타입 좁히기 (Type Narrowing)</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// typeof
function process(value: string | number) {
    if (typeof value === 'string') {
        return value.toUpperCase()  // string으로 좁혀짐
    }
    return value.toFixed(2)         // number로 좁혀짐
}

// instanceof
if (err instanceof Error) console.log(err.message)

// in 연산자
type Cat = { meow: () => void }
type Dog = { bark: () => void }
function speak(animal: Cat | Dog) {
    if ('meow' in animal) animal.meow()
    else animal.bark()
}

// 사용자 정의 타입 가드
function isString(val: unknown): val is string {
    return typeof val === 'string'
}`}
                    </p>
                </div>
            </div>

            {/* 유니온 & 인터섹션 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">유니온(|) & 인터섹션(&)</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">유니온 | — "또는"</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`type Result = 'success' | 'error'
type ID = string | number

// Discriminated Union
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rect'; width: number; height: number }

function area(s: Shape) {
    if (s.kind === 'circle') return Math.PI * s.radius ** 2
    return s.width * s.height
}`}
                        </p>
                    </div>
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">인터섹션 & — "그리고"</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`type Serializable = { toJSON: () => string }
type Loggable = { log: () => void }

// 두 타입을 모두 만족해야 함
type DataModel = Serializable & Loggable

// 믹스인 패턴에서 유용
type AdminUser = User & {
    role: 'admin'
    permissions: string[]
}`}
                        </p>
                    </div>
                </div>
            </div>

        </article>
    )
}
