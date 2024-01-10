import {InputType} from "@src/types/InputType";
import {useState} from "react";
import {TextAreaTypeType} from "@src/types/TextAreaType";



export default function  Textarea({parentStyle, disable, label, textarea, max, verify }: TextAreaTypeType) {

    const [focusState, setFocusState] = useState(false)

    return (
        <div className={`${parentStyle} flex flex-col`}>
            {/* input box 상단 */}
                {/* input box 위에 text */}
            {label &&
                <div className={`flex justify-between mb-[6px]`}>
                    <label className={disable ? "heading-sm text-gray030" : label.labelStyle}>
                        {label.labelImage && <span><img src={label.labelImage} alt={"label_image"}/></span>}
                        {label.labelText}
                        {label.requiredMark && <span className={"ml-[1px] text-red070"}>*</span>}
                    </label>
                </div>
            }
            {/* input box */}
            {/*setInputStyle()*/}
            <div className={
                `w-full flex rounded-[12px] justify-between gap-[8px]
                ${disable ?
                    `bg-gray010 text-gray030`
                    :
                    `border-[2px] text-gray090 
                     ${!textarea.verify ?
                        `border-red070 bg-white`
                        :
                        `${focusState ?
                            "bg-white border-gray080 hover:bg-white"
                            :
                            "bg-gray015 border-white hover:bg-gray020"}`}`
                }`}>
                <textarea
                    id={textarea.id} //textarea id값
                    inputMode={textarea.inputMode} // 가상키보드 타입
                    placeholder={textarea.placeholder}// 입력 전 text
                    onChange={textarea.onChange} // change event
                    onFocus={() => {
                        textarea.onFocus && textarea.onFocus()
                        setFocusState(true)
                    }}
                    onBlur={() => {
                        textarea.onBlur && textarea.onBlur()
                        setFocusState(false)
                    }}
                    maxLength={textarea.maxLength} // textarea 최대 길이
                    onClick={textarea.onClick} // 클릭 event
                    onPaste={textarea.onPaste} // 붙여넣기 event
                    autoComplete="off" // 자동완성기능 off
                    value={textarea.value} // input value
                    readOnly={disable}
                    className={`resize-none whitespace-pre-wrap
                    w-full ${textarea.textAreaStyle ? textarea.textAreaStyle : "h-[200px]"} outline-none focus:outline-none px-[16px] py-[14px] body-md rounded-[12px] bg-transparent no-scroll rounded-[12px]`} // input box css
                />
            </div>

            {/* 하단 텍스트 ex)유효성 검사 */}
            {max &&
                <div className={`mt-[6px] flex gap-[4px]`}>
                    <div className={max.style}>{max.text}</div>
                </div>}

            {verify &&
                <div className={`mt-[8px] flex gap-[4px]`}>
                    {verify.verifyImage &&
                        <img className={verify.verifyImageStyle} src={verify.verifyImage} alt={"verify_image"}/>}
                    <div className={verify.verifyTextStyle}>{verify.verifyText}</div>
                </div>}
        </div>
    );
};

