"use client"

import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react"

type Seat = {
    id: string
    name: string
    x: number
    y: number
    width: number
    height: number
    color: string
}

type Entrance = {
    id: string
    label: string
    x: number
    y: number
    width: number
    height: number
}

type SavedLayout = {
    seats: Seat[]
    entrance: Entrance
}

type SelectedItem =
    | {
          type: "seat"
          id: string
      }
    | {
          type: "entrance"
          id: string
      }

type DragState = SelectedItem & {
    offsetX: number
    offsetY: number
}

const BOARD_WIDTH = 1120
const BOARD_HEIGHT = 680
const GRID_SIZE = 20

const seatColors = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0f766e"]

const defaultSeats: Seat[] = [
    { id: "seat-1", name: "김민수", x: 80, y: 90, width: 118, height: 72, color: "#2563eb" },
    { id: "seat-2", name: "이지은", x: 230, y: 90, width: 118, height: 72, color: "#16a34a" },
    { id: "seat-3", name: "박서준", x: 380, y: 90, width: 118, height: 72, color: "#f59e0b" },
    { id: "seat-4", name: "최유진", x: 80, y: 220, width: 118, height: 72, color: "#7c3aed" },
]

const defaultEntrance: Entrance = {
    id: "entrance-main",
    label: "출입구",
    x: 20,
    y: 20,
    width: 92,
    height: 42,
}

