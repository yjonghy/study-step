export default function ReactProfiler() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">React Profiler & 성능 측정</p>
            <p className="text-gray060 body-sm mt-[16px]">
                React DevTools Profiler와 Profiler API를 활용하여 어떤 컴포넌트가 렌더링되고,<br />
                얼마나 시간이 걸리는지 측정하고 병목을 제거하는 방법을 정리한다.
            </p>

            {/* Profiler API */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Profiler API</p>
                <p className="text-gray060 body-sm">
                    {"<Profiler>"} 컴포넌트로 특정 트리의 렌더링 비용을 프로그래밍적으로 측정할 수 있다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { Profiler } from 'react';

function onRenderCallback(
  id,           // 컴포넌트 트리 id
  phase,        // "mount" | "update" | "nested-update"
  actualDuration,  // 이번 렌더에 걸린 시간 (ms)
  baseDuration,    // 최적화 없이 걸릴 예상 시간
  startTime,
  commitTime,
) {
  console.log(\`[\${id}] \${phase}: \${actualDuration.toFixed(2)}ms\`);
}

<Profiler id="UserList" onRender={onRenderCallback}>
  <UserList users={users} />
</Profiler>`}</p>
                </div>
                <p className="body-xs text-gray040 mt-[4px]">프로덕션 빌드에서는 Profiler가 자동으로 비활성화된다.</p>
            </div>

            {/* DevTools Profiler */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React DevTools Profiler 사용법</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { step: "1", desc: "Chrome 확장 'React Developer Tools' 설치" },
                        { step: "2", desc: "개발자도구 → Profiler 탭 → ● 녹화 시작" },
                        { step: "3", desc: "측정하고 싶은 UI 인터랙션 수행 후 ■ 중지" },
                        { step: "4", desc: "Flamegraph로 각 컴포넌트 렌더링 시간 확인" },
                        { step: "5", desc: "회색 컴포넌트 = 이번 커밋에서 렌더링 안 됨 / 노랑·빨강 = 오래 걸림" },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-[10px]">
                            <div className="w-[20px] h-[20px] min-w-[20px] rounded-full bg-blue005 border border-blue020 flex items-center justify-center">
                                <span className="body-xs text-blue040 font-bold">{item.step}</span>
                            </div>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 불필요한 리렌더링 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">불필요한 리렌더링 — 원인과 해결</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">원인 1 — 인라인 객체/함수</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// 매 렌더마다 새 참조 → 자식 리렌더
<Child style={{ color: 'red' }} onClick={() => doSomething()} />

// 해결: useMemo / useCallback
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doSomething(), []);`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">원인 2 — Context 과도한 사용</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// Context value가 바뀌면 모든 Consumer가 리렌더
// 해결: Context 쪼개기 또는 Zustand 같은 외부 스토어 활용`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">원인 3 — key 불안정</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// index를 key로 쓰면 순서 변경 시 전체 리마운트
{list.map((item, i) => <Item key={i} />)}    // 나쁨
{list.map((item) => <Item key={item.id} />)} // 좋음`}</p>
                    </div>
                </div>
            </div>

            {/* 측정 체크리스트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">성능 측정 체크리스트</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "Profiler로 렌더링 빈도가 높은 컴포넌트 파악",
                        "React.memo로 불필요한 리렌더 차단 여부 확인",
                        "목록 렌더링 시 가상화(react-window) 적용 여부",
                        "무거운 계산에 useMemo 적용",
                        "이벤트 핸들러에 useCallback 적용 (자식에 props로 전달 시)",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-blue030 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
