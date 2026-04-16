"use client"

export default function JavaScriptEngine() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">자바스크립트 엔진</p>
            <p className="text-gray060 body-sm mt-[16px]">
                JavaScript 코드를 해석하고 실행하는 프로그램. 브라우저(V8, SpiderMonkey), Node.js, React Native 등에서 동작한다.<br />
                현재 가장 널리 쓰이는 <strong>V8 엔진 (Chrome, Node.js)</strong>을 기준으로 동작 원리를 정리한다.
            </p>

            {/* V8 파이프라인 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">V8 엔진 파이프라인</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["소스코드", "토크나이저", "파서", "AST", "Ignition\n(인터프리터)", "바이트코드", "TurboFan\n(JIT 컴파일러)", "최적화 머신코드"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className="bg-blue005 border border-blue020 rounded-[8px] px-[10px] py-[7px] min-w-[60px]">
                                <p className="body-xs text-blue040 text-center whitespace-pre-line">{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[8px] h-[1px] bg-gray040 flex-shrink-0" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* 각 단계 설명 */}
            <div className="mt-[32px] flex flex-col gap-[8px]">
                <p className="text-blue030 body-md">단계별 설명</p>
                {[
                    {
                        title: "토크나이저 (Tokenizer / Lexer)",
                        desc: "소스코드를 의미 있는 최소 단위인 토큰으로 분해. 이 시점에 스코프가 결정된다.",
                        code: `let a = "abc"
// 토큰 결과
[{ type: "keyword", value: "let" },
 { type: "identifier", value: "a" },
 { type: "operator", value: "=" },
 { type: "string", value: "abc" }]`,
                    },
                    {
                        title: "파서 (Parser)",
                        desc: "토큰을 구문 규칙에 따라 분석하여 파싱 트리 생성. Eager Parser(즉시 필요한 코드)와 Lazy Parser(나중에 필요한 코드)로 구분해 파싱 비용 절감.",
                        code: null,
                    },
                    {
                        title: "AST (Abstract Syntax Tree)",
                        desc: "파서가 토큰의 우선순위에 따라 노드를 배치하여 생성한 추상 구문 트리. 소스코드의 구조를 트리 형태로 표현.",
                        code: null,
                    },
                    {
                        title: "Ignition (인터프리터)",
                        desc: "AST를 바이트코드로 변환하고 실행. 바이트코드는 플랫폼 독립적인 중간 코드다.",
                        code: null,
                    },
                    {
                        title: "TurboFan (JIT 컴파일러)",
                        desc: "자주 실행되는 코드(hot spot)를 감지하면 최적화된 머신코드로 컴파일. 타입이 변경되면 역최적화(deoptimization)하여 인터프리터로 복귀.",
                        code: null,
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold">{item.title}</p>
                        <p className="body-xs text-gray060 mt-[4px]">{item.desc}</p>
                        {item.code && (
                            <p className="body-xs text-gray060 whitespace-pre-line mt-[8px] font-mono">{item.code}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* JIT 컴파일 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">JIT (Just-In-Time) 컴파일</p>
                <p className="text-gray060 body-sm">V8은 인터프리터와 컴파일러를 혼용하는 Adaptive JIT Compilation을 사용한다.</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { step: "1", label: "기본 실행", desc: "모든 코드를 Ignition으로 인터프리팅" },
                        { step: "2", label: "Baseline JIT", desc: "자주 실행되는 코드 감지 → 최소 최적화 컴파일" },
                        { step: "3", label: "Optimizing JIT (TurboFan)", desc: "더 자주 실행 시 타입 추론 기반 강한 최적화 적용" },
                        { step: "4", label: "Deoptimization", desc: "타입이 바뀌거나 가정이 틀리면 최적화 코드 폐기 → 인터프리터로 복귀" },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-[10px]">
                            <div className="w-[22px] h-[22px] min-w-[22px] rounded-full bg-blue005 border border-blue020 flex items-center justify-center flex-shrink-0">
                                <span className="body-xs text-blue040 font-bold">{item.step}</span>
                            </div>
                            <div>
                                <p className="body-xs text-gray080 font-bold">{item.label}</p>
                                <p className="body-xs text-gray060 mt-[1px]">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-[6px] bg-yellow005 border border-yellow020 rounded-[8px] p-[10px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">TypeScript / 일관된 타입의 이점</p>
                    <p className="body-xs text-gray060">함수 인자의 타입이 항상 동일하면 Deoptimization이 발생하지 않아 JIT 최적화 효과가 유지된다.</p>
                </div>
            </div>

            {/* 메모리 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">메모리 구조 — 힙 & 스택</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Call Stack</p>
                        <p className="body-xs text-gray060">원시값, 함수 실행 컨텍스트 저장. 크기 제한 있음 (Stack Overflow).</p>
                    </div>
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Heap (메모리 힙)</p>
                        <p className="body-xs text-gray060">객체, 배열, 함수 등 참조 타입 저장. GC(Garbage Collector)가 관리.</p>
                    </div>
                </div>
            </div>

            {/* GC */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">가비지 컬렉션 (GC)</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { name: "Minor GC (Scavenge)", space: "New Space (Young Generation)", desc: "새로 생성된 객체 관리. 2개의 Semi Space를 사용하여 체니 알고리즘으로 살아있는 객체를 복사. 두 번 살아남으면 Old Space로 이동." },
                        { name: "Major GC (Mark-Sweep-Compact)", space: "Old Space (Old Generation)", desc: "Minor GC를 통과한 장기 객체 관리. Marking(도달 가능 객체 표시) → Sweeping(미표시 객체 해제) → Compacting(메모리 압축) 3단계." },
                    ].map((item) => (
                        <div key={item.name} className="bg-gray010 rounded-[8px] p-[12px]">
                            <p className="body-xs text-gray080 font-bold">{item.name}</p>
                            <p className="body-xs text-blue030 mt-[2px]">{item.space}</p>
                            <p className="body-xs text-gray060 mt-[4px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
