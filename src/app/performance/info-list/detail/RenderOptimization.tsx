export default function RenderOptimization() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">렌더링 최적화</p>
            <p className="text-gray060 body-sm mt-[16px]">
                불필요한 리렌더링을 줄이고, 초기 로드 시 필요한 JS만 파싱·실행되도록 하는 전략.
            </p>

            {/* 코드 스플리팅 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">코드 스플리팅 — React.lazy & Suspense</p>
                <p className="text-gray060 body-sm">
                    초기 번들에서 당장 필요 없는 컴포넌트를 분리해 필요할 때만 로드한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import { lazy, Suspense } from 'react'

// 동적 import → 별도 청크로 분리됨
const HeavyChart = lazy(() => import('./HeavyChart'))
const Modal = lazy(() => import('./Modal'))

function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            {/* 로딩 중 fallback 표시 */}
            <Suspense fallback={<Skeleton />}>
                <HeavyChart />
            </Suspense>

            {/* 조건부 렌더링 — 열 때까지 청크 미로드 */}
            {showModal && (
                <Suspense fallback={<Spinner />}>
                    <Modal />
                </Suspense>
            )}
        </>
    )
}`}
                    </p>
                </div>
            </div>

            {/* Next.js에서의 코드 스플리팅 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Next.js — dynamic import</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import dynamic from 'next/dynamic'

// SSR 비활성화 — 브라우저 전용 라이브러리 (window 사용 등)
const MapComponent = dynamic(() => import('./Map'), { ssr: false })

// 로딩 UI 지정
const HeavyEditor = dynamic(() => import('./Editor'), {
    loading: () => <p>에디터 로딩 중...</p>,
    ssr: false,
})

// 모달처럼 조건부로만 필요한 컴포넌트
const AdminPanel = dynamic(() => import('./AdminPanel'))
// isAdmin이 true일 때만 청크 로드`}
                    </p>
                </div>
            </div>

            {/* 리렌더링 방지 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">불필요한 리렌더링 방지</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">컴포넌트 구조 개선 — 상태를 아래로 내리기</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// Bad: 부모에 state → 자식 전체 리렌더링
function Parent() {
    const [count, setCount] = useState(0)
    return (
        <>
            <Counter count={count} onChange={setCount} />
            <HeavyList />  {/* count 변경마다 리렌더링 */}
        </>
    )
}

// Good: 상태를 Counter 내부로 내리기
function Parent() {
    return (
        <>
            <Counter />    {/* 자체적으로 state 관리 */}
            <HeavyList />  {/* 리렌더링 없음 */}
        </>
    )
}`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">children으로 내려보내기</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 자주 바뀌는 래퍼가 자식을 children으로 받으면
// 래퍼가 리렌더링돼도 children은 리렌더링 안 함
function Wrapper({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    return <div onClick={() => setOpen(o => !o)}>{children}</div>
}

// HeavyList는 open 변경에 영향 없음
<Wrapper><HeavyList /></Wrapper>`}
                        </p>
                    </div>
                </div>
            </div>

            {/* startTransition */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">startTransition — 비긴급 업데이트 지연 (React 18)</p>
                <p className="text-gray060 body-sm">
                    사용자 입력(긴급)과 무거운 렌더링(비긴급)을 분리해 INP를 개선한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import { startTransition, useTransition } from 'react'

const [isPending, startTransition] = useTransition()

function handleSearch(query: string) {
    // 긴급: 입력값 즉시 반영
    setInputValue(query)

    // 비긴급: 검색 결과 렌더링은 나중에
    startTransition(() => {
        setSearchResults(search(query))
    })
}

// 대규모 리스트 필터링, 탭 전환 등에 활용
{isPending && <Spinner />}`}
                    </p>
                </div>
            </div>

            {/* 가상화 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">리스트 가상화 (Virtualization)</p>
                <p className="text-gray060 body-sm">
                    수천 개의 아이템을 렌더링할 때 뷰포트에 보이는 것만 실제 DOM에 마운트한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// @tanstack/react-virtual
import { useVirtualizer } from '@tanstack/react-virtual'

const rowVirtualizer = useVirtualizer({
    count: items.length,       // 전체 아이템 수
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,    // 아이템 높이 추정값
})

return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
        {/* 전체 스크롤 영역 높이만 확보 */}
        <div style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => (
                <div key={virtualRow.key} style={{ transform: \`translateY(\${virtualRow.start}px)\` }}>
                    {items[virtualRow.index].name}
                </div>
            ))}
        </div>
    </div>
)`}
                    </p>
                </div>
            </div>

        </article>
    )
}
