export default function ServerClientComponent() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">서버 컴포넌트 vs 클라이언트 컴포넌트</p>
            <p className="text-gray060 body-sm mt-[16px]">
                App Router의 핵심 개념. 기본값이 서버 컴포넌트이며, <code>&apos;use client&apos;</code>를 선언해야 클라이언트 컴포넌트가 된다.
            </p>

            {/* 비교표 */}
            <div className="mt-[28px] flex flex-col gap-[4px]">
                <div className="flex bg-gray020 rounded-t-[8px]">
                    <span className="body-xs text-gray060 font-bold px-[12px] py-[8px] flex-1"></span>
                    <span className="body-xs text-gray080 font-bold px-[12px] py-[8px] flex-1">서버 컴포넌트</span>
                    <span className="body-xs text-blue040 font-bold px-[12px] py-[8px] flex-1">클라이언트 컴포넌트</span>
                </div>
                {[
                    { label: "선언",         server: "기본값 (생략)",               client: "'use client'" },
                    { label: "실행 위치",     server: "서버에서만",                  client: "서버(초기 HTML) + 브라우저" },
                    { label: "번들 포함",     server: "JS 번들에 포함 안 됨",        client: "JS 번들에 포함" },
                    { label: "DB/파일 접근", server: "가능",                        client: "불가 (API 통해야 함)" },
                    { label: "useState/Effect", server: "사용 불가",               client: "사용 가능" },
                    { label: "이벤트 핸들러", server: "사용 불가",                  client: "사용 가능" },
                    { label: "브라우저 API",  server: "사용 불가",                  client: "사용 가능" },
                ].map(({ label, server, client }) => (
                    <div key={label} className="flex bg-gray010">
                        <span className="body-xs text-gray050 font-bold px-[12px] py-[7px] flex-1 bg-gray015">{label}</span>
                        <span className="body-xs text-gray060 px-[12px] py-[7px] flex-1">{server}</span>
                        <span className="body-xs text-blue030 px-[12px] py-[7px] flex-1">{client}</span>
                    </div>
                ))}
            </div>

            {/* 서버 컴포넌트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">서버 컴포넌트 — 언제 써야 하나</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// DB 직접 접근, 비밀키 사용 → 서버에서만 실행되므로 안전
async function ProductList() {
    const products = await db.product.findMany()  // DB 직접 쿼리
    return (
        <ul>
            {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
    )
}

// 서버 컴포넌트는 async/await을 컴포넌트 레벨에서 바로 쓸 수 있다
// → useEffect + fetch 패턴이 필요 없음`}
                    </p>
                </div>
            </div>

            {/* 클라이언트 컴포넌트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">클라이언트 컴포넌트 — 언제 써야 하나</p>
                <div className="mt-[6px] bg-blue005 border border-blue020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`'use client'

// useState, useEffect, 이벤트 핸들러가 필요한 경우
function Counter() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// window, document 등 브라우저 API 사용 시
// onClick, onChange 등 이벤트 핸들러 사용 시`}
                    </p>
                </div>
            </div>

            {/* 조합 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">조합 패턴 — 서버 컴포넌트 안에 클라이언트 컴포넌트</p>
                <p className="text-gray060 body-sm">
                    클라이언트 컴포넌트 안에서 서버 컴포넌트를 import하면 안 된다.<br />
                    대신 서버 컴포넌트를 <code>children</code>으로 props 내려주는 방식을 사용한다.
                </p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">X 잘못된 방법</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`'use client'
// 클라이언트 컴포넌트에서 서버 컴포넌트 import
import ServerComp from './ServerComp'
// → ServerComp도 클라이언트 번들에 포함됨`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">O 올바른 방법</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 서버 컴포넌트 (layout.tsx 등)
<ClientWrapper>
    <ServerComp />  {/* children으로 전달 */}
</ClientWrapper>

// ClientWrapper.tsx
'use client'
export function ClientWrapper({ children }) {
    return <div>{children}</div>
}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 결정 기준 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">결정 기준 — 기본적으로 서버 컴포넌트, 필요할 때만 클라이언트</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`클라이언트 컴포넌트가 필요한 경우
  ├── useState, useReducer, useEffect 사용
  ├── onClick, onChange 등 이벤트 핸들러
  ├── window, localStorage 등 브라우저 API
  └── 서드파티 라이브러리가 use client를 요구할 때

가능한 한 트리 하단의 leaf 컴포넌트에만 'use client' 선언
→ 서버 컴포넌트 영역을 최대한 유지 → JS 번들 크기 최소화`}
                    </p>
                </div>
            </div>

        </article>
    )
}
