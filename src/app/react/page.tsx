"use client"
import { useState } from "react";
import InfoList from "@src/app/javascript/info-list";
import ReactDetailList from "@src/app/react/info-list/detail";

const parentStyle = "flex flex-col items-start p-[24px] pb-[48px] bg-white/70 mt-[20px] rounded-[12px] shadow-shadow15"

const title_ = [
    "가상 DOM / Reconciliation",
    "React 렌더링 원리",
    "React Hooks 기초",
    "useMemo / useCallback / React.memo",
    "Context API",
    "Error Boundary",
    "Suspense & Concurrent Mode",
    "React Profiler & 성능 측정",
]

export default function ReactPage() {
    const [showDetail, setShowDetail] = useState({ state: false, data: {} })

    const showMessageDetail = (data: any) => setShowDetail({ state: true, data })
    const closeMessageDetail = () => setShowDetail({ state: false, data: {} })

    return (
        <article className={parentStyle}>
            {showDetail.state ? (
                <ReactDetailList data={showDetail.data} closeDetail={closeMessageDetail} />
            ) : (
                <>
                    <div className="flex flex-col gap-[4px] px-[4px]">
                        <p className="heading-xl text-gray080">React</p>
                        <p className="body-sm text-gray040">가상 DOM, 렌더링 원리, Hooks, 메모이제이션, Context API</p>
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
