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
            <p className="text-gray060 heading-sm">자바스크립트 엔진인란</p>
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

            <div className="w-full h-full mt-[20px]">
                <p className="text-gray060 heading-xs">엔진의 동작 과정 (v8기준)</p>

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
                        <div className="bg-gray020 p-[10px] rounded-[8px] ">
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

                        <div className="bg-gray020 p-[10px] rounded-[8px] self-center">
                            <p className="body-xs text-gray080 text-center ">
                                토큰
                            </p>
                        </div>

                        <div className="flex flex-col gap-[4px] items-center justify-center">
                            <div className="w-[10px] h-[1px] bg-gray080"></div>
                        </div>

                        <div className="bg-gray020 p-[10px] rounded-[8px] self-center">
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


            </div>
        </article>
    )
}


//(HTML이 parsing될 때 script태그를 만나면 parsing이 일시중지되고 script를 해석, 실행)

// ("JavaScipt Engine" !== "Rendering Engine" = true /
// Rendering Engine 또는 Layout Engine은 HTML과 CSS로 작성된 코드를 컨텐츠로 사용하여 웹 페이지에 “rendering” 하는 역할)

//                    이를테면 코드에서 이해를 돕기 위한 그룹핑을 위한 괄호까지 명시적으로 분리된 노드로 표현될 필요는 없다.
//                     비슷하게, if-condition-then 구문은 3개의 브랜치를 가진 단일 노드로 표현될 수 있다. (위의 예제 그림에서 condition, assign (if-body), assign (else-body) 을 살펴볼 수 있다.)
//                     이렇게 세세한 정보까진 표현하지 않는다는 것이 Concrete Syntax Trees 와 구분된다.
//                     AST 가 만들어진 이후에는 Contextual Analysis 와 같은 과정을 통해 추가적인 정보가 AST 에 추가된다.
//                     AST 는 프로그램 분석, 프로그램 변환 시스템에서 사용된다.