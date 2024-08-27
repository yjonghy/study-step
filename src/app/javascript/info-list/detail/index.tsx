import MouseEvent from "./MouseEvent";
import JavaScriptThis from "./JavaScriptThis";
import JavaScriptEngine from "./JavaScriptEngine";
import JavaScriptLazyEvaluation from "./JavaScriptLazyEvaluation";
import EventLoop from "./EventLoop";

export default function  JavaSciptList(props: any){
    return(
        <article className="w-full flex flex-col justify-center items-center ">
            <div
                onClick={() => {props.closeDetail()}}
                className="px-[8px] py-[4px] flex self-end justify-center items-center cursor-pointer bg-hourblue rounded-[4px]">
                <p className="text-white body-sm">뒤로가기</p>
            </div>

            {props.data === "javascript 엔진" && <JavaScriptEngine/>}
            {props.data === "mouse event" && <MouseEvent />}
            {props.data === "자바스크립트 this" && <JavaScriptThis />}
            {props.data === "제너레이터/이터러블(지연평가)" && <JavaScriptLazyEvaluation />}
            {props.data === "이벤트 루프" && <EventLoop />}
        </article>
    )
}