import React from "react"

export default function InfoList(props: any) {
    return (
        <article
            onClick={() => props.showMessageDetail(props.title)}
            className="w-full group cursor-pointer"
        >
            <div className={`
                w-full bg-white rounded-[14px] px-[20px] py-[18px]
                flex items-center gap-[14px]
                border border-gray020
                shadow-shadow15
                hover:shadow-shadow16_15 hover:-translate-y-[2px]
                ease-out duration-[150ms] transition-all
            `}>
                {/* 번호 배지 */}
                <div className="w-[34px] h-[34px] min-w-[34px] rounded-[10px] bg-gray015
                                flex items-center justify-center
                                group-hover:bg-gray090 ease-out duration-[150ms]">
                    <span className="heading-xs text-gray050 group-hover:text-white ease-out duration-[150ms]">
                        {props.index}
                    </span>
                </div>

                {/* 제목 */}
                <p className="heading-sm text-gray080 flex-1 leading-snug">{props.title}</p>

                {/* 화살표 */}
                <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="text-gray030 group-hover:text-gray080 group-hover:translate-x-[2px] ease-out duration-[150ms] flex-shrink-0"
                >
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </article>
    )
}
