import { atom } from "recoil";


export interface Toast {
    id?: string;
    text: string;
    btnText?: string;
    isBtn?: boolean;
    onClick? : any
}
export const HourToast = atom<Toast[]>({
    key : "HourToast",
    default : []
})