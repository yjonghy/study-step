export default function VirtualDOM() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">가상 DOM / Reconciliation</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Virtual DOM은 실제 DOM을 직접 조작하는 비용을 줄이기 위해 React가 메모리에 유지하는 경량 JS 객체 트리다.<br />
                상태가 변경되면 React는 새 Virtual DOM을 만들고, 이전과 비교(diffing)해 최소한의 변경만 실제 DOM에 반영한다.
            </p>

            {/* 흐름 다이어그램 */}
            <div className="mt-[24px] flex flex-wrap items-center gap-[8px]">
                {[
                    "state / props 변경",
                    "새 Virtual DOM 생성",
                    "이전 Virtual DOM과 비교 (Diffing)",
                    "변경된 부분만 실제 DOM 업데이트",
                ].map((step, i, arr) => (
                    <div key={i} className="flex items-center gap-[8px]">
                        <div className="bg-blue005 border border-blue020 rounded-[8px] px-[12px] py-[8px]">
                            <p className="body-xs text-blue040 text-center">{step}</p>
                        </div>
                        {i < arr.length - 1 && (
                            <div className="w-[10px] h-[1px] bg-gray040" />
                        )}
                    </div>
                ))}
            </div>

            {/* Diffing 알고리즘 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Diffing 알고리즘 — 두 가지 가정</p>
                <p className="text-gray060 body-sm">
                    React는 O(n) 시간 복잡도의 휴리스틱 알고리즘을 사용한다. 두 가지 전제를 기반으로 한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold">1. 다른 타입의 요소 → 다른 트리</p>
                        <p className="body-xs text-gray060 mt-[4px] whitespace-pre-line">
                            {`<div> → <span> 으로 바뀌면 자식 전체를 파괴하고 새로 만든다.
부모 컴포넌트 타입이 달라지면 그 아래 상태도 모두 초기화된다.`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold">2. key prop으로 안정적인 식별</p>
                        <p className="body-xs text-gray060 mt-[4px] whitespace-pre-line">
                            {`리스트 렌더링 시 key가 없으면 React는 순서로만 비교한다.
맨 앞에 요소가 추가될 경우 전체 리스트를 다시 그린다.
key를 지정하면 React가 이동/추가/삭제를 정확히 파악한다.

// 좋지 않음 — index를 key로 쓰면 순서 변경 시 상태 오염
{items.map((item, index) => <Item key={index} ... />)}

// 권장 — 안정적인 고유 식별자 사용
{items.map((item) => <Item key={item.id} ... />)}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Reconciliation */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Reconciliation (재조정)</p>
                <p className="text-gray060 body-sm">
                    diffing 결과를 바탕으로 실제 DOM을 업데이트하는 과정 전체를 Reconciliation이라 한다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`1. 같은 타입 요소: 속성(attribute)만 업데이트
2. 다른 타입 요소: 기존 DOM 노드 제거 → 새 노드 생성
3. 컴포넌트: shouldComponentUpdate / React.memo로 스킵 가능`}
                    </p>
                </div>
            </div>

            {/* React Fiber */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React Fiber (React 16+)</p>
                <p className="text-gray060 body-sm">
                    기존 재조정 엔진은 동기적으로 전체 트리를 한 번에 처리했다.<br />
                    Fiber는 작업을 잘게 쪼개어 우선순위가 높은 작업(사용자 입력 등)을 먼저 처리할 수 있게 한다.
                </p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Before Fiber (Stack Reconciler)</p>
                        <p className="body-xs text-gray060">동기적 처리 → 한 번 시작하면 중단 불가 → 큰 트리에서 버벅임</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">After Fiber</p>
                        <p className="body-xs text-gray060">작업을 fiber 단위로 분할 → 중단/재개 가능 → Concurrent Mode 기반</p>
                    </div>
                </div>
            </div>

        </article>
    )
}
