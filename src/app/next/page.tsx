"use client"
import { useState } from "react"
import Link from "next/link"
import InfoList from "@src/app/javascript/info-list"
import NextDetailList from "@src/app/next/info-list/detail"

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "App Router vs Pages Router",
    "SSR / SSG / ISR",
    "서버 컴포넌트 vs 클라이언트 컴포넌트",
    "메타데이터 & SEO",
    "next/image & next/font",
    "Middleware",
    "Route Handler",
    "Parallel & Intercepting Routes",
]

export default function NextPage() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <article className={parentStyle}>
            {showDetail.state ? (
                <NextDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <Link href="/" className="flex items-center gap-[6px] text-gray040 hover:text-gray080 ease-out duration-[150ms] group mb-[12px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="body-sm">스터디 목록</span>
                    </Link>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">Next.js</p>
                        <p className="body-sm text-gray040">App Router, SSR / SSG / ISR, 서버 컴포넌트, 메타데이터</p>
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
