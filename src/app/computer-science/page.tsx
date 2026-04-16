"use client"
import { useState } from "react"
import InfoList from "@src/app/javascript/info-list"
import CsDetailList from "@src/app/computer-science/info-list/detail"

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "HTTP 버전 특징",
    "OSI 7계층",
    "TCP & 3-way Handshake",
    "브라우저 저장소",
    "HTTPS & TLS",
    "CORS & 웹 보안",
]

export default function Cs() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <section className={parentStyle}>
            {showDetail.state ? (
                <CsDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">Computer Science</p>
                        <p className="body-sm text-gray040">HTTP 버전, OSI 7계층, TCP, 브라우저 저장소, HTTPS, CORS</p>
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
        </section>
    )
}
