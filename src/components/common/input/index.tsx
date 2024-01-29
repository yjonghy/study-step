import {InputType} from "@src/types/InputType";
import {useState, useRef} from "react";
import {MotionFast} from "@src/types/ButtonType";


export default function Input({
                                  parentStyle, disable,
                                  label, guide, input,
                                  reset, submit, verify, children,
                              }: InputType) {

    const [focusState, setFocusState] = useState(false)
    const [indent, setIndent] = useState(0)

    const inputRef = useRef(null)
    const hiddenSpanRef = useRef(null)

    return (
        <div className={`${parentStyle} flex flex-col`}>
            {/* input box 상단 */}
            <div className={`flex justify-between`}>
                {/* input box 위에 text */}
                {label &&
                    <label className={disable ? "heading-sm text-gray030" : label.labelStyle}>
                        {label.labelImage && <span><img src={label.labelImage} alt={"label_image"}/></span>}
                        {label.labelText}
                        {label.requiredMark &&
                            <span className={`ml-[2px] ${disable ? "text-red020" : "text-red070"}`}>*</span>}
                    </label>}
                {/*오른쪽 관련 상단 props => ex)!Verify email 피그마 참조 */}
                {guide &&
                    <div onClick={guide.onGuideClick}>
                        <img src={guide.guideImage} alt={"인증 버튼"} className={guide.guideImageStyle}/>
                        <div className={guide.guideTextStyle}>{guide.guideText}</div>
                    </div>}
            </div>
            {/*relative*/}
            <div
                className={`w-full mt-[6px] rounded-[12px] border-[2px] flex justify-between gap-[8px] relative
                ${MotionFast}
                ${disable ?
                    `bg-gray010 text-gray030 border-gray010`
                    :
                    `text-gray090 
                     ${!input.verify ?
                        `border-red070 bg-white`
                        :
                        `${focusState ?
                            "bg-white border-gray080 hover:bg-white"
                            :
                            "bg-gray015 border-white hover:bg-gray020"}`}`
                }`}>

                <input
                    ref={inputRef}
                    id={input.id} //input id값
                    type={input.type} // 입력값 타입
                    inputMode={input.inputMode} // 가상키보드 타입
                    placeholder={input.placeholder}// 입력 전 text
                    onChange={(e) => {
                        input.onChange(e)
                    }} // change event
                    onFocus={(event) => {
                        setFocusState(true)
                        event.target.scrollLeft = event.target.scrollWidth
                        input.onFocus && input.onFocus()
                    }}
                    onBlur={() => {
                        setFocusState(false)
                        input.onBlur && input.onBlur()
                    }}
                    onKeyDown={input.onKeyDown && input.onKeyDown}
                    maxLength={input.maxLength} // input 최대 길이
                    onClick={input.onClick} // 클릭 event
                    onPaste={input.onPaste} // 붙여넣기 event
                    autoComplete="off" // 자동완성기능 off
                    value={input.value} // input value
                    pattern={input.pattern}
                    readOnly={disable}

                    className={`w-full mx-[16px]
                    box-content ${input.placeholderStyle ? input.placeholderStyle : `placeholder-gray030`} py-[14px]  rounded-[12px]
                    outline-none whitespace-nowrap focus:outline-none body-md bg-transparent`} // input box css
                />


                {/*py-[14px] pl-[16px] rounded-[12px] */}
                <span ref={hiddenSpanRef} className="h-0 overflow-hidden whitespace-pre absolute pl-[16px] body-md">{inputRef.current !== null ? inputRef.current.value : ""}</span>
                {/*${(!reset && !submit) && "pr-[16px]"}*/}
                {/*<div className="bg-transparent h-full w-[14px]"></div>*/}

                {/* input box 안쪽에 버튼들  */}
                {(reset || submit) &&
                    <div className={`flex items-center p-[9px] mr-[8px]`}>
                        {/* input box 옆 초기화 버튼  */}
                        {reset &&
                            <div className={reset.resetBtnStyle} onClick={reset.onReset}>
                                <img src={"닫기 버튼"} alt={"닫기 버튼"}/>
                            </div>}
                        {/* input box 옆 버튼 (번호 인증, 서버 인증, 비밀번호 노출) */}
                        {submit &&
                            <div className={submit.submitStyle} onClick={submit.onSubmit}>
                                {submit.submitImage && <img src={submit.submitImage} alt={"인증 버튼"}/>}
                                <div>{submit.submitText}</div>
                            </div>}
                    </div>}
            </div>


            {/* 하단 텍스트 ex)유효성 검사 */}
            {verify &&
                <div className={`mt-[6px] flex gap-[4px]`}>
                    {verify.verifyImage &&
                        <img className={verify.verifyImageStyle} src={verify.verifyImage} alt={"verify_image"}/>}
                    <div className={verify.verifyTextStyle}>{verify.verifyText}</div>
                </div>}
            {children && children}
        </div>
    );
};

