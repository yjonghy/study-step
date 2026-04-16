export default function Zustand() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">Zustand</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Flux 패턴 기반의 경량 전역 상태 관리 라이브러리. 보일러플레이트가 거의 없고, Context 없이 어디서든 상태에 접근할 수 있다.<br />
                번들 크기 약 1KB, Redux보다 훨씬 단순하다.
            </p>

            {/* 기본 스토어 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">스토어 생성 & 사용</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// store/useCounterStore.ts
import { create } from 'zustand'

interface CounterState {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}))

// 컴포넌트에서 사용 — Provider 불필요
function Counter() {
    const { count, increment } = useCounterStore()
    return <button onClick={increment}>{count}</button>
}`}
                    </p>
                </div>
            </div>

            {/* 선택적 구독 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">선택적 구독 (Selector) — 최적화 핵심</p>
                <p className="text-gray060 body-sm">
                    필요한 상태만 구독하면 관련 없는 상태 변경 시 리렌더링을 방지할 수 있다.
                </p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">전체 구독 (비추천)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 스토어 전체를 구독
// count가 아닌 다른 값이 바뀌어도 리렌더링
const store = useCounterStore()`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">선택적 구독 (권장)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// count만 구독 → count 변경 시만 리렌더링
const count = useCounterStore(s => s.count)
const increment = useCounterStore(s => s.increment)`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 실무 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 패턴 — 유저 스토어</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`interface UserStore {
    user: User | null
    isLoggedIn: boolean
    setUser: (user: User) => void
    logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
}))

// 로그인 후
const { setUser } = useUserStore()
setUser(loginResponse.user)

// 헤더에서 — user만 구독
const user = useUserStore(s => s.user)`}
                    </p>
                </div>
            </div>

            {/* 미들웨어 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">미들웨어 — persist (로컬스토리지 동기화)</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'light',
            language: 'ko',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'settings-storage',  // localStorage key
            // partialize로 일부만 저장
            partialize: (state) => ({ theme: state.theme }),
        }
    )
)
// 새로고침해도 theme 유지됨`}
                    </p>
                </div>
            </div>

            {/* devtools */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">devtools 미들웨어</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import { devtools } from 'zustand/middleware'

export const useStore = create<State>()(
    devtools(
        (set) => ({
            count: 0,
            increment: () => set(
                s => ({ count: s.count + 1 }),
                false,
                'counter/increment'  // Redux DevTools에 표시될 액션명
            ),
        }),
        { name: 'CounterStore' }
    )
)`}
                    </p>
                </div>
            </div>

        </article>
    )
}
