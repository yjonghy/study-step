import MouseEvent from "./MouseEvent";
import JavaScriptThis from "./JavaScriptThis";
import JavaScriptEngine from "./JavaScriptEngine";
import JavaScriptLazyEvaluation from "./JavaScriptLazyEvaluation";
import EventLoop from "./EventLoop";
import JavaSciptArrayMethod from "./JavaScriptArrayMethod";
import TypeScriptBasic from "./TypeScriptBasic";
import TypeScriptGenerics from "./TypeScriptGenerics";
import TypeScriptUtility from "./TypeScriptUtility";

export default function JavaSciptList(props: any) {
    return (
        <article className="w-full flex flex-col justify-center items-center">
            <button
                onClick={() => props.closeDetail()}
                className="flex items-center gap-[6px] text-gray040 hover:text-gray080 cursor-pointer ease-out duration-[150ms] group w-full"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="body-sm">목록으로</span>
            </button>
            <div className="w-full h-[1px] bg-gray015 mt-[16px]" />
            {props.data === "javascript 엔진"                  && <JavaScriptEngine />}
            {props.data === "mouse event"                      && <MouseEvent />}
            {props.data === "자바스크립트 this"                 && <JavaScriptThis />}
            {props.data === "제너레이터/이터러블(지연평가)"       && <JavaScriptLazyEvaluation />}
            {props.data === "이벤트 루프"                       && <EventLoop />}
            {props.data === "javascript array method"          && <JavaSciptArrayMethod />}
            {props.data === "TypeScript 기초 & 타입 시스템"     && <TypeScriptBasic />}
            {props.data === "TypeScript 제네릭"                 && <TypeScriptGenerics />}
            {props.data === "TypeScript 유틸리티 타입"           && <TypeScriptUtility />}
        </article>
    )
}