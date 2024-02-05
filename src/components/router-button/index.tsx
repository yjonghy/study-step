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

    return (
        <nav className="flex gap-[10px] bg-white/70 w-full px-[12px] py-[6px] rounded-[8px] flex-wrap">
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
            <Button
                onClick={() => goPage("/computer-science")}
                btnStyle={`${changeBtnActiveStyle("computer-science")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "computer-science", style: `heading-md ${changeBtnTextStyle("computer-science")}`}}/>

            <Button
                onClick={() => goPage("/work-code")}
                btnStyle={`${changeBtnActiveStyle("work-code")} ${SmallBtnStyle} px-[20px]`}
                text={{value: "work-code", style: `heading-md ${changeBtnTextStyle("work-code")}`}}/>
        </nav>
    )
}