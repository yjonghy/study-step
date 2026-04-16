export default function ReactHooks() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">React Hooks 기초</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Hook은 함수형 컴포넌트에서 state와 생명주기 기능을 사용할 수 있게 해주는 함수다.<br />
                React 16.8 에서 도입되었으며, 클래스 없이도 React의 기능을 활용할 수 있다.
            </p>

            {/* 훅 규칙 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">훅의 규칙</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">① 최상위에서만 호출</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`반복문, 조건문, 중첩 함수 안에서 호출 금지.
React는 훅의 호출 순서로 상태를 추적하기 때문.`}
                        </p>
                    </div>
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">② React 함수에서만 호출</p>
                        <p className="body-xs text-gray060">
                            함수형 컴포넌트 또는 커스텀 훅 내부에서만 호출 가능. 일반 JS 함수에서 호출 금지.
                        </p>
                    </div>
                </div>
            </div>

            {/* useState */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useState</p>
                <p className="text-gray060 body-sm">컴포넌트의 로컬 상태를 관리한다.</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const [count, setCount] = useState(0)

// 직접 값 전달
setCount(count + 1)

// 함수형 업데이트 — 이전 상태를 기반으로 할 때 권장
setCount(prev => prev + 1)

// 주의: setState는 비동기적으로 동작
// 연속 호출 시 마지막 값만 반영될 수 있음 → 함수형 업데이트로 해결
setCount(prev => prev + 1)
setCount(prev => prev + 1)  // count가 2 증가함`}
                    </p>
                </div>
            </div>

            {/* useEffect */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useEffect</p>
                <p className="text-gray060 body-sm">
                    컴포넌트가 렌더링된 이후 사이드 이펙트(데이터 fetch, 이벤트 등록, 타이머 등)를 실행한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// deps 배열 없음 → 매 렌더링마다 실행
useEffect(() => { ... })

// 빈 배열 → 마운트 시 1번만 실행
useEffect(() => { ... }, [])

// deps 명시 → 해당 값이 바뀔 때마다 실행
useEffect(() => { ... }, [userId])

// cleanup 함수 → 언마운트 or 다음 effect 실행 전 정리
useEffect(() => {
    const id = setInterval(() => { ... }, 1000)
    return () => clearInterval(id)  // cleanup
}, [])`}
                    </p>
                </div>
                <div className="mt-[6px] bg-red005 border border-red020 rounded-[8px] p-[10px]">
                    <p className="body-xs text-red050 font-bold mb-[2px]">무한 루프 주의</p>
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 객체/함수를 deps에 넣으면 매 렌더링마다 새 참조 → 무한 루프
useEffect(() => { fetchData(options) }, [options])
// options가 매 렌더링마다 새로 생성된다면 → useMemo/useCallback으로 안정화`}
                    </p>
                </div>
            </div>

            {/* useRef */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useRef</p>
                <p className="text-gray060 body-sm">두 가지 용도로 사용한다.</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">① DOM 접근</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />

// 마운트 이후 DOM에 직접 접근
inputRef.current?.focus()`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">② 렌더링 없이 값 유지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`const countRef = useRef(0)

// ref.current를 바꿔도 리렌더링 발생하지 않음
countRef.current += 1

// 이전 값 추적, 타이머 ID 저장 등에 활용`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Hook */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Custom Hook</p>
                <p className="text-gray060 body-sm">
                    반복되는 로직을 훅으로 추출해 재사용할 수 있다. 이름이 반드시 <code>use</code>로 시작해야 한다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false) })
    }, [url])

    return { data, loading }
}

// 사용
const { data, loading } = useFetch<User[]>('/api/users')`}
                    </p>
                </div>
            </div>

        </article>
    )
}