export default function SeatLayoutPage() {
    const boardRef = useRef<HTMLDivElement | null>(null)
    const [seats, setSeats] = useState<Seat[]>(defaultSeats)
    const [entrance, setEntrance] = useState<Entrance>(defaultEntrance)
    const [selectedItem, setSelectedItem] = useState<SelectedItem>({
        type: "seat",
        id: defaultSeats[0].id,
    })
    const [dragState, setDragState] = useState<DragState | null>(null)
    const [snapToGrid, setSnapToGrid] = useState(true)
    const [savedAt, setSavedAt] = useState("")

    const storageKey = useMemo(() => "study-step-seat-layout", [])
    const selectedSeat =
        selectedItem.type === "seat" ? seats.find((seat) => seat.id === selectedItem.id) ?? null : null
    const isEntranceSelected = selectedItem.type === "entrance"

    useEffect(() => {
        const savedLayout = window.localStorage.getItem(storageKey)
        if (!savedLayout) return

        try {
            const parsedLayout = JSON.parse(savedLayout) as Seat[] | SavedLayout

            if (Array.isArray(parsedLayout) && parsedLayout.length > 0) {
                setSeats(parsedLayout)
                setEntrance(defaultEntrance)
                setSelectedItem({ type: "seat", id: parsedLayout[0].id })
                return
            }

            if ("seats" in parsedLayout && Array.isArray(parsedLayout.seats)) {
                setSeats(parsedLayout.seats)
                setEntrance(parsedLayout.entrance ?? defaultEntrance)
                setSelectedItem(
                    parsedLayout.seats[0]
                        ? { type: "seat", id: parsedLayout.seats[0].id }
                        : { type: "entrance", id: parsedLayout.entrance?.id ?? defaultEntrance.id }
                )
            }
        } catch {
            setSavedAt("저장된 배치도를 불러오지 못했습니다.")
        }
    }, [storageKey])

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const snap = (value: number) => (snapToGrid ? Math.round(value / GRID_SIZE) * GRID_SIZE : value)

    const updateSeat = (seatId: string, nextSeat: Partial<Seat>) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) => (seat.id === seatId ? { ...seat, ...nextSeat } : seat))
        )
    }

    const updateEntrance = (nextEntrance: Partial<Entrance>) => {
        setEntrance((prevEntrance) => ({ ...prevEntrance, ...nextEntrance }))
    }

    const getBoardPoint = (event: PointerEvent) => {
        const board = boardRef.current
        if (!board) return { x: 0, y: 0 }

        const rect = board.getBoundingClientRect()
        const scaleX = BOARD_WIDTH / rect.width
        const scaleY = BOARD_HEIGHT / rect.height

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        }
    }

    const handleSeatPointerDown = (event: PointerEvent<HTMLDivElement>, seat: Seat) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        const point = getBoardPoint(event)
        setSelectedItem({ type: "seat", id: seat.id })
        setDragState({
            type: "seat",
            id: seat.id,
            offsetX: point.x - seat.x,
            offsetY: point.y - seat.y,
        })
    }

    const handleEntrancePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        const point = getBoardPoint(event)
        setSelectedItem({ type: "entrance", id: entrance.id })
        setDragState({
            type: "entrance",
            id: entrance.id,
            offsetX: point.x - entrance.x,
            offsetY: point.y - entrance.y,
        })
    }

    const handleBoardPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!dragState) return

        const point = getBoardPoint(event)

        if (dragState.type === "entrance") {
            updateEntrance({
                x: clamp(snap(point.x - dragState.offsetX), 0, BOARD_WIDTH - entrance.width),
                y: clamp(snap(point.y - dragState.offsetY), 0, BOARD_HEIGHT - entrance.height),
            })
            return
        }

        const seat = seats.find((item) => item.id === dragState.id)
        if (!seat) return

        updateSeat(seat.id, {
            x: clamp(snap(point.x - dragState.offsetX), 0, BOARD_WIDTH - seat.width),
            y: clamp(snap(point.y - dragState.offsetY), 0, BOARD_HEIGHT - seat.height),
        })
    }

    const addSeat = () => {
        const nextIndex = seats.length + 1
        const newSeat: Seat = {
            id: `seat-${Date.now()}`,
            name: `새 자리 ${nextIndex}`,
            x: 80 + ((nextIndex - 1) % 6) * 140,
            y: 90 + Math.floor((nextIndex - 1) / 6) * 110,
            width: 118,
            height: 72,
            color: seatColors[(nextIndex - 1) % seatColors.length],
        }

        setSeats((prevSeats) => [...prevSeats, newSeat])
        setSelectedItem({ type: "seat", id: newSeat.id })
    }

    const duplicateSeat = () => {
        if (!selectedSeat) return

        const copiedSeat: Seat = {
            ...selectedSeat,
            id: `seat-${Date.now()}`,
            name: `${selectedSeat.name || "이름 없음"} 복사`,
            x: clamp(selectedSeat.x + 30, 0, BOARD_WIDTH - selectedSeat.width),
            y: clamp(selectedSeat.y + 30, 0, BOARD_HEIGHT - selectedSeat.height),
        }

        setSeats((prevSeats) => [...prevSeats, copiedSeat])
        setSelectedItem({ type: "seat", id: copiedSeat.id })
    }

    const deleteSeat = () => {
        if (!selectedSeat) return

        setSeats((prevSeats) => {
            const nextSeats = prevSeats.filter((seat) => seat.id !== selectedSeat.id)
            setSelectedItem(
                nextSeats[0] ? { type: "seat", id: nextSeats[0].id } : { type: "entrance", id: entrance.id }
            )
            return nextSeats
        })
    }

    const saveLayout = () => {
        window.localStorage.setItem(storageKey, JSON.stringify({ seats, entrance }))
        setSavedAt(`${new Date().toLocaleTimeString()} 저장됨`)
    }

    const resetLayout = () => {
        setSeats(defaultSeats)
        setEntrance(defaultEntrance)
        setSelectedItem({ type: "seat", id: defaultSeats[0].id })
        window.localStorage.removeItem(storageKey)
        setSavedAt("기본 배치도로 초기화됨")
    }

    return (
        <main className="flex flex-col gap-[18px] mt-[20px]">
            <section className="bg-white rounded-[14px] shadow-shadow15 px-[24px] py-[22px] border-l-[4px] border-blue040">
                <div className="flex items-start justify-between gap-[16px] mobile:flex-col">
                    <div>
                        <p className="body-xs text-blue040 font-bold px-[8px] py-[2px] rounded-full bg-blue005 w-fit">
                            Tool
                        </p>
                        <h1 className="heading-xl text-gray080 mt-[10px]">사무실 자리 배치도</h1>
                        <p className="body-sm text-gray050 mt-[6px]">
                            자리와 출입구를 자유롭게 추가·선택·드래그하고 이름을 편집할 수 있습니다.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-[8px]">
                        <button
                            onClick={() => setSnapToGrid((prev) => !prev)}
                            className="body-sm px-[12px] py-[8px] rounded-[8px] border border-gray020 text-gray060 hover:bg-gray015"
                        >
                            {snapToGrid ? "그리드 맞춤 켜짐" : "그리드 맞춤 꺼짐"}
                        </button>
                        <button
                            onClick={resetLayout}
                            className="body-sm px-[12px] py-[8px] rounded-[8px] border border-gray020 text-gray060 hover:bg-gray015"
                        >
                            초기화
                        </button>
                        <button
                            onClick={saveLayout}
                            className="body-sm px-[14px] py-[8px] rounded-[8px] bg-gray090 text-white hover:bg-gray070"
                        >
                            저장
                        </button>
                    </div>
                </div>
                {savedAt && <p className="body-xs text-gray040 mt-[12px]">{savedAt}</p>}
            </section>

            <section className="grid grid-cols-[1fr_340px] gap-[14px] mobile:grid-cols-1">
                <div className="bg-white rounded-[14px] shadow-shadow15 overflow-hidden">
                    <div className="flex items-center justify-between gap-[12px] px-[18px] py-[14px] border-b border-gray020">
                        <div>
                            <p className="heading-md text-gray080">편집 영역</p>
                            <p className="body-xs text-gray040 mt-[2px]">
                                총 {seats.length}개 자리 · 선택한 요소는 테두리가 강조됩니다.
                            </p>
                        </div>
                        <button
                            onClick={addSeat}
                            className="body-sm px-[12px] py-[8px] rounded-[8px] bg-blue040 text-white hover:bg-blue030"
                        >
                            자리 추가
                        </button>
                    </div>

                    <div className="w-full overflow-auto bg-gray010 p-[14px]">
                        <div
                            ref={boardRef}
                            className="relative rounded-[12px] border border-gray020 bg-white shadow-inner"
                            style={{
                                width: BOARD_WIDTH,
                                height: BOARD_HEIGHT,
                                backgroundImage:
                                    "linear-gradient(to right, rgba(148, 163, 184, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.22) 1px, transparent 1px)",
                                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                            }}
                            onPointerMove={handleBoardPointerMove}
                            onPointerUp={() => setDragState(null)}
                            onPointerLeave={() => setDragState(null)}
                        >
                            <div
                                role="button"
                                tabIndex={0}
                                aria-label={`${entrance.label || "출입구"} 위치`}
                                className={`absolute flex cursor-grab touch-none items-center justify-center rounded-[8px] border-2 bg-white/95 px-[12px] body-sm font-bold shadow-shadow15 select-none active:cursor-grabbing ${
                                    isEntranceSelected
                                        ? "border-blue040 ring-[4px] ring-blue005"
                                        : "border-dashed border-gray030 hover:border-blue030"
                                }`}
                                style={{
                                    left: entrance.x,
                                    top: entrance.y,
                                    width: entrance.width,
                                    height: entrance.height,
                                    zIndex: isEntranceSelected ? 12 : 2,
                                }}
                                onPointerDown={handleEntrancePointerDown}
                                onFocus={() => setSelectedItem({ type: "entrance", id: entrance.id })}
                            >
                                {entrance.label || "출입구"}
                            </div>

                            <div className="pointer-events-none absolute right-[20px] bottom-[20px] rounded-[8px] border border-gray020 bg-white/90 px-[12px] py-[8px] body-xs text-gray040 shadow-shadow15">
                                창가
                            </div>

                            {seats.map((seat) => {
                                const selected = selectedItem.type === "seat" && selectedItem.id === seat.id

                                return (
                                    <div
                                        key={seat.id}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${seat.name || "이름 없는 자리"} 자리`}
                                        className={`absolute flex cursor-grab touch-none flex-col items-center justify-center rounded-[10px] border-2 bg-white text-center shadow-shadow15 transition-shadow select-none active:cursor-grabbing ${
                                            selected
                                                ? "border-blue040 ring-[4px] ring-blue005"
                                                : "border-transparent hover:border-blue030"
                                        }`}
                                        style={{
                                            left: seat.x,
                                            top: seat.y,
                                            width: seat.width,
                                            height: seat.height,
                                            zIndex: selected ? 10 : 1,
                                        }}
                                        onPointerDown={(event) => handleSeatPointerDown(event, seat)}
                                        onFocus={() => setSelectedItem({ type: "seat", id: seat.id })}
                                    >
                                        <div className="mb-[4px] w-[24px] h-[24px] rounded-full" style={{ backgroundColor: seat.color }} />
                                        <span className="body-sm text-gray080 font-bold px-[8px] break-words">
                                            {seat.name || "이름 없음"}
                                        </span>
                                        <span className="body-xs text-gray035">
                                            x {Math.round(seat.x)}, y {Math.round(seat.y)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <aside className="flex flex-col gap-[14px]">
                    <div className="bg-white rounded-[14px] shadow-shadow15 px-[18px] py-[16px]">
                        <p className="heading-md text-gray080">{isEntranceSelected ? "출입구 속성" : "자리 속성"}</p>

                        {selectedSeat ? (
                            <div className="flex flex-col gap-[12px] mt-[14px]">
                                <Field label="이름">
                                    <input
                                        value={selectedSeat.name}
                                        placeholder="이름을 입력하세요"
                                        onChange={(event) => updateSeat(selectedSeat.id, { name: event.target.value })}
                                        className="w-full h-[38px] rounded-[8px] border border-gray020 px-[10px] body-sm outline-none focus:border-blue040"
                                    />
                                </Field>
                                <SizeFields
                                    x={selectedSeat.x}
                                    y={selectedSeat.y}
                                    width={selectedSeat.width}
                                    height={selectedSeat.height}
                                    onChange={(nextValue) => updateSeat(selectedSeat.id, nextValue)}
                                />
                                <Field label="색상">
                                    <div className="grid grid-cols-6 gap-[8px]">
                                        {seatColors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                aria-label={`${color} 색상 선택`}
                                                className={`w-[34px] h-[34px] rounded-[8px] border border-gray020 ${
                                                    selectedSeat.color === color ? "ring-[2px] ring-gray090 ring-offset-[2px]" : ""
                                                }`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => updateSeat(selectedSeat.id, { color })}
                                            />
                                        ))}
                                    </div>
                                </Field>
                                <div className="grid grid-cols-2 gap-[8px]">
                                    <button
                                        onClick={duplicateSeat}
                                        className="body-sm px-[12px] py-[9px] rounded-[8px] border border-gray020 text-gray060 hover:bg-gray015"
                                    >
                                        복사
                                    </button>
                                    <button
                                        onClick={deleteSeat}
                                        className="body-sm px-[12px] py-[9px] rounded-[8px] bg-red050 text-white hover:opacity-90"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ) : isEntranceSelected ? (
                            <div className="flex flex-col gap-[12px] mt-[14px]">
                                <Field label="표시 이름">
                                    <input
                                        value={entrance.label}
                                        placeholder="출입구 이름을 입력하세요"
                                        onChange={(event) => updateEntrance({ label: event.target.value })}
                                        className="w-full h-[38px] rounded-[8px] border border-gray020 px-[10px] body-sm outline-none focus:border-blue040"
                                    />
                                </Field>
                                <SizeFields
                                    x={entrance.x}
                                    y={entrance.y}
                                    width={entrance.width}
                                    height={entrance.height}
                                    minWidth={72}
                                    minHeight={36}
                                    maxHeight={120}
                                    onChange={updateEntrance}
                                />
                                <button
                                    onClick={() => setEntrance(defaultEntrance)}
                                    className="body-sm px-[12px] py-[9px] rounded-[8px] border border-gray020 text-gray060 hover:bg-gray015"
                                >
                                    출입구 초기화
                                </button>
                            </div>
                        ) : (
                            <p className="body-sm text-gray040 mt-[12px]">배치도에서 자리나 출입구를 선택하세요.</p>
                        )}
                    </div>

                    <div className="bg-white rounded-[14px] shadow-shadow15 px-[18px] py-[16px]">
                        <p className="heading-md text-gray080">배치 요소</p>
                        <div className="flex flex-col gap-[8px] mt-[12px] max-h-[320px] overflow-auto">
                            <ElementButton
                                active={isEntranceSelected}
                                color="#111827"
                                title={entrance.label || "출입구"}
                                position={`${Math.round(entrance.x)}, ${Math.round(entrance.y)}`}
                                onClick={() => setSelectedItem({ type: "entrance", id: entrance.id })}
                            />
                            {seats.map((seat) => (
                                <ElementButton
                                    key={seat.id}
                                    active={selectedItem.type === "seat" && selectedItem.id === seat.id}
                                    color={seat.color}
                                    title={seat.name || "이름 없음"}
                                    position={`${Math.round(seat.x)}, ${Math.round(seat.y)}`}
                                    onClick={() => setSelectedItem({ type: "seat", id: seat.id })}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="flex flex-col gap-[6px]">
            <span className="body-xs text-gray050 font-bold">{label}</span>
            {children}
        </label>
    )
}

function SizeFields({
    x,
    y,
    width,
    height,
    minWidth = 72,
    minHeight = 52,
    maxHeight = 160,
    onChange,
}: {
    x: number
    y: number
    width: number
    height: number
    minWidth?: number
    minHeight?: number
    maxHeight?: number
    onChange: (value: Partial<Seat & Entrance>) => void
}) {
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const fields = [
        { label: "X", value: x, key: "x", min: 0, max: BOARD_WIDTH - width },
        { label: "Y", value: y, key: "y", min: 0, max: BOARD_HEIGHT - height },
        { label: "너비", value: width, key: "width", min: minWidth, max: 220 },
        { label: "높이", value: height, key: "height", min: minHeight, max: maxHeight },
    ] as const

    return (
        <div className="grid grid-cols-2 gap-[10px]">
            {fields.map((field) => (
                <Field key={field.key} label={field.label}>
                    <input
                        type="number"
                        value={Math.round(field.value)}
                        min={field.min}
                        max={field.max}
                        onChange={(event) => {
                            const nextValue = clamp(Number(event.target.value) || field.min, field.min, field.max)
                            onChange({ [field.key]: nextValue })
                        }}
                        className="w-full h-[38px] rounded-[8px] border border-gray020 px-[10px] body-sm outline-none focus:border-blue040"
                    />
                </Field>
            ))}
        </div>
    )
}

function ElementButton({
    active,
    color,
    title,
    position,
    onClick,
}: {
    active: boolean
    color: string
    title: string
    position: string
    onClick: () => void
}) {
    return (
        <button
            type="button"
            className={`flex items-center gap-[10px] rounded-[8px] border px-[10px] py-[8px] text-left hover:bg-gray015 ${
                active ? "border-blue040 bg-blue005" : "border-gray020"
            }`}
            onClick={onClick}
        >
            <span className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: color }} />
            <span className="body-sm text-gray070 flex-1 truncate">{title}</span>
            <span className="body-xs text-gray035">{position}</span>
        </button>
    )
}
