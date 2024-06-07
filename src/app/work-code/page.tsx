"use client"
import React, {useState} from "react";
import {useToast} from "@src/hook/useToast";
import Input from "@src/components/common/input";
import Button from "@src/components/common/button";
import {LargeBtnStyle, MotionFast, PrimaryButton, SecondaryButton} from "@src/types/ButtonType";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"
const widthStyle = "w-full desktop:w-[480px]"

export default function WorkCode() {

    const {openToast} = useToast()
    const [toastName, setToastName] = useState({ value : "" , verify : true, verifyText : "" })

    const changeToastName = (value) => {
        setToastName({ value: value.target.value, verify: true, verifyText: "" })
    }

    const setOpenToast = () => {
        if (toastName.value === "") {
            setToastName({ value: "", verify: false, verifyText: "토스트에 들어갈 메시지를 넣어주세요" })
            return
        }

        openToast({
            id: String(new Date().getTime()),
            text: toastName.value,
            btnText: "",
            isBtn: false,
            onClick: null
        })
    }


    return(
        <article className={parentStyle}>

            <p className="text-gray060 heading-xl">각 컴포넌트</p>
            <div className="w-full flex flex-col gap-[10px] justify-center items-center">
                <p className="text-gray080 body-md">framer 사용</p>
                <Input
                    parentStyle={`mt-[24px] ${widthStyle}`}
                    label={{
                        labelText: "토스트 만들기",
                        labelStyle: "heading-sm text-gray090",
                    }}
                    input={{
                        id: "make-toast",
                        type: "text",
                        inputMode: "text",
                        placeholder: "",
                        onChange: changeToastName,
                        onClick: null,
                        value: toastName.value,
                        pattern: "",
                        verify: toastName.verify
                    }}
                    {...(!toastName.verify && {
                        //@유효성(빈값) check
                        verify: {
                            verifyText: toastName.verifyText,
                            verifyTextStyle: "body-sm text-red070",
                            verifyImageStyle : "w-[16px] h-[16px] self-center"
                        }
                    })}
                />
                <Button
                    onClick={() => setOpenToast()}
                    btnStyle={`${PrimaryButton} ${LargeBtnStyle} ${MotionFast} max-w-[200px] h-full w-full`}
                    text={{ value : "생성", style : "heading-md text-white" }}/>
            </div>
        </article>
    )
}