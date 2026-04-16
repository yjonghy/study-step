export default function TypeScriptUtility() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">TypeScript 유틸리티 타입</p>
            <p className="text-gray060 body-sm mt-[16px]">
                TypeScript 내장 유틸리티 타입들. 기존 타입을 변환하거나 조합해 새로운 타입을 만든다.
            </p>

            {/* 자주 쓰는 유틸리티 */}
            <div className="mt-[28px] flex flex-col gap-[8px]">

                {[
                    {
                        name: "Partial<T>",
                        desc: "모든 프로퍼티를 선택적(optional)으로",
                        code: `interface User { id: number; name: string; email: string }

// 수정 폼 — 일부만 바뀔 수 있음
function updateUser(id: number, changes: Partial<User>) { ... }
updateUser(1, { name: '종현' })  // email 없어도 됨`,
                    },
                    {
                        name: "Required<T>",
                        desc: "모든 선택적 프로퍼티를 필수로",
                        code: `interface Config {
    host?: string
    port?: number
}
// DB 연결 시 모두 필수여야 할 때
function connect(config: Required<Config>) { ... }`,
                    },
                    {
                        name: "Readonly<T>",
                        desc: "모든 프로퍼티를 읽기 전용으로",
                        code: `const user: Readonly<User> = { id: 1, name: '종현', email: '' }
user.name = '다른이름'  // 에러: readonly

// 불변 데이터 보장, Redux 상태 등에 활용`,
                    },
                    {
                        name: "Pick<T, K>",
                        desc: "T에서 K 키들만 선택",
                        code: `type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }

// 목록 API — 필요한 필드만 노출
type UserListItem = Pick<User, 'id' | 'name' | 'email'>`,
                    },
                    {
                        name: "Omit<T, K>",
                        desc: "T에서 K 키들을 제외",
                        code: `type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string }

// 생성 폼 — id는 서버에서 생성하므로 제외
type CreateUserDto = Omit<User, 'id' | 'createdAt'>`,
                    },
                    {
                        name: "Record<K, V>",
                        desc: "K를 키, V를 값으로 하는 객체 타입",
                        code: `type Role = 'admin' | 'user' | 'guest'
type Permissions = Record<Role, string[]>

const perms: Permissions = {
    admin: ['read', 'write', 'delete'],
    user:  ['read', 'write'],
    guest: ['read'],
}`,
                    },
                    {
                        name: "Exclude<T, U> & Extract<T, U>",
                        desc: "유니온에서 타입 빼기 / 꺼내기",
                        code: `type Status = 'pending' | 'active' | 'inactive' | 'deleted'

// 'deleted'를 제외
type LiveStatus = Exclude<Status, 'deleted'>
// 'pending' | 'active' | 'inactive'

// string인 것만 추출
type OnlyString = Extract<string | number | boolean, string>
// string`,
                    },
                    {
                        name: "NonNullable<T>",
                        desc: "null, undefined 제거",
                        code: `type MaybeString = string | null | undefined
type SafeString = NonNullable<MaybeString>  // string

// API 응답에서 null 제거 후 처리
function process(val: NonNullable<typeof input>) { ... }`,
                    },
                    {
                        name: "ReturnType<T> & Parameters<T>",
                        desc: "함수의 반환 타입 / 매개변수 타입 추출",
                        code: `function fetchUser(id: number): Promise<User> { ... }

type FetchResult = ReturnType<typeof fetchUser>   // Promise<User>
type FetchParams = Parameters<typeof fetchUser>   // [number]

// 라이브러리 함수 타입을 직접 추출할 때 유용
type RouterPush = Parameters<typeof router.push>`,
                    },
                ].map(({ name, desc, code }) => (
                    <div key={name} className="flex flex-col gap-[4px]">
                        <div className="flex items-center gap-[8px]">
                            <code className="body-sm text-hourblue font-bold">{name}</code>
                            <span className="body-xs text-gray050">{desc}</span>
                        </div>
                        <div className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray060 whitespace-pre-line">{code}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 조합 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">조합 패턴 — 실무에서 자주 쓰는 예</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// Create / Update DTO
type CreatePostDto = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
type UpdatePostDto = Partial<Omit<Post, 'id'>>

// API 공통 응답 래퍼
type ApiResponse<T> = {
    data: NonNullable<T>
    meta: { total: number; page: number }
}

// 폼 상태 — 모든 필드가 string | undefined
type FormState<T> = {
    [K in keyof T]: string | undefined
}
type LoginForm = FormState<{ email: string; password: string }>`}
                    </p>
                </div>
            </div>

        </article>
    )
}
