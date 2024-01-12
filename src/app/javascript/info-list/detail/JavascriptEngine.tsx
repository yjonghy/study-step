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
                        중기 - 웹에서 연산과정이 많아지고 복잡함 -> 즉 기능이 늘어나고 성능상 무거워짐 ex)구글맵 -> 위 이슈로 컴파일 사용
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


                {/*<p className="text-gray060 body-xs mt-[10px]">*/}
                {/*    new space (semi space, semi space)<br />*/}
                {/*    old space (old pointer space, old data space)<br />*/}
                {/*    Large Object Space<br />*/}
                {/*    Code Space<br />*/}
                {/*    Cell Space<br />*/}
                {/*    Property Space<br />*/}
                {/*    Map Space<br />*/}
                {/*</p>*/}
                <p className="text-gray060 body-xs mt-[10px]">
                    Map Space, Property Cell Space, Cell Space는 종류에 맞는 객체들을 분류해서 가지고있기 편하게 하는 역할을 하는 공간<br />
                    Code Space 실행될 실제 코드가 들어가는 부분이라고 보면 된다. JIT컴파일된 코드가 들어가있으며, 유일하게 실행 가능한 메모리가 있는 영역<br />
                    Large Object Space는 이름 그대로 좀 크기가 큰 객체가 들어가는 부분이다. 이 부분은 가비지컬렉션이 되지 않는다.<br />

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

//                    이를테면 코드에서 이해를 돕기 위한 그룹핑을 위한 괄호까지 명시적으로 분리된 노드로 표현될 필요는 없다.
//                     비슷하게, if-condition-then 구문은 3개의 브랜치를 가진 단일 노드로 표현될 수 있다. (위의 예제 그림에서 condition, assign (if-body), assign (else-body) 을 살펴볼 수 있다.)
//                     이렇게 세세한 정보까진 표현하지 않는다는 것이 Concrete Syntax Trees 와 구분된다.
//                     AST 가 만들어진 이후에는 Contextual Analysis 와 같은 과정을 통해 추가적인 정보가 AST 에 추가된다.
//                     AST 는 프로그램 분석, 프로그램 변환 시스템에서 사용된다.