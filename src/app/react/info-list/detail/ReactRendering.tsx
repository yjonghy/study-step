export default function ReactRendering() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">React 렌더링 원리</p>
            <p className="text-gray060 body-sm mt-[16px]">
                React에서 &quot;렌더링&quot;이란 컴포넌트 함수를 호출해 React가 화면에 무엇을 그려야 할지 파악하는 과정이다.<br />
                DOM을 직접 업데이트하는 것과 다르다.
            </p>

            {/* 렌더링 트리거 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">렌더링이 발생하는 조건</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    {[
                        { label: "초기 렌더링",         desc: "컴포넌트가 처음 화면에 마운트될 때" },
                        { label: "state 변경",          desc: "useState, useReducer의 setState 호출 시" },
                        { label: "부모 컴포넌트 리렌더링", desc: "부모가 리렌더링되면 자식도 기본적으로 리렌더링" },
                        { label: "Context 값 변경",     desc: "useContext를 구독 중인 컴포넌트 전체 리렌더링" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[140px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 두 단계 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">렌더링의 두 단계</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-blue005 border border-blue020 rounded-[8px] p-[14px]">
                        <p className="body-sm text-blue040 font-bold mb-[6px]">① Render Phase</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`컴포넌트 함수를 호출하여
새 Virtual DOM 트리를 계산한다.

순수해야 한다 — 부작용(side effect)이
없어야 하며, 같은 입력엔 같은 출력이 나와야 함.

React.StrictMode에서는 이 단계를
두 번 실행해 순수성을 검증한다.`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[14px]">
                        <p className="body-sm text-green060 font-bold mb-[6px]">② Commit Phase</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`Render Phase 결과를 실제 DOM에 반영.

순서:
1. useLayoutEffect (DOM 업데이트 직후, 동기)
2. DOM 업데이트 (React가 처리)
3. 브라우저 페인트
4. useEffect (비동기, 페인트 이후)`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 리렌더링 전파 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">리렌더링 전파</p>
                <p className="text-gray060 body-sm">
                    기본적으로 부모가 리렌더링되면 자식도 모두 리렌더링된다. props가 바뀌지 않아도 마찬가지다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`Parent 리렌더링
  └── ChildA 리렌더링  ← props 안 바뀌어도 리렌더링
  └── ChildB 리렌더링  ← React.memo()로 스킵 가능`}
                    </p>
                </div>
                <p className="text-gray060 body-xs mt-[4px]">
                    → React.memo, useMemo, useCallback으로 불필요한 리렌더링을 방지할 수 있다.
                </p>
            </div>

            {/* useEffect vs useLayoutEffect */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useEffect vs useLayoutEffect</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">useEffect</p>
                        <p className="body-xs text-gray060">
                            브라우저 페인트 이후 비동기 실행. 데이터 fetch, 이벤트 리스너 등록 등에 사용.
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">useLayoutEffect</p>
                        <p className="body-xs text-gray060">
                            DOM 업데이트 직후, 페인트 전에 동기 실행. DOM 크기 측정이나 스크롤 위치 설정 등 깜빡임이 없어야 할 때 사용.
                        </p>
                    </div>
                </div>
            </div>

            {/* StrictMode */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React.StrictMode에서 2번 렌더링</p>
                <p className="text-gray060 body-sm">
                    개발 모드에서만 동작. Render Phase를 2번 호출해 컴포넌트가 순수한지 검증한다.<br />
                    프로덕션 빌드에서는 1번만 실행된다. console.log가 두 번 찍히는 원인이 이것이다.
                </p>
            </div>

        </article>
    )
}
