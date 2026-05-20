"use client"
import { useState } from "react";
import Link from "next/link";
import InfoList from "@src/app/javascript/info-list";
import A11yDetailList from "@src/app/accessibility/info-list/detail";

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "ARIA & 시맨틱 HTML",
    "키보드 내비게이션 & 포커스 관리",
]

export default function AccessibilityPage() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <article className={parentStyle}>
            {showDetail.state ? (
                <A11yDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <Link href="/" className="flex items-center gap-[6px] text-gray040 hover:text-gray080 ease-out duration-[150ms] group mb-[12px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="body-sm">스터디 목록</span>
                    </Link>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">접근성 (a11y)</p>
                        <p className="body-sm text-gray040">ARIA, 시맨틱 HTML, 키보드 내비게이션, 포커스 관리</p>
                    </div>
                    <div className="w-full grid grid-cols-2 mobile:grid-cols-1 pt-[20px] gap-[8px]">
                        {title_.map((value, index) => (
                            <InfoList
                                key={index}
                                index={index + 1}
                                title={value}
                                showMessageDetail={showMessageDetail}
                            />
                        ))}
                    </div>
                </>
            )}
        </article>
    )
}
