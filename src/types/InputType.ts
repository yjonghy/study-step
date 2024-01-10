export interface InputType {
    //상위 layout style
    parentStyle? : string
    disable? : boolean;
    // label(왼쪽 상단) 관련 props
    label : {
        labelText? : string;
        labelStyle? : string;
        requiredMark? : boolean
        labelImage? : string;
    }
    //오른쪽 관련 상단 props => ex)!Verify email
    guide : {
        onGuideClick? : any
        guideImage? : string;
        guideText? : string;
        guideTextStyle? : string;
        guideImageStyle? : string;
    }
    //input area 관련 props
    input : {
        id? : string;
        type? : string;
        inputMode?: any | undefined | string; //https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/inputmode
        placeholder?: string;
        onChange? : any;
        maxLength?: number;
        onClick?: any;
        onPaste?: any;
        value? : string;
        pattern?: string;
        verify? : boolean;
        onKeyDown? : any;
        onFocus? : any;
        onBlur? : any;
        placeholderStyle? : string;
    }
    //input text 초기화 버튼 관련 props
    reset : {
        onReset? : any
        resetBtnStyle? : string
    }
    //submit 버튼 관련 props
    submit : {
        submitText? : string
        onSubmit? : any
        submitStyle? : string
        submitImage? : string
    }
    //input box 하단 텍스트 ex)유효성 검사 => 비밀번호가 형식에 맞지않습니다
    verify : {
        verifyText? : string;
        verifyImage? : string;
        verifyTextStyle? : string;
        verifyImageStyle? : string;
    }
    children? : any
}
