import { atom } from "recoil";


export interface Toast {
    id?: string;
    text: string;
    btnText?: string;
    isBtn?: boolean;
    onClick? : any;
    damping: number,
    mass: number,
    stiffness: number
}
export const HourToast = atom<Toast[]>({
    key : "HourToast",
    default : []
})