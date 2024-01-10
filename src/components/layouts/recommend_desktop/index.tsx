import React from "react";
import {icDir} from "@src/components/common/system-icon";

export default function RecommendDesktopLayout () {

    return (<section className="w-full h-[calc(100vh_-_54px)] flex flex-col justify-center items-center desktop:hidden tablet:hidden gap-[8px]">
        <img className={"w-[24px] h-[24px]"} src={icDir+"ic-sorry.svg"} alt={"sorry"}/>
        <div className="heading-xl text-gray090">
            Sorry
        </div>
        <div className="">
            <p className="body-lg text-gray090 text-center">If you are unable to view this page, try using a larger browser size.</p>
        </div>
    </section>)
}