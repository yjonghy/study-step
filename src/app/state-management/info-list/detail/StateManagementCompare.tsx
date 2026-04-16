export default function StateManagementCompare() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">상태관리 라이브러리 비교</p>
            <p className="text-gray060 body-sm mt-[16px]">
                React 생태계의 주요 상태관리 라이브러리들. 관리하는 상태의 성격에 따라 선택이 달라진다.
            </p>

            {/* 상태 분류 */}
            <div className="mt-[24px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">상태의 종류부터 구분</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { type: "서버 상태",   desc: "DB에서 오는 데이터. 비동기, 캐싱, 동기화 필요",   lib: "TanStack Query", color: "text-blue040" },
                        { type: "전역 UI 상태", desc: "여러 컴포넌트가 공유하는 클라이언트 상태",         lib: "Zustand, Recoil", color: "text-green060" },
                        { type: "로컬 상태",   desc: "한 컴포넌트 내부에서만 쓰이는 상태",              lib: "useState, useReducer", color: "text-gray060" },
                        { type: "폼 상태",     desc: "입력값, 유효성 검사, 제출",                      lib: "React Hook Form", color: "text-yellow060" },
                    ].map(({ type, desc, lib, color }) => (
                        <div key={type} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className={`body-xs font-bold min-w-[90px] ${color}`}>{type}</span>
                            <span className="body-xs text-gray060 flex-1">{desc}</span>
                            <span className="body-xs text-gray040">{lib}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 라이브러리 비교표 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">라이브러리 특성 비교</p>
                <div className="mt-[6px] flex flex-col gap-[2px]">
                    <div className="flex bg-gray020 rounded-t-[8px]">
                        <span className="body-xs font-bold text-gray060 px-[10px] py-[7px] min-w-[120px]"></span>
                        <span className="body-xs font-bold text-blue040 px-[10px] py-[7px] flex-1">TanStack Query</span>
                        <span className="body-xs font-bold text-green060 px-[10px] py-[7px] flex-1">Zustand</span>
                        <span className="body-xs font-bold text-hourblue px-[10px] py-[7px] flex-1">Recoil</span>
                        <span className="body-xs font-bold text-red050 px-[10px] py-[7px] flex-1">Redux Toolkit</span>
                    </div>
                    {[
                        { label: "목적",       tq: "서버 상태",      zu: "클라이언트 전역",  re: "클라이언트 전역",  rd: "클라이언트 전역" },
                        { label: "보일러플레이트", tq: "낮음",         zu: "매우 낮음",       re: "낮음",            rd: "중간" },
                        { label: "번들 크기",   tq: "~13KB",         zu: "~1KB",           re: "~21KB",          rd: "~11KB" },
                        { label: "리렌더링 제어", tq: "자동",         zu: "selector",       re: "atom 단위",       rd: "selector" },
                        { label: "캐싱",        tq: "핵심 기능",     zu: "없음",            re: "없음",            rd: "없음" },
                        { label: "비동기",       tq: "특화",         zu: "직접 구현",       re: "selector로 가능", rd: "thunk/saga" },
                        { label: "React 의존성", tq: "있음",         zu: "없음",            re: "있음",            rd: "있음" },
                    ].map(({ label, tq, zu, re, rd }) => (
                        <div key={label} className="flex bg-gray010">
                            <span className="body-xs text-gray050 font-bold px-[10px] py-[6px] min-w-[120px] bg-gray015">{label}</span>
                            <span className="body-xs text-gray060 px-[10px] py-[6px] flex-1">{tq}</span>
                            <span className="body-xs text-gray060 px-[10px] py-[6px] flex-1">{zu}</span>
                            <span className="body-xs text-gray060 px-[10px] py-[6px] flex-1">{re}</span>
                            <span className="body-xs text-gray060 px-[10px] py-[6px] flex-1">{rd}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 조합 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 조합 전략</p>
                <div className="mt-[6px] flex flex-col gap-[8px]">
                    <div className="bg-blue005 border border-blue020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-blue040 font-bold mb-[4px]">TanStack Query + Zustand (현재 대세)</p>
                        <p className="body-xs text-gray060">
                            서버 데이터는 TanStack Query, 클라이언트 전역 상태는 Zustand.<br />
                            명확한 역할 분리로 복잡도 감소. 번들 크기 최소화.
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">TanStack Query + Recoil</p>
                        <p className="body-xs text-gray060">
                            atom 단위의 세밀한 상태 구독이 필요할 때. 컴포넌트가 많고 상태가 복잡한 경우.
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">Redux Toolkit 단독</p>
                        <p className="body-xs text-gray060">
                            규모가 크고 팀이 많을 때. 상태 변경 흐름을 엄격하게 추적해야 할 때.<br />
                            RTK Query(Redux 내장 서버 상태 관리)로 TanStack Query 역할도 대체 가능.
                        </p>
                    </div>
                </div>
            </div>

            {/* Recoil 핵심 개념 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Recoil 핵심 개념</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// atom — 상태의 최소 단위
const counterAtom = atom({ key: 'counter', default: 0 })

// selector — atom 기반의 파생 상태 (useMemo 역할)
const doubledCounter = selector({
    key: 'doubledCounter',
    get: ({ get }) => get(counterAtom) * 2,
})

// 컴포넌트에서
const [count, setCount] = useRecoilState(counterAtom)
const doubled = useRecoilValue(doubledCounter)
const setCount2 = useSetRecoilState(counterAtom)  // 읽기 없이 쓰기만

// 장점: atom만 구독 → 해당 atom 변경 시만 리렌더링
// 단점: key 관리 필요, React 18 Concurrent Mode 이슈`}
                    </p>
                </div>
            </div>

        </article>
    )
}
