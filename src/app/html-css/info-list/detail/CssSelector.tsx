export default function CssSelector() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">CSS 선택자 & 명시도</p>
            <p className="text-gray060 body-sm mt-[16px]">
                CSS 충돌 시 어떤 규칙이 적용될지는 명시도(Specificity)와 소스 순서로 결정된다.<br />
                명시도를 이해하면 !important 없이 의도대로 스타일을 제어할 수 있다.
            </p>

            {/* 선택자 종류 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">선택자 종류</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { sel: "* (전체)",           ex: "*",                    desc: "모든 요소. 명시도 0-0-0" },
                        { sel: "태그 (Type)",        ex: "div, p, h1",           desc: "해당 태그. 명시도 0-0-1" },
                        { sel: "클래스",             ex: ".card, .btn-primary",  desc: "명시도 0-1-0" },
                        { sel: "ID",                 ex: "#header, #main",       desc: "명시도 1-0-0. 가급적 ID 선택자 지양" },
                        { sel: "가상 클래스",        ex: ":hover, :focus, :nth-child", desc: "명시도 0-1-0" },
                        { sel: "가상 요소",          ex: "::before, ::after, ::placeholder", desc: "명시도 0-0-1" },
                        { sel: "속성 선택자",        ex: "[type='text'], [href^='https']", desc: "명시도 0-1-0" },
                        { sel: "결합자",             ex: "div > p, ul li, h1 + p, h1 ~ p", desc: "명시도 추가 없음 (자식, 후손, 인접, 형제)" },
                    ].map(({ sel, ex, desc }) => (
                        <div key={sel} className="flex items-start gap-[8px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[110px]">{sel}</span>
                            <span className="body-xs text-gray040 min-w-[160px]">{ex}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 명시도 계산 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">명시도 계산 (A-B-C)</p>
                <p className="text-gray060 body-sm">세 자리 숫자로 표현. A(ID 수) - B(클래스·속성·가상클래스 수) - C(태그·가상요소 수). 높을수록 우선.</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { sel: "p",                          spec: "0-0-1", priority: "최저" },
                        { sel: ".card",                      spec: "0-1-0", priority: "" },
                        { sel: "div.card",                   spec: "0-1-1", priority: "" },
                        { sel: ".card:hover",                spec: "0-2-0", priority: "" },
                        { sel: "#header",                    spec: "1-0-0", priority: "" },
                        { sel: "#header .card",              spec: "1-1-0", priority: "" },
                        { sel: "style=\"...\" (인라인)",     spec: "1-0-0-0", priority: "" },
                        { sel: "!important",                 spec: "무조건 최우선",   priority: "사용 자제" },
                    ].map(({ sel, spec, priority }) => (
                        <div key={sel} className="flex items-center gap-[8px] bg-gray010 px-[12px] py-[6px] rounded-[8px]">
                            <span className="body-xs text-gray060 flex-1 font-mono">{sel}</span>
                            <span className="body-xs text-blue040 font-bold w-[80px]">{spec}</span>
                            {priority && <span className="body-xs text-red040">{priority}</span>}
                        </div>
                    ))}
                </div>
                <div className="bg-yellow005 border border-yellow030 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-yellow060 font-bold mb-[2px]">명시도 동일 시</p>
                    <p className="body-xs text-gray060">나중에 선언된 규칙이 우선 적용 (소스 순서 기반). 같은 스타일시트 내에서도 적용.</p>
                </div>
            </div>

            {/* 상속 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">상속 (Inheritance)</p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">상속되는 속성</p>
                        <p className="body-xs text-gray060">color, font-family, font-size, font-weight, line-height, letter-spacing, text-align, visibility, cursor...</p>
                    </div>
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">상속 안 되는 속성</p>
                        <p className="body-xs text-gray060">margin, padding, border, background, width, height, display, position, flex, grid...</p>
                    </div>
                </div>
                <div className="bg-gray010 rounded-[8px] p-[10px] mt-[2px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`/* 상속 강제 / 초기화 */
.child { color: inherit; }      /* 부모 값 상속 */
.child { color: initial; }      /* 브라우저 기본값으로 초기화 */
.child { color: unset; }        /* 상속 가능하면 inherit, 아니면 initial */
.child { all: revert; }         /* 모든 속성을 브라우저 스타일로 되돌림 */`}</p>
                </div>
            </div>

            {/* 캐스케이드 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">캐스케이드 적용 우선순위</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "1. !important (사용자 정의) > !important (개발자) > 일반 스타일",
                        "2. 명시도 높은 선택자",
                        "3. 동일 명시도면 소스 순서 (뒤에 오는 것 우선)",
                        "4. 상속된 스타일 (직접 지정된 스타일보다 항상 낮음)",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}
