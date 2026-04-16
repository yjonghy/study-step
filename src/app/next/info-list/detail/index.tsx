import AppRouter from "./AppRouter"
import RenderingStrategy from "./RenderingStrategy"
import ServerClientComponent from "./ServerClientComponent"
import NextMetadata from "./NextMetadata"
import NextImageFont from "./NextImageFont"

export default function NextDetailList(props: any) {
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
            {props.data === "App Router vs Pages Router"              && <AppRouter />}
            {props.data === "SSR / SSG / ISR"                         && <RenderingStrategy />}
            {props.data === "서버 컴포넌트 vs 클라이언트 컴포넌트"       && <ServerClientComponent />}
            {props.data === "메타데이터 & SEO"                          && <NextMetadata />}
            {props.data === "next/image & next/font"                   && <NextImageFont />}
        </article>
    )
}
