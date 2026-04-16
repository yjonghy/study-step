"use client"
import { useState } from "react"
import InfoList from "@src/app/javascript/info-list"
import HtmlCssDetailList from "@src/app/html-css/info-list/detail"

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "브라우저 렌더링 파이프라인",
    "CSS 박스 모델 & 포지셔닝",
    "Flexbox & Grid 레이아웃",
    "CSS 선택자 & 명시도",
    "시멘틱 HTML & 접근성",
    "반응형 웹 & 미디어 쿼리",
]

export default function HtmlCss() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <section className={parentStyle}>
            {showDetail.state ? (
                <HtmlCssDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">HTML / CSS</p>
                        <p className="body-sm text-gray040">마크업 구조, 레이아웃, 선택자, 박스 모델, 브라우저 렌더링</p>
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
