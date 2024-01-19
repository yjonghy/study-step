"use client"
import {useState} from "react";
import InfoListDetail from "@src/app/javascript/info-list/detail";
import InfoList from "@src/app/javascript/info-list";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"


const title_ = ["javascript 엔진", "adsasd", 'ADsdas']
export default function Message() {


    const [showDetail, setShowDetail] = useState({state: false, data: {}})
    const showMessageDetail = (data) => {
        setShowDetail({state: true, data: data})
    }
    const closeMessageDetail = () => {
        setShowDetail({state: false, data: {}})
    }


    return (
        <article className={parentStyle}>

        </article>
    )

}