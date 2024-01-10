"use client"
import {useEffect, useState} from "react";
import {motion, useSpring} from "framer-motion"

const parentStyle = "w-full fixed flex justify-center z-[100]"
const toastBgStyle =
    "rounded-[12px] shadow-shadow15 w-[480px] mobile:w-[335px] bg-gray090/60 " +
    "flex px-[16px] py-[14px] justify-between"
const textStyle = "body-sm text-white"
const btnText = "cursor-pointer heading-sm text-white shrink-0 self-center"
const transitionStyle = ""

//transition-transform duration-150 translate-y-[140px] mobile:translate-y-[116px]
export default function ToastItem(toast: any) {
    const [isClosing, setIsClosing] = useState(false)
    const [isFadeOut, setIsFadeOut] = useState(false)
    const [isBounce, setIsBounce] = useState(false)

    useEffect(() => {
        const setExistTimeout = setTimeout(() => {
            setIsClosing(true);
            clearTimeout(setExistTimeout);
        }, 0);
        setTimeout(() => setIsFadeOut(true), 3000)
    })

    useEffect(() => {
        let toastElem = window.document.getElementById(`toast-${toast.id}`)
        toastElem.addEventListener("transitionend", catchEndTransition)
        return () => {
            setIsBounce(false)
            toastElem.removeEventListener("transitionend", catchEndTransition)
        }
    }, [])
    const catchEndTransition = () => setIsBounce(true)

    return (
        <>
            <motion.div
                id={`toast-${toast.id}`}
                initial={{ top : "-100px" }}
                animate={{ translateY : "140px" }}
                className={`${parentStyle} ${transitionStyle} mobile:hidden`}
                //whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", damping: 20, mass: 1, stiffness : 300 }}
            >
                <div
                    className={`${toastBgStyle} transition-opacity ${isFadeOut && "duration-150 opacity-0"}
                ${(toast.length >= 2 && toast.length - 1 !== toast.index) && 'hidden'}`}>
                    <div className={textStyle}>
                        {toast.text}
                    </div>
                    <div
                        className={`${btnText} ${toast.isBtn ? "" : "hidden"}`}
                        onClick={() => toast.onClick()}>
                        {toast.btnText}
                    </div>
                </div>

            </motion.div>

            <motion.div
                id={`toast-${toast.id}`}
                initial={{ top : "-100px" }}
                animate={{ translateY : "116px" }}
                className={`${parentStyle} ${transitionStyle} desktop:hidden tablet:hidden`}
                //whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", damping: 20, mass: 1, stiffness : 300 }}
            >
                <div
                    className={`${toastBgStyle} transition-opacity ${isFadeOut && "duration-150 opacity-0"}
                ${(toast.length >= 2 && toast.length - 1 !== toast.index) && 'hidden'}`}>
                    <div className={textStyle}>
                        {toast.text}
                    </div>
                    <div
                        className={`${btnText} ${toast.isBtn ? "" : "hidden"}`}
                        onClick={() => toast.onClick()}>
                        {toast.btnText}
                    </div>
                </div>

            </motion.div>
        </>

    )
}

