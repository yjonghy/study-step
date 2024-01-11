import React, {useState} from "react";


const flowStyle = "bg-gray020 py-[6px] px-[8px] rounded-[8px] cursor-pointer text-center h-[52px] flex items-center"
const descBubbleStyle = "w-[200%] absolute top-[calc(100%_+_10px)] border border-gray040 bg-white  p-[8px] rounded-[8px] left-0 flex flex-col justify-center  body-xs"
export default function JavascriptEngine (){

    const [tokenBubble, setTokenBubble] = useState(false)
    const [parserBubble, setParserBubble] = useState(false)

    const changeVisibleBubble = (type : string) => {
        if (type === "token") {
            setTokenBubble(!tokenBubble)
            return
        }
        if (type === "parser") {
            setParserBubble(!parserBubble)
            return;
        }
        setTokenBubble(false)
        setParserBubble(false)
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
                        <p className="body-sm text-gray080">js 소스코드</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div className="relative">
                        <div
                            onClick={() => changeVisibleBubble("token")}
                            className={flowStyle}>
                            <p className="body-sm text-gray080">토크나이저</p>
                        </div>
                        <div className={`${descBubbleStyle} ${tokenBubble ? "block" : "hidden"}`}>
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
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div className="relative">
                        <div
                            onClick={() => changeVisibleBubble("parser")}
                            className={flowStyle}>
                            <p className="body-sm text-gray080">파서</p>
                        </div>
                        <div className={`${descBubbleStyle} ${parserBubble ? "block" : "hidden"}`}>
                            <p className="text-gray080 body-sm">작성한 코드를 최소 단위인 토큰으로 분해하는 프로그램 <br/>분해하는 과정을 토크나이징이라고 한다</p>
                            <p className="text-gray080 body-xs whitespace-pre-line">
                                ex) {`
                                    
                                `}
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("ast")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080">AST<br/>(Abstract Syntax Tree)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("interpreter")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080">Interpreter<br/>(Ignition)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("bytecode")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080">Bytecode</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("compiler")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080">Compiler<br/>(TurboFan)</p>
                    </div>
                    <div className="bg-gray040 w-[10px] h-[1px] self-center"></div>
                    <div
                        onClick={() => changeVisibleBubble("optimized")}
                        className={flowStyle}>
                        <p className="body-sm text-gray080">Optimized Machine Code</p>
                    </div>
                </div>
            </div>
        </article>
    )
}


//(HTML이 parsing될 때 script태그를 만나면 parsing이 일시중지되고 script를 해석, 실행)

// ("JavaScipt Engine" !== "Rendering Engine" = true /
// Rendering Engine 또는 Layout Engine은 HTML과 CSS로 작성된 코드를 컨텐츠로 사용하여 웹 페이지에 “rendering” 하는 역할)