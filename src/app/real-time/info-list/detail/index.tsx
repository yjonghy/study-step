import WebSocket from "./WebSocket"
import WebWorker from "./WebWorker"
import ServerSentEvents from "./ServerSentEvents"
import MediaStream from "./MediaStream"

export default function RealTimeDetailList(props: any) {
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
            {props.data === "WebSocket"                       && <WebSocket />}
            {props.data === "Web Worker"                     && <WebWorker />}
            {props.data === "Server-Sent Events (SSE)"       && <ServerSentEvents />}
            {props.data === "MediaStream API & VAD"          && <MediaStream />}
        </article>
    )
}
