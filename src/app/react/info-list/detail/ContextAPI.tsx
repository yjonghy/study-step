export default function ContextAPI() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">Context API</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Context는 컴포넌트 트리 전체에 데이터를 직접 전달하는 방법이다.<br />
                props를 통해 여러 단계를 거쳐 전달해야 하는 &quot;props drilling&quot; 문제를 해결한다.
            </p>

            {/* props drilling */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">props drilling 문제</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Before Context</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`<App user={user}>
  <Layout user={user}>       // 필요 없어도 전달
    <Sidebar user={user}>    // 필요 없어도 전달
      <Profile user={user}/> // 여기서만 필요
    </Sidebar>
  </Layout>
</App>`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">With Context</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`<UserContext.Provider value={user}>
  <Layout>
    <Sidebar>
      <Profile/>  // useContext(UserContext)로 바로 접근
    </Sidebar>
  </Layout>
</UserContext.Provider>`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 사용 방법 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">사용 방법</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">1. Context 생성</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// context/UserContext.ts
import { createContext, useContext } from 'react'

interface UserContextType {
    user: User | null
    setUser: (user: User) => void
}

export const UserContext = createContext<UserContextType | null>(null)

// 타입 안전한 커스텀 훅
export const useUser = () => {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error('useUser must be used within UserProvider')
    return ctx
}`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">2. Provider로 감싸기</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`function App() {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router />
        </UserContext.Provider>
    )
}`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">3. 소비</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`function Profile() {
    const { user } = useUser()  // 커스텀 훅 사용
    return <p>{user?.name}</p>
}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의 — Context의 성능 문제</p>
                <p className="text-gray060 body-sm">
                    Provider의 value가 변경되면 해당 Context를 구독하는 모든 컴포넌트가 리렌더링된다.
                </p>
                <div className="mt-[6px] bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">흔한 실수</p>
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 매 렌더링마다 새 객체 → 모든 소비자 리렌더링
<UserContext.Provider value={{ user, setUser }}>

// 해결: useMemo로 value 안정화
const value = useMemo(() => ({ user, setUser }), [user])
<UserContext.Provider value={value}>`}
                    </p>
                </div>
            </div>

            {/* Context vs 상태관리 라이브러리 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Context vs 외부 상태관리 라이브러리</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        {
                            label: "Context 적합",
                            desc: "테마, 로케일, 인증 정보 등 변경이 드문 전역 데이터",
                            color: "bg-blue005 border-blue020 text-blue040",
                        },
                        {
                            label: "Zustand / Recoil 적합",
                            desc: "자주 바뀌는 상태, 세밀한 구독 제어가 필요할 때",
                            color: "bg-green005 border-green020 text-green060",
                        },
                        {
                            label: "TanStack Query 적합",
                            desc: "서버 데이터 캐싱, 동기화, 로딩/에러 상태 관리",
                            color: "bg-yellow005 border-yellow020 text-yellow060",
                        },
                    ].map(({ label, desc, color }) => (
                        <div key={label} className={`flex items-start gap-[10px] border rounded-[8px] px-[12px] py-[8px] ${color}`}>
                            <span className="body-xs font-bold min-w-[140px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
