import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import JavascriptEngine from "@src/app/javascript/info-list/detail/JavascriptEngine";

const headerStyle = "body-sm text-gray040"
const contentStyle = "body-sm text-gray080"

export default function  InfoListDetail(props: any){

    return(
        <article className="w-full flex flex-col justify-center items-center ">

            <div
                onClick={() => {props.closeDetail()}}
                className="py-[12px] self-start flex justify-center items-center cursor-pointer bg-hourblue rounded-[8px] h-[45px] w-[120px]">
                <p className="text-white body-sm">뒤로가기</p>
            </div>

            {props.data === "javascript 엔진" && <JavascriptEngine/>}



        </article>
    )
}