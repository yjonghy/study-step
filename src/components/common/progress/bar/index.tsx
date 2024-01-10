import {ProgressType} from "@src/types/ProgressType";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {headerHeight} from "@src/atom/layout";
import {useMediaQuery} from "react-responsive";

export default function ProgressBar({isAnimation, currentWidth}: ProgressType) {

    const globalHeight = useRecoilValue(headerHeight)

    //w-[100vw]
    return (isAnimation ?
            <div className="fixed w-screen z-50" style={{ top : globalHeight }}>
                <div className={`transition duration-150 absolute w-full bg-gray090 h-[2px] ${currentWidth}`}></div>
            </div>: <></>)
}