import React, {useEffect} from "react";
import { useRouter, usePathname } from 'next/navigation';
import Button from "@src/components/common/button";
import {
    GhostPrimaryButton,
    LargeBtnStyle,
    MediumBtnStyle,
    PrimaryButton,
    SecondaryButton,
    SmallBtnStyle
} from "@src/types/ButtonType";

const btnDefaultStyle = "flex justify-center items-center cursor-pointer py-[4px] px-[8px] rounded-[8px]"
const activeBtnStyle = ""
const noneActiveBtnStyle = ""
export default function RouterButton() {

    const router = useRouter()
    const pathName = usePathname()


    const goPage = (value : string) => { router.push(value) }

    const changeBtnActiveStyle = (value : string) => {
        return pathName.includes(value) ? PrimaryButton : GhostPrimaryButton
    }

    const changeBtnTextStyle = (value : string) => {
        return pathName.includes(value) ? "text-white" : "text-gray080"
    }

    useEffect(() => {
        console.log(pathName)
    }, [pathName])


    return (
        <nav className="flex gap-[10px]">
            <Button
                onClick={() => goPage("/html-css")}
                btnStyle={`${changeBtnActiveStyle("html-css")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "html/css", style: `heading-md ${changeBtnTextStyle("html-css")}`}}/>
            <Button
                onClick={() => goPage("/javascript")}
                btnStyle={`${changeBtnActiveStyle("javascript")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "javascript/typescript", style: `heading-md ${changeBtnTextStyle("javascript")}`}}/>
            <Button
                onClick={() => goPage("/react")}
                btnStyle={`${changeBtnActiveStyle("react")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "React", style: `heading-md ${changeBtnTextStyle("react")}`}}/>
            <Button
                onClick={() => goPage("/next")}
                btnStyle={`${changeBtnActiveStyle("next")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "Next", style: `heading-md ${changeBtnTextStyle("next")}`}}/>
        </nav>
    )
}