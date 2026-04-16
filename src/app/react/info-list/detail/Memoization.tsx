export default function Memoization() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">useMemo / useCallback / React.memo</p>
            <p className="text-gray060 body-sm mt-[16px]">
                JavaScript에서 함수와 객체는 매 렌더링마다 새로운 참조(reference)를 가진다.<br />
                React의 얕은 비교(shallow comparison)는 값이 같아도 참조가 다르면 "변경됨"으로 판단한다.<br />
                메모이제이션은 이 참조를 안정시켜 불필요한 리렌더링을 방지한다.
            </p>

            {/* 왜 필요한가 */}
            <div className="mt-[28px] bg-gray010 rounded-[8px] p-[12px]">
                <p className="body-xs text-gray060 whitespace-pre-line">
                    {`// 매 렌더링마다 새로운 함수 참조 생성
const handleClick = () => console.log('click')  // 새 참조

// 자식 컴포넌트가 이 함수를 props로 받으면
// 부모가 리렌더링될 때마다 자식도 리렌더링됨
<Child onClick={handleClick} />`}
                </p>
            </div>

            {/* useMemo */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useMemo — 값 메모이제이션</p>
                <p className="text-gray060 body-sm">
                    deps가 바뀌지 않으면 이전 계산 결과를 재사용한다. 비용이 큰 연산에 사용.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const sortedList = useMemo(() => {
    return items.sort((a, b) => a.price - b.price)
}, [items])
// items가 바뀌지 않으면 정렬 연산을 다시 하지 않음

// 참조 안정화 용도로도 사용
const options = useMemo(() => ({ page: 1, limit: 20 }), [])
// 빈 deps → 항상 같은 객체 참조 → useEffect deps로 안전하게 사용 가능`}
                    </p>
                </div>
            </div>

            {/* useCallback */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useCallback — 함수 참조 메모이제이션</p>
                <p className="text-gray060 body-sm">
                    useMemo(() =&gt; fn, deps)의 축약. deps가 바뀌지 않으면 같은 함수 참조를 반환한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const handleClick = useCallback(() => {
    console.log(userId)
}, [userId])
// userId가 바뀌지 않으면 handleClick 참조 유지
// → React.memo로 감싼 자식 컴포넌트에 전달해도 리렌더링 안 함`}
                    </p>
                </div>
            </div>

            {/* React.memo */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React.memo — 컴포넌트 메모이제이션</p>
                <p className="text-gray060 body-sm">
                    props가 얕은 비교에서 동일하면 리렌더링을 건너뛴다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const Child = React.memo(({ name, onClick }: Props) => {
    return <button onClick={onClick}>{name}</button>
})

// 주의: onClick이 매 렌더링마다 새 함수라면 React.memo가 무의미함
// → useCallback으로 함수 참조도 함께 안정화해야 함`}
                    </p>
                </div>
            </div>

            {/* 잘못된 사용 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의 — 과도한 메모이제이션</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">하지 말아야 할 것</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 가벼운 연산에 useMemo는 오히려 손해
// 메모이제이션 자체도 비용이다
const doubled = useMemo(() => count * 2, [count])

// deps가 항상 바뀌면 메모이제이션 의미 없음
const fn = useCallback(() => {}, [Date.now()])`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">써야 할 때</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 비용이 큰 연산 (정렬, 필터, 변환)
// 자식 컴포넌트에 콜백 전달 (React.memo와 세트)
// useEffect deps의 참조 안정화
// Context value 객체 안정화`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 세 가지 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">세 가지 비교 정리</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { name: "useMemo",       target: "값 (number, string, object 등)", when: "비용 큰 계산, 참조 안정화" },
                        { name: "useCallback",   target: "함수",                            when: "자식에 콜백 전달, useEffect deps" },
                        { name: "React.memo",    target: "컴포넌트",                        when: "props가 자주 안 바뀌는 컴포넌트" },
                    ].map(({ name, target, when }) => (
                        <div key={name} className="flex items-center gap-[8px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[120px]">{name}</span>
                            <span className="body-xs text-gray060 flex-1">{target}</span>
                            <span className="body-xs text-gray040">{when}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
