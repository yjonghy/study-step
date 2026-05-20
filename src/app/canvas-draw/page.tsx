"use client"
import { useRef, useState, useEffect, useCallback } from "react"

type Tool = "pen" | "line" | "rect" | "circle" | "eraser"

const COLORS = ["#1e1e1e", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff"]
const SIZES  = [2, 5, 10, 20]

export default function CanvasDrawPage() {
    const canvasRef  = useRef<HTMLCanvasElement>(null)
    const previewRef = useRef<HTMLCanvasElement>(null)

    const [tool, setTool]     = useState<Tool>("pen")
    const [color, setColor]   = useState("#1e1e1e")
    const [size, setSize]     = useState(5)
    const [drawing, setDrawing] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })

    const saved = useRef<ImageData | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        if ("touches" in e) {
            const t = e.touches[0]
            return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY }
        }
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
    }

    const onStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pos = getPos(e, canvas)
        setDrawing(true)
        setStartPos(pos)

        if (tool === "pen" || tool === "eraser") {
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        } else {
            saved.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
        }
    }, [tool])

    const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!drawing) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pos = getPos(e, canvas)

        if (tool === "pen") {
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.strokeStyle = color
            ctx.lineWidth = size
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        } else if (tool === "eraser") {
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = size * 3
            ctx.lineTo(pos.x, pos.y)
            ctx.stroke()
        } else if (saved.current) {
            ctx.putImageData(saved.current, 0, 0)
            ctx.strokeStyle = color
            ctx.lineWidth = size
            ctx.beginPath()
            if (tool === "line") {
                ctx.moveTo(startPos.x, startPos.y)
                ctx.lineTo(pos.x, pos.y)
                ctx.stroke()
            } else if (tool === "rect") {
                ctx.strokeRect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y)
            } else if (tool === "circle") {
                const rx = Math.abs(pos.x - startPos.x) / 2
                const ry = Math.abs(pos.y - startPos.y) / 2
                const cx = startPos.x + (pos.x - startPos.x) / 2
                const cy = startPos.y + (pos.y - startPos.y) / 2
                ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
                ctx.stroke()
            }
        }
    }, [drawing, tool, color, size, startPos])

    const onEnd = useCallback(() => {
        setDrawing(false)
        saved.current = null
    }, [])

    const clear = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const download = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement("a")
        link.download = "canvas-drawing.png"
        link.href = canvas.toDataURL()
        link.click()
    }

    const TOOLS: { id: Tool; label: string; icon: string }[] = [
        { id: "pen",    label: "펜",    icon: "✏️" },
        { id: "line",   label: "직선",  icon: "╱" },
        { id: "rect",   label: "사각형", icon: "□" },
        { id: "circle", label: "원",    icon: "○" },
        { id: "eraser", label: "지우개", icon: "◻" },
    ]

    return (
        <main className="flex flex-col gap-[20px] mt-[20px]">
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[28px] py-[24px] border-l-[4px] border-purple040">
                <div className="flex items-center gap-[8px] mb-[8px]">
                    <span className="body-xs font-bold px-[7px] py-[2px] rounded-full bg-purple005 text-purple040">Demo</span>
                    <span className="body-xs text-gray040">Canvas API</span>
                </div>
                <p className="heading-xl text-gray080">Canvas 드로잉</p>
                <p className="body-sm text-gray050 mt-[6px]">HTML5 Canvas API로 구현한 인터랙티브 드로잉 도구. 펜·도형·지우개를 선택해 자유롭게 그릴 수 있습니다.</p>
            </div>

            <div className="bg-white/70 rounded-[12px] shadow-shadow15 p-[20px] flex flex-col gap-[16px]">
                {/* 툴바 */}
                <div className="flex flex-wrap items-center gap-[12px]">
                    {/* 도구 */}
                    <div className="flex gap-[4px] bg-gray010 rounded-[8px] p-[4px]">
                        {TOOLS.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTool(t.id)}
                                title={t.label}
                                className={`w-[36px] h-[36px] rounded-[6px] body-sm flex items-center justify-center cursor-pointer transition-colors duration-100
                                    ${tool === t.id ? "bg-gray080 text-white" : "hover:bg-gray020 text-gray060"}`}
                            >
                                {t.icon}
                            </button>
                        ))}
                    </div>

                    {/* 색상 */}
                    <div className="flex gap-[4px] flex-wrap">
                        {COLORS.map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-[24px] h-[24px] rounded-full cursor-pointer transition-transform duration-100
                                    ${color === c ? "scale-125 ring-2 ring-gray060 ring-offset-1" : "hover:scale-110"}`}
                                style={{ backgroundColor: c, border: c === "#ffffff" ? "1px solid #e5e7eb" : "none" }}
                            />
                        ))}
                    </div>

                    {/* 크기 */}
                    <div className="flex gap-[4px]">
                        {SIZES.map(s => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`w-[32px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors duration-100
                                    ${size === s ? "bg-gray080" : "bg-gray010 hover:bg-gray020"}`}
                            >
                                <div
                                    className={`rounded-full ${size === s ? "bg-white" : "bg-gray060"}`}
                                    style={{ width: Math.min(s * 1.5, 20), height: Math.min(s * 1.5, 20) }}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-[6px] ml-auto">
                        <button
                            onClick={clear}
                            className="body-xs px-[12px] py-[7px] rounded-[6px] bg-gray010 hover:bg-gray020 text-gray060 cursor-pointer transition-colors duration-100"
                        >
                            전체 지우기
                        </button>
                        <button
                            onClick={download}
                            className="body-xs px-[12px] py-[7px] rounded-[6px] bg-blue030 hover:bg-blue040 text-white cursor-pointer transition-colors duration-100"
                        >
                            PNG 저장
                        </button>
                    </div>
                </div>

                {/* 현재 설정 표시 */}
                <div className="flex items-center gap-[8px]">
                    <div className="w-[16px] h-[16px] rounded-full border border-gray020" style={{ backgroundColor: color }} />
                    <p className="body-xs text-gray040">
                        {TOOLS.find(t => t.id === tool)?.label} · 크기 {tool === "eraser" ? size * 3 : size}px
                    </p>
                </div>

                {/* 캔버스 */}
                <div className="border border-gray020 rounded-[8px] overflow-hidden" style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}>
                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={520}
                        className="w-full h-auto block touch-none"
                        onMouseDown={onStart}
                        onMouseMove={onMove}
                        onMouseUp={onEnd}
                        onMouseLeave={onEnd}
                        onTouchStart={onStart}
                        onTouchMove={onMove}
                        onTouchEnd={onEnd}
                    />
                </div>

                <p className="body-xs text-gray035">모바일에서는 터치로도 그릴 수 있습니다. 그린 결과물은 PNG로 저장 가능합니다.</p>
            </div>

            {/* 핵심 코드 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">Canvas API 핵심 패턴</p>
                <div className="flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">자유 그리기 (pen)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", (e) => {
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">도형 그리기 — ImageData로 이전 상태 저장</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// mousedown 시 현재 상태 저장
const saved = ctx.getImageData(0, 0, canvas.width, canvas.height);

// mousemove 시마다 저장된 상태로 복원 후 도형 재그리기
ctx.putImageData(saved, 0, 0);
ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
// → 드래그하는 동안 사각형이 실시간으로 리사이즈되어 보임`}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
