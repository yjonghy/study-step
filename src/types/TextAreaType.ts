export interface TextAreaTypeType {
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

    //input area 관련 props
    textarea : {
        id? : string;
        inputMode?: any | undefined | string; //https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/inputmode
        placeholder?: string;
        onChange? : any;
        maxLength?: number;
        onClick?: any;
        onPaste?: any;
        value? : string;
        verify? : boolean;
        textAreaStyle? : string
        onFocus? : any;
        onBlur? : any;
    }
    max : {
        text? : string;
        style? : string;
    }
    verify : {
        verifyText? : string;
        verifyImage? : string;
        verifyTextStyle? : string;
        verifyImageStyle? : string;
    }
}

