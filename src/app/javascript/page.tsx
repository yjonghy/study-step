"use client"
import {useState} from "react";
import JavaSciptList from "@src/app/javascript/info-list/detail";
import InfoList from "@src/app/javascript/info-list";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"


const title_ = ["javascript 엔진", "mouse event", "자바스크립트 this", "제너레이터/이터러블(지연평가)", "이벤트 루프"]
export default function JavaScript() {


    const [showDetail, setShowDetail] = useState({state: false, data: {}})
    const showMessageDetail = (data : any) => {
        setShowDetail({state: true, data: data})
    }
    const closeMessageDetail = () => {
        setShowDetail({state: false, data: {}})
    }


    return (
        <article className={parentStyle}>
            {showDetail.state ?
                <JavaSciptList data={showDetail.data} closeDetail={closeMessageDetail}/>
                :
                <>
                    <div className="w-full grid grid-cols-2 py-[20px] px-[16px] gap-[8px]">
                        {title_.map((value, index) => (
                            <InfoList
                                key={index}
                                index={index + 1}
                                title={value}
                                showMessageDetail={showMessageDetail}/>
                        ))}
                    </div>
                </>
            }
        </article>
    )

}