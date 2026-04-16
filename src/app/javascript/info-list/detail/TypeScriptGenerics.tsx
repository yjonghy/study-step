export default function TypeScriptGenerics() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">TypeScript 제네릭</p>
            <p className="text-gray060 body-sm mt-[16px]">
                제네릭은 타입을 매개변수처럼 사용하는 기능이다.<br />
                코드를 재사용하면서도 타입 안전성을 유지할 수 있다.
            </p>

            {/* 기본 개념 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 개념</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Before — 타입 중복</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`function getFirstNum(arr: number[]): number {
    return arr[0]
}
function getFirstStr(arr: string[]): string {
    return arr[0]
}
// 로직이 같은데 타입마다 함수를 만들어야 함`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">After — 제네릭</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`function getFirst<T>(arr: T[]): T {
    return arr[0]
}

// 타입 추론 — 명시 없어도 됨
getFirst([1, 2, 3])        // T = number
getFirst(['a', 'b'])       // T = string

// 명시적 타입 인수
getFirst<boolean>([true, false])`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 제네릭 함수 & 인터페이스 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">제네릭 인터페이스 & 클래스</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 제네릭 인터페이스
interface ApiResponse<T> {
    data: T
    status: number
    message: string
}

const userRes: ApiResponse<User> = { data: user, status: 200, message: 'ok' }
const listRes: ApiResponse<User[]> = { data: users, status: 200, message: 'ok' }

// 제네릭 클래스
class Stack<T> {
    private items: T[] = []
    push(item: T) { this.items.push(item) }
    pop(): T | undefined { return this.items.pop() }
}

const numStack = new Stack<number>()
numStack.push(1)
numStack.push(2)  // 문자열 push하면 타입 에러`}
                    </p>
                </div>
            </div>

            {/* 제약 조건 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">제약 조건 (Constraints) — extends</p>
                <p className="text-gray060 body-sm">제네릭 타입이 특정 구조를 가져야 할 때 제약을 건다.</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// T는 length 프로퍼티를 가져야 함
function logLength<T extends { length: number }>(val: T): T {
    console.log(val.length)
    return val
}
logLength('hello')     // 5
logLength([1, 2, 3])   // 3
logLength(42)          // 에러: number는 length가 없음

// keyof 제약 — 객체의 키만 허용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
const user = { id: 1, name: '종현' }
getProperty(user, 'name')    // 'name' 타입 안전
getProperty(user, 'email')   // 에러: 존재하지 않는 키`}
                    </p>
                </div>
            </div>

            {/* 조건부 타입 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">조건부 타입 (Conditional Types)</p>
                <p className="text-gray060 body-sm">
                    삼항 연산자처럼 타입을 조건에 따라 결정한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// T extends U ? X : Y
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false

// infer — 조건부 타입 내에서 타입 추론
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function fetchUser(): Promise<User> { ... }
type Result = ReturnType<typeof fetchUser>  // Promise<User>

// 배열 요소 타입 추출
type Unwrap<T> = T extends Array<infer U> ? U : T
type Elem = Unwrap<string[]>  // string`}
                    </p>
                </div>
            </div>

            {/* 실무 예시 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 패턴 — 제네릭 훅</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// API 응답 타입을 제네릭으로
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        fetch(url)
            .then(res => res.json() as Promise<T>)
            .then(data => { setData(data); setLoading(false) })
            .catch(err => setError(err))
    }, [url])

    return { data, loading, error }
}

// 사용 — T를 명시하면 data가 User | null 타입
const { data } = useFetch<User>('/api/user/1')
data?.name  // 자동완성 가능`}
                    </p>
                </div>
            </div>

        </article>
    )
}
