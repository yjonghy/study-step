import React, {useRef, useState} from "react";
import {GhostPrimaryButton} from "@src/types/ButtonType";


const flowStyle = "bg-gray020 px-[8px] rounded-[8px] cursor-pointer text-center h-[52px] flex items-center" + GhostPrimaryButton
const descBubbleStyle = "mt-[24px] flex flex-col justify-center body-xs"
export default function JavascriptEngine (){


    const tokenRef = useRef(null)
    const parserRef = useRef(null)
    const astRef = useRef(null)
    const interpreterRef = useRef(null)
    const compilerRef = useRef(null)

    const [semispace, setSemispace] = useState(false)

    const changeVisibleBubble = (type : string) => {
        if (type === "token") {
            if (tokenRef.current) {
                window.scrollTo(0, tokenRef.current.getBoundingClientRect().top - 20)
            }
            return
        }
        if (type === "parser") {
            if (parserRef.current) {
                window.scrollTo(0, parserRef.current.getBoundingClientRect().top - 20)
            }
            return;
        }

        if (type === "ast") {
            if (astRef.current) {
                window.scrollTo(0, astRef.current.getBoundingClientRect().top - 20)
            }
            return;
        }
        if (type === "interpreter") {
            if (interpreterRef.current) {
                window.scrollTo(0, interpreterRef.current.getBoundingClientRect().top - 20)
            }
            return;
        }
        if (type === "compiler") {
            if (compilerRef.current) {
                window.scrollTo(0, compilerRef.current.getBoundingClientRect().top - 20)
            }
            return;
        }
    }

    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px]">
            <p className="text-gray060 heading-xl">자바스크립트 엔진인란</p>
            <div className="text-gray060 body-sm mt-[20px]">
                자바스크립트 코드를 해석하여 실행해주는 프로그램
                <br/>
                예를 들면 웹브라우저, Node.js, Electron, React Native 등 에서 동작한다.
                <br/>
                *웹브라우저 엔진이 다르다. {`->`} 엔진의 종류는 다양하다
                <br/>
                ex)스파이더 몽키, Chakra(Jscript9), Chakra(JavaScript), JavaScript Core, V8, Rhino 기타등등
                <br/>
                <a className={"text-blue030 mt-[4ppx]"}
                    href={"https://velog.io/@godori/JavaScript-engine-1"} target="_blank">참고 링크</a>
            </div>

            <article className="w-full h-full mt-[20px]">
                <p className="text-gray060 heading-xl">엔진의 동작 과정 (v8기준)</p>

                <div className="flex flex-wrap gap-[8px] mt-[10px]">
                    <div
                        onClick={() => changeVisibleBubble("code")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">js 소스코드</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div className="relative">
                        <div
                            onClick={() => changeVisibleBubble("token")}
                            className={flowStyle}>
                            <p className="body-sm text-gray080 self-center">토크나이저</p>
                        </div>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div className="relative">
                        <div
                            onClick={() => changeVisibleBubble("parser")}
                            className={flowStyle}>
                            <p className="body-sm text-gray080 self-center">parser</p>
                        </div>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("ast")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">AST<br/>(Abstract Syntax Tree)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("interpreter")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">Interpreter<br/>(Ignition)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("bytecode")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">Bytecode</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("compiler")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">Compiler<br/>(TurboFan)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("optimized")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080 self-center">Optimized Machine Code</p>
                    </div>
                </div>

                <div ref={tokenRef} className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">토크나이저</p>
                    <p className="text-gray080 body-sm">작성한 코드를 최소 단위인 토큰으로 분해하는 프로그램 <br/>분해하는 과정을 토크나이징이라고 한다</p>
                    <p className="text-gray080 body-xs whitespace-pre-line">
                        ex) {`
                            let a = "abc" 
                             
                            토큰 = [
                                { type : "keyword", value : "let" },
                                { type : "name(identifier)", value : "a" },
                                { type : "=(operator)", value : "=" }, 
                                { type : "a", value : "abc" }, 
                                { type : ";", value : ";" }, 
                            ]
                            *이때 스코프가 결정 
                            
                            우선순위
                            keyword 2,
                            identifier 0,
                            operator 1,
                            string or number (type) 0,
                            semicolon 0
                        `}
                    </p>
                </div>



                <div ref={parserRef} className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">파서</p>
                    <p className="text-gray080 body-sm ">원시프로그램을 읽어 들여 그 문장의 구조를 알아내는 구문분석을 행하는 프로그램</p>
                    <p className="text-gray080 body-xs whitespace-pre-line">
                        {`
                        1.pre-parser - 나중에 필요한 코드, 이벤트 함수와 같은 페이지를 로드할때 필요하지않은 코드
                        2.parser - 지금 바로 사용되는 코드
                        `}
                    </p>

                    <div className="flex mt-[20px] gap-[4px] justify-between items-center">
                        <div className="bg-gray020 p-[10px] rounded-[8px] flex-1">
                            <p className="body-xs text-gray080 text-center">
                                토큰이 구문 규칙과 일치하는가
                            </p>

                            <p className="body-xs text-gray080 text-center mt-[4px]">
                                (규칙과 다를 경우 새 토큰 요청)
                            </p>
                        </div>

                        <div className="flex flex-col gap-[4px] items-center justify-center">
                            <div className="w-[10px] h-[1px] bg-gray080"></div>
                        </div>

                        <div className="bg-gray020 p-[10px] rounded-[8px] self-center flex-1">
                            <p className="body-xs text-gray080 text-center ">
                                토큰
                            </p>
                        </div>

                        <div className="flex flex-col gap-[4px] items-center justify-center">
                            <div className="w-[10px] h-[1px] bg-gray080"></div>
                        </div>

                        <div className="bg-gray020 p-[10px] rounded-[8px] self-center flex-1">
                            <p className="body-xs text-gray080 text-center">
                                파싱 트리에 노드 추가
                            </p>
                            <p className="body-xs text-gray080 text-center mt-[4px]">
                                (완료 후 새 토큰 요청)
                            </p>
                        </div>

                    </div>
                </div>


                <div ref={astRef} className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">AST</p>
                    AST 는 Abstract Syntax Tree의 줄임말로
                    <br/>소스 코드의 추상 구문 구조의 트리이다.
                    추상적이라는 이유는 실제 구문에서 나타나는 모든 세세한 정보를 표현하지 않는다는 것을 의미한다.
                    <br/>파서가 토큰을 구문분석하여 우선순위에 따라 노드에 추가하여 만든 트리이다 (이미지 참조)
                    <img src="/ast.png" className="object-cover mt-[8px]"/>
                </div>


                <div ref={interpreterRef} className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">interpreter</p>
                    인터프리터란 한 문서가 아닌 소스코드를 한줄씩 실행하여 번역 <br/>
                    번역과 실행이 동시에 이루어짐  (빌드 X - 실행)
                    <br/>
                    AST를 바이트 코드로 변환하는 것은 Ignition이라는 *인터프리터이다. 인터프리터가 바이트코드로 해석한 후
                    콜스택과 메모리 힙 이용하는것이다
                </div>


                <div ref={compilerRef} className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">compiler</p>
                    특정언어로 쓰인 문서를 다른언어로 옮기는 번역 프로그램 <br/>
                    번역을 한 후에 실행, (빌드 - 실행)
                </div>

                <div className={`${descBubbleStyle}`}>
                    <p className="text-blue030 body-md">자바스크립트는 인터프리터? 컴파일러?</p>
                    <p className="text-gray060 body-xs mt-[8px]">
                        초기 - 가벼운 인터프리터 언어
                    </p>
                    <p className="text-gray060 body-xs mt-[2px]">
                        중기 - 웹에서 연산과정이 많아지고 복잡함 {`->`} 즉 기능이 늘어나고 성능상 무거워짐 ex)구글맵 {`->`} 위 이슈로 컴파일 사용
                    </p>
                    <p className="text-gray060 body-xs mt-[2px]">
                        현재 - jitc(Just-in-Time Compilation)를 혼용하여 쓰는 Adaptive JIT Compilation - jit를 javascript에서 사용할때의 단점으로 인함
                    </p>


                    <p className="text-gray060 body-xs mt-[8px]">
                        기본적으로 모든코드는 인터프리터(Ignition/v8)로 수행, 자주 반복되는 부분 (hotspot) 발견시에 JITC(TurboFan/v8)적용 하여 navtive code로 수행
                        <br />
                        <br />
                        *JITC의 단계
                        <br />
                        최소한의 최적화만 적용하는 JITC (baseline-JITC)로 컴파일 하여 수행 <br />
                        더 반복될경우 <br />
                        더 많은 최적화를 적용하는 JITC(Optimizing-JITC)로 컴파일
                    </p>

                    <p className="text-gray060 body-xs mt-[10px]">
                        Optimizing-JITC 는 profiling을 수행하는 동안 <br />
                        특정 변수의 타입이 변하지 않았다면
                        그 이후에도 그 변수는 타입이 변하지 않을 가능성이 매우 높을 것이다 라는 가정을 하고 최적화를 한다. <br />
                        그러나 이런 가정이 틀렸다는 것을 알게 될 경우,<br />
                        즉 타입이 바뀌었을 경우에는 JIT는 가정이 잘못되었다고 판단하고 최적화된 코드를 버린다. <br />
                        그러면 다시 인터프리터 혹은 기본 컴파일된 버전으로 돌아간다. <br />
                        이 과정은 역최적화(deoptimization) 혹은 구제(bailing out) 라고 한다.
                    </p>
                </div>
            </article>



            <article className="w-full h-full mt-[36px]">
                <p className="text-gray060 heading-xl">엔진의 구성</p>
                <p className="text-gray080 heading-md mt-[4px]">크게 두가지로 구성이 된다 콜 스택과 힙(메모리)</p>

                <p className="text-blue030 heading-xs mt-[12px]">힙 메모리</p>
                <p className="text-gray060 body-xs mt-[10px]">
                    할당 - 사용 - 해제<br />
                    생성한 객체에 필요한 메모리 할당 (javascript가 해줌)<br />
                    코드에서 수행하는 작업 변수에서 읽거나 쓰는것을 말함<br />
                </p>

                <div className="w-full flex flex-col gap-[10px] bg-red040 p-[12px] mt-[12px]">
                    <div className="w-full flex items-center justify-between gap-[10px]">
                        <div className="flex-1 flex flex-col items-center justify-center gap-[8px] bg-red030 py-[8px]">
                            <div className="flex gap-[12px] px-[4px]">
                                <p className="text-center p-[12px] bg-green050 text-white heading-xs">semi space</p>
                                <p className="text-center p-[12px] bg-green050 text-white heading-xs">semi space</p>
                            </div>
                            <p className="mt-[4px] text-white heading-xs text-white heading-xs">New space</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-[8px] bg-green030 py-[8px]">
                            <div className="flex gap-[12px] px-[4px]">
                                <p className="text-center p-[12px] bg-yellow050 self-center text-white heading-xs">old pointer space</p>
                                <p className="text-center p-[12px] bg-yellow050 self-center text-white heading-xs">old data space</p>
                            </div>
                            <p className="mt-[4px] text-white heading-xs">Old space</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center gap-[40px]">
                        <div className="flex items-center justify-center p-[10px] bg-yellow050">
                            <p className="text-white heading-xs">Large object pace</p>
                        </div>

                        <div className="flex items-center justify-center p-[10px] bg-red050">
                            <p className="text-white heading-xs">Code pace</p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <p className="p-[10px] bg-green050 w-full text-center text-white heading-xs">Cell pace</p>
                            <p className="p-[10px] bg-green050 w-full text-center text-white heading-xs">Property cell pace</p>
                            <p className="p-[10px] bg-green050 w-full text-center text-white heading-xs">Map pace</p>
                        </div>

                    </div>

                </div>

                <div className="w-full bg-blue020 flex items-center justify-center py-[12px] mt-[12px]">
                    <p className="text-white heading-xs">Stack</p>
                </div>
                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>Map Space, Property Cell Space, Cell Space</strong>는 종류에 맞는 객체들을 분류해서 가지고있기 편하게 하는 역할을 하는 공간<br />
                    Code Space 실행될 실제 코드가 들어가는 부분이라고 보면 된다. JIT컴파일된 코드가 들어가있으며, 유일하게 실행 가능한 메모리가 있는 영역<br />
                    Large Object Space는 이름 그대로 좀 크기가 큰 객체가 들어가는 부분이다. 이 부분은 가비지컬렉션이 되지 않는다.<br />
                </p>

                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>New space(young generation)</strong><br />
                    -새로 만들어진 모든 객체 우선 저장<br />
                    -1~8mb<br />
                    -짧은 생명주기를 가지는 새로 생성된 객체 두개의 semi space <strong>Minor GC</strong>가 관리(후술) old 영역에 비해 매우 작음
                </p>

                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>Old space(young generation)</strong><br />
                    -마이너 GC가 두 번 발생한 뒤에 New space에서 남아있는 객체가 이동하는 곳이다. 이 영역은<strong>Major GC</strong>가 관리<br />
                    -pointer {`->`} 다른 객체를 참조하는 객체<br />
                    -data {`->`} 데이터만 있는 객체
                </p>





                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>Minor GC</strong><br />
                    -V8의 New Space에서 일어나는 Minor GC는 체니의 알고리즘(Cheney{`'`}s Algorithm)으로 구현<br />
                    *객체들이 존재하는 space가 from이고 비어있는게 to {`->`} to와 from이 역할을 바꿈<br />
                </p>

                <div className="mt-[4px] flex bg-red030 p-[20px] w-full justify-around rounded-[8px]">

                    <div className="p-[10px] text-white body-xs bg-gray040 rounded-[8px]">
                        object
                    </div>

                    <div className="p-[10px] text-white body-xs bg-green050 rounded-[8px]">
                        semi space (from)
                    </div>
                    <div className="p-[10px] text-white body-xs bg-green050 rounded-[8px]">
                        semi space (to)
                    </div>
                </div>

                <p className="text-gray060 body-xs mt-[10px]">
                    처음 객체가 할당되는곳 존재하는 from<br />
                    {`->`} 새객체 할당시 여유공간이 없다 <br />
                    {`->`}GC 실행<br />
                    {`->`}from 의 객체를 탐색하여 to로 옮김, to로 옮겨진 객체가 참조 하고있던 객체 또한 to로 옮김<br />
                    (스택 포인터 root부터 시작해서 도달가능한 객체들)<br />
                    {`->`}옮겨지지 못한 from의 객체들은 가비지로 취급 컬렉팅<br />
                    {`->`}to로 옮겨진 객체를 from으로 다시 옮김 (to 와 from을 바꿈 즉 옮긴걸 다시 옮기는게 아니고 to가 from이됨)<br />
                    {`->`}위과정을 한번 더 실행했을때 (두번) 살아남은 객체는 old space로 ㄱㄱ<br />
                    <br /><br />
                    * Write Barriers라고 불리는 기능을 포함하고 있다. Old space에서 New space를 향하는 포인터의 리스트를 저장하고, 이를 이용해 New space의 참조 현황을 확인해 GC를 진행
                </p>



                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>Major GC</strong><br />
                    new {`->`} old로 옮겨질때 old의 공간이 부족한 경우 실행
                </p>

                <p className="text-gray060 body-xs mt-[10px]">
                    <strong>작동 방식</strong><br />
                    1.Marking<br />
                    현재 사용되는 객체 파악<br />
                    루트에서 시작하여 해당객체에 도달할수 있는지 살펴봄 <br />
                    도달할수 있는 객체 (ex) 루트 - 부모 - 자식) 에 대하여 마킹을 한다<br />
                    <br /><br />
                    2.Sweeping<br />
                    위 단게에서 마킹이 되지 못한 객체를 치우고 그객체가 사용하던 공간을 free-list에 저장,<br />
                    탐색하기 쉽도룩 크기순 세분화 {`<-`} 새 메모리 할당할때에 여기서 찾음<br />
                    <br /><br />
                    3.Compacting<br />
                    압축을 진행하지 않는 다른 메모리 페이지에 복사하여 압축
                </p>



                <p className="text-gray060 body-xs mt-[10px]">
                    가비지 콜렉터가 메인 스레드를 블로킹하여 성능 저하가 발생
                    {`->`}3가지 방식추가
                    <br /><br />
                    병렬, 점진, 동시
                    <br /><br />
                    병렬 {`->`} 헬페스레드들이 비슷한의 작업 실행 헬퍼스레드 동기화 필요<br />
                    점진 {`->`} 메인스레드가 GC-JS_GC_JS 순서대로 실행<br />
                    동시 {`->`} 헬퍼스레드에서만 GC실행 {`->`} 블로킹이 전혀없는대신에 동기화 처리를 꼭 해야함<br />
                </p>



            </article>







        </article>
    )
}
// *javascript 변수 - 원시 혹은 찹조가 될수있다 (함수도 일종의 참조타입(object)으로 구성)
// 원시타입은 js 런타임 환경에서 해당 type의 object wrapper를 씌워 그 object 속성(메소드) 실행
// 일시적으로 씌워 실행하고 해당 object는 폐기 -> object wrapper를 수정하거나 저장하는게 의미없음


//(HTML이 parsing될 때 script태그를 만나면 parsing이 일시중지되고 script를 해석, 실행)

// ("JavaScipt Engine" !== "Rendering Engine" = true /
// Rendering Engine 또는 Layout Engine은 HTML과 CSS로 작성된 코드를 컨텐츠로 사용하여 웹 페이지에 “rendering” 하는 역할)
