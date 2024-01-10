import {SystemIconType} from "@src/types/SystemIconType";
import process from "process";

export const icDir = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL + "web/icon/system/"

export default function SystemIcon({src, className, onClick} : SystemIconType) {
    return (<img className={className} src={icDir+src} alt={src} onClick={onClick}/>)
}