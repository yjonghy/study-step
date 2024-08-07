import JavascriptEngine from "@src/app/javascript/info-list/detail/JavascriptEngine";
import MouseEvent from "@src/app/javascript/info-list/detail/MouseEvent";
import JavaScriptThis from "./JavaScriptThis";

export default function  JavaSciptList(props: any){
    return(
        <article className="w-full flex flex-col justify-center items-center ">

            <div
                onClick={() => {props.closeDetail()}}
                className="px-[8px] py-[4px] flex self-end justify-center items-center cursor-pointer bg-hourblue rounded-[4px]">
                <p className="text-white body-sm">뒤로가기</p>
            </div>

            {props.data === "javascript 엔진" && <JavascriptEngine/>}
            {props.data === "mouse event" && <MouseEvent />}
            {props.data === "자바스크립트 this" && <JavaScriptThis />}
        </article>
    )
}