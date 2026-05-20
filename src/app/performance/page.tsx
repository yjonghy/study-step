"use client"
import { useState } from "react"
import Link from "next/link"
import InfoList from "@src/app/javascript/info-list"
import PerformanceDetailList from "@src/app/performance/info-list/detail"

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "Core Web Vitals",
    "렌더링 최적화",
    "이미지 최적화",
    "번들 최적화",
    "모니터링 (Datadog / Sentry)",
    "크리티컬 렌더링 패스 (CRP)",
    "SEO 최적화",
]

export default function Performance() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <article className={parentStyle}>
            {showDetail.state ? (
                <PerformanceDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <Link href="/" className="flex items-center gap-[6px] text-gray040 hover:text-gray080 ease-out duration-[150ms] group mb-[12px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="body-sm">스터디 목록</span>
                    </Link>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">성능 최적화</p>
                        <p className="body-sm text-gray040">Core Web Vitals, 렌더링 최적화, SEO, 이미지 최적화</p>
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
