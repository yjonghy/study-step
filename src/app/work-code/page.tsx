"use client"
import React, { useState } from "react";
import { useToast } from "@src/hook/useToast";
import Input from "@src/components/common/input";
import Button from "@src/components/common/button";
import { LargeBtnStyle, MotionFast, PrimaryButton, SecondaryButton, SmallBtnStyle } from "@src/types/ButtonType";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"
const widthStyle = "w-full desktop:w-[480px]"

export default function WorkCode() {

    const { openToast } = useToast()
    const [toastName, setToastName] = useState({ value: "", verify: true, verifyText: "" })
    const [toastDamping, setToastDamping] = useState(20) // 반대 방향의 세기
    const [toastMass, setToastMass] = useState(1) // 엘리멘트의 질량
    const [toastStiffness, setToastStiffness] = useState(300) // 스프링의 탄성도

    const changeToastName = (value: any) => {
        setToastName({ value: value.target.value, verify: true, verifyText: "" })
    }

    const changeToastDamping = (value: any) => {
        if (Number.isNaN(value.target.value)) return
        setToastDamping(Number(value.target.value))
    }

    const changeToastMass = (value: any) => {
        if (Number.isNaN(value.target.value)) return
        setToastMass(Number(value.target.value))
    }
    const changeToastStiffness = (value: any) => {
        if (Number.isNaN(value.target.value)) return
        setToastStiffness(Number(value.target.value))
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
            onClick: null,
            damping: toastDamping,
            mass: toastMass,
            stiffness: toastStiffness
        })
    }





    return (
        <section className={parentStyle}>

            <h1 className="heading-xl">프로젝트 내 사용했던 컴포넌트들</h1>

            <div className="w-full h-[1px] bg-gray080 my-[30px]"> </div>


            <article className="w-full flex">
                <div className="flex flex-col">
                    <p>framer 활용한 toast ui - spring animation</p>
                    <div className="mt-[8px] flex flex-col gap-[4px]">
                        <Input
                            parentStyle={`w-[200px]`}
                            label={{
                                labelText: "toast damping",
                                labelStyle: "body-sm text-gray090",
                            }}
                            input={{
                                id: "toast-damping",
                                type: "text",
                                inputMode: "text",
                                placeholder: "toast damping",
                                onChange: changeToastDamping,
                                onClick: null,
                                value: String(toastDamping),
                                pattern: "",
                                verify: true
                            }}
                        />
                        <Input
                            parentStyle={`w-[200px]`}
                            label={{
                                labelText: "toast mass",
                                labelStyle: "body-sm text-gray090",
                            }}
                            input={{
                                id: "toast-mass",
                                type: "text",
                                inputMode: "text",
                                placeholder: "toast mass",
                                onChange: changeToastMass,
                                onClick: null,
                                value: String(toastMass),
                                pattern: "",
                                verify: true
                            }}
                        />
                        <Input
                            parentStyle={`w-[200px]`}
                            label={{
                                labelText: "toast stiffness",
                                labelStyle: "body-sm text-gray090",
                            }}
                            input={{
                                id: "toast-stiffness",
                                type: "text",
                                inputMode: "text",
                                placeholder: "toast stiffness",
                                onChange: changeToastStiffness,
                                onClick: null,
                                value: String(toastStiffness),
                                pattern: "",
                                verify: true
                            }}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[10px] justify-center items-center">
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
                                verifyImageStyle: "w-[16px] h-[16px] self-center"
                            }
                        })}
                    />


                    <Button
                        onClick={() => setOpenToast()}
                        btnStyle={`${PrimaryButton} ${SmallBtnStyle} ${MotionFast} w-[120px]`}
                        text={{ value: "생성", style: "body-md text-white" }} />
                </div>
            </article>

            <div className="w-full h-[1px] bg-gray080 my-[30px]"> </div>
        </section>
    )
}
