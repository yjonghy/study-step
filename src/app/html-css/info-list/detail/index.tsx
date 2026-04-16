import BrowserRendering from "./BrowserRendering"
import BoxModelPositioning from "./BoxModelPositioning"
import FlexboxGrid from "./FlexboxGrid"
import CssSelector from "./CssSelector"
import SemanticHtml from "./SemanticHtml"
import ResponsiveWeb from "./ResponsiveWeb"

export default function HtmlCssDetailList(props: any) {
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
            {props.data === "브라우저 렌더링 파이프라인"  && <BrowserRendering />}
            {props.data === "CSS 박스 모델 & 포지셔닝"    && <BoxModelPositioning />}
            {props.data === "Flexbox & Grid 레이아웃"      && <FlexboxGrid />}
            {props.data === "CSS 선택자 & 명시도"          && <CssSelector />}
            {props.data === "시멘틱 HTML & 접근성"         && <SemanticHtml />}
            {props.data === "반응형 웹 & 미디어 쿼리"      && <ResponsiveWeb />}
        </article>
    )
}
