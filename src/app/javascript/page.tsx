"use client"
import { useState } from "react";
import Link from "next/link";
import JavaSciptList from "@src/app/javascript/info-list/detail";
import InfoList from "@src/app/javascript/info-list";

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"


const title_ = [
    "javascript 엔진",
    "mouse event",
    "자바스크립트 this",
    "제너레이터/이터러블(지연평가)",
    "이벤트 루프",
    "javascript array method",
    "TypeScript 기초 & 타입 시스템",
    "TypeScript 제네릭",
    "TypeScript 유틸리티 타입",
    "클로저 (Closure)",
    "프로토타입 (Prototype)",
    "Promise / async·await",
    "스코프 & 호이스팅",
    "Proxy & Reflect",
    "WeakMap & WeakRef",
]
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
                    <Link href="/" className="flex items-center gap-[6px] text-gray040 hover:text-gray080 ease-out duration-[150ms] group mb-[12px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="body-sm">스터디 목록</span>
                    </Link>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">JavaScript / TypeScript</p>
                        <p className="body-sm text-gray040">엔진 동작, 이벤트 루프, this, 배열 메서드, 제너레이터, 타입 시스템</p>
                    </div>
                    <div className="w-full grid grid-cols-2 mobile:grid-cols-1 pt-[20px] gap-[8px]">
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