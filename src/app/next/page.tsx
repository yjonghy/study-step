"use client"
import {useState} from "react";
import InfoListDetail from "@src/app/javascript/info-list/detail";
import InfoList from "@src/app/javascript/info-list";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px]"


const title_ = ["javascript 엔진", "javascript 엔진 동작 과정", "javascript 엔진 원리"]
export default function Message() {


    const [showDetail, setShowDetail] = useState({ state : false, data : {} })
    const showMessageDetail = (data) => {
        setShowDetail({state: true, data: data})
    }
    const closeMessageDetail = () => {
        setShowDetail({state: false, data : {}})
    }




    return (
        <article className={parentStyle}>

            넥스트 공부
            {showDetail.state ?
                <InfoListDetail data={showDetail.data} closeDetail={closeMessageDetail}/>
                :
                <>
                    <div className="w-full flex flex-col py-[20px] px-[16px] gap-[8px]">
                        <p>문서 난이도 1~5</p>
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