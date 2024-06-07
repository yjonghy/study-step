
// Button Theme
import {epilogue} from "concurrently/dist/bin/epilogue";

export const PrimaryButton = "bg-gray090 hover:bg-gray070 cursor-pointer"
export const SecondaryButton = "bg-gray015 hover:bg-gray020 cursor-pointer"
export const DestructiveButton = "bg-red070 hover:bg-red060 cursor-pointer"
export const GhostPrimaryButton = "bg-transparent hover:bg-gray090/[.06] cursor-pointer"
export const GhostDestructiveButton = "bg-white hover:bg-red005 cursor-pointer"

export const BlueButton = "bg-hourblue hover:bg-blue040 cursor-pointer"

// Button Size
export const LargeBtnStyle = "py-[18px]"
export const MediumBtnStyle = "py-[14px]"
export const SmallBtnStyle = "py-[8px]"

export const MotionFast = "ease-out duration-[100ms]"
export const MotionMedium = "ease-out duration-[200ms]"


export interface ButtonType {

    isLoading? : boolean
    loaderSize? : string
    loaderColor? : string

    btnStyle? : string
    onClick? : any
    leftImage? : {
        url? : string
        style? : string
    }
    text : {
        value? : string
        style? : string
    }
    rightImage? : {
        url? : string
        style? : string
    }
}

export interface TextButtonType {

    id? : string
    style? : string
    text? : string
    onClick? : any
}