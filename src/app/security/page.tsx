"use client"
import { useState } from "react"
import InfoList from "@src/app/javascript/info-list"
import SecurityDetailList from "@src/app/security/info-list/detail"

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "CORS",
    "XSS & CSRF",
    "CSP (Content Security Policy)",
    "인증 전략 (Session / JWT / OAuth)",
]

export default function SecurityPage() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <article className={parentStyle}>
            {showDetail.state ? (
                <SecurityDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">보안</p>
                        <p className="body-sm text-gray040">CORS, XSS & CSRF, CSP, 인증 전략</p>
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
