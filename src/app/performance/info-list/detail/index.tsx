import CoreWebVitals from "./CoreWebVitals"
import RenderOptimization from "./RenderOptimization"
import ImageOptimization from "./ImageOptimization"
import BundleOptimization from "./BundleOptimization"
import Monitoring from "./Monitoring"

export default function PerformanceDetailList(props: any) {
    return (
        <article className="w-full flex flex-col justify-center items-center">
            <button
                onClick={() => props.closeDetail()}
                className="flex items-center gap-[6px] text-gray040 hover:text-gray080 cursor-pointer ease-out duration-[150ms] group w-full"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="body-sm">목록으로</span>
            </button>
            <div className="w-full h-[1px] bg-gray015 mt-[16px]" />
            {props.data === "Core Web Vitals"              && <CoreWebVitals />}
            {props.data === "렌더링 최적화"                 && <RenderOptimization />}
            {props.data === "이미지 최적화"                 && <ImageOptimization />}
            {props.data === "번들 최적화"                   && <BundleOptimization />}
            {props.data === "모니터링 (Datadog / Sentry)"   && <Monitoring />}
        </article>
    )
}
