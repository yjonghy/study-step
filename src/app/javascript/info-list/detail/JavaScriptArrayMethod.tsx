"use client"
import { ReactElement, useState } from "react"

const origin = ["red", "orange", "yellow", "green", "blue", "navy", "violet"]

const methodDesc: Record<string, string> = {
    push: "배열 끝에 요소 추가. 원본 변경. 반환값: 새 배열 길이.",
    pop: "배열 끝 요소 제거. 원본 변경. 반환값: 제거된 요소.",
    unshift: "배열 앞에 요소 추가. 원본 변경. 반환값: 새 배열 길이.",
    shift: "배열 첫 번째 요소 제거. 원본 변경. 반환값: 제거된 요소.",
    splice: "splice(start, deleteCount, ...items) — 지정 위치부터 요소 제거 후 새 요소 삽입. 원본 변경.",
    slice: "slice(start, end) — start~end 사이의 요소를 새 배열로 반환. 원본 유지.",
}

export default function JavaSciptArrayMethod() {
    const [array, setArray] = useState({
        push: [...origin], pop: [...origin], unshift: [...origin], shift: [...origin],
        splice: [...origin], slice: [...origin],
    })
    const [spliceValue, setSpliceValue] = useState({ start: 0, remove: 0, plus: "" })
    const [sliceValue, setSliceValue] = useState({ start: 0, end: 0 })

    const arrayItemElem = (value: string, index: number) => (
        <div
            key={value + "_" + index}
            className={`w-[52px] h-[52px] flex flex-col justify-center items-center rounded-[8px] ${!origin.includes(value) ? "bg-blue020 border border-blue030" : "bg-gray010 border border-gray020"}`}
        >
            <p className={`body-xs text-center leading-tight ${!origin.includes(value) ? "text-blue040 font-bold" : "text-gray060"}`}>{value}</p>
        </div>
    )

    const methodBlock = (
        title: string,
        desc: string,
        children: ReactElement,
        onClick: () => void,
        extraInputs?: ReactElement
    ) => (
        <div className="bg-gray010 rounded-[12px] p-[16px] flex flex-col gap-[10px]">
            <div>
                <p className="body-sm text-gray080 font-bold">{title}()</p>
                <p className="body-xs text-gray060 mt-[2px]">{desc}</p>
            </div>
            {extraInputs}
            <div className="flex gap-[4px] flex-wrap">{children}</div>
            <button
                onClick={onClick}
                className="self-start px-[12px] py-[4px] bg-gray080 hover:bg-gray060 text-white body-xs rounded-[8px] ease-out duration-[150ms]"
            >
                실행
            </button>
        </div>
    )

    const inputStyle = "w-[72px] py-[4px] px-[8px] border border-gray020 rounded-[8px] body-xs text-gray060 bg-white"
    const labelStyle = "body-xs text-gray040"

    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">JavaScript Array Method</p>
            <p className="text-gray060 body-sm mt-[16px]">
                자주 쓰이는 배열 변경 메서드 6가지를 직접 실행하며 동작을 확인한다.<br />
                <span className="text-blue040 font-bold">파란색</span> 아이템은 새로 추가된 요소, 기본 색은 원본 요소.
            </p>

            <div className="mt-[24px] flex flex-col gap-[12px]">

                {/* push */}
                {methodBlock(
                    "push", methodDesc.push,
                    <>{array.push.map((item, i) => arrayItemElem(item, i))}</>,
                    () => { const c = [...array.push]; c.push("new"); setArray({ ...array, push: c }) }
                )}

                {/* pop */}
                {methodBlock(
                    "pop", methodDesc.pop,
                    <>{array.pop.map((item, i) => arrayItemElem(item, i))}</>,
                    () => { const c = [...array.pop]; c.pop(); setArray({ ...array, pop: c }) }
                )}

                {/* unshift */}
                {methodBlock(
                    "unshift", methodDesc.unshift,
                    <>{array.unshift.map((item, i) => arrayItemElem(item, i))}</>,
                    () => { const c = [...array.unshift]; c.unshift("new"); setArray({ ...array, unshift: c }) }
                )}

                {/* shift */}
                {methodBlock(
                    "shift", methodDesc.shift,
                    <>{array.shift.map((item, i) => arrayItemElem(item, i))}</>,
                    () => { const c = [...array.shift]; c.shift(); setArray({ ...array, shift: c }) }
                )}

                {/* splice */}
                {methodBlock(
                    "splice", methodDesc.splice,
                    <>{array.splice.map((item, i) => arrayItemElem(item, i))}</>,
                    () => {
                        const c = [...array.splice]
                        c.splice(spliceValue.start, spliceValue.remove, ...spliceValue.plus.split(",").filter(Boolean))
                        setArray({ ...array, splice: c })
                    },
                    <div className="flex gap-[8px] flex-wrap items-center">
                        <div className="flex flex-col gap-[2px]">
                            <span className={labelStyle}>start</span>
                            <input value={spliceValue.start} className={inputStyle}
                                onChange={e => { if (!isNaN(Number(e.target.value))) setSpliceValue({ ...spliceValue, start: Number(e.target.value) }) }} />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className={labelStyle}>deleteCount</span>
                            <input value={spliceValue.remove} className={inputStyle}
                                onChange={e => { if (!isNaN(Number(e.target.value))) setSpliceValue({ ...spliceValue, remove: Number(e.target.value) }) }} />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className={labelStyle}>items (쉼표 구분)</span>
                            <input value={spliceValue.plus} className={inputStyle}
                                onChange={e => setSpliceValue({ ...spliceValue, plus: e.target.value })} />
                        </div>
                    </div>
                )}

                {/* slice */}
                {methodBlock(
                    "slice", methodDesc.slice,
                    <>{array.slice.map((item, i) => arrayItemElem(item, i))}</>,
                    () => {
                        const c = [...origin]
                        setArray({ ...array, slice: c.slice(sliceValue.start, sliceValue.end || undefined) })
                    },
                    <div className="flex gap-[8px] flex-wrap items-center">
                        <div className="flex flex-col gap-[2px]">
                            <span className={labelStyle}>start</span>
                            <input value={sliceValue.start} className={inputStyle}
                                onChange={e => { if (!isNaN(Number(e.target.value))) setSliceValue({ ...sliceValue, start: Number(e.target.value) }) }} />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className={labelStyle}>end</span>
                            <input value={sliceValue.end} className={inputStyle}
                                onChange={e => { if (!isNaN(Number(e.target.value))) setSliceValue({ ...sliceValue, end: Number(e.target.value) }) }} />
                        </div>
                    </div>
                )}
            </div>

            {/* 불변 메서드 참고 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">ES2023+ 불변 메서드 (toSorted, toSpliced, with)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const arr = [3, 1, 2];

// 기존 — 원본 변경
arr.sort();          // arr = [1, 2, 3] (원본 변경)

// ES2023 불변 메서드 — 원본 유지, 새 배열 반환
arr.toSorted();      // [1, 2, 3]  (arr 유지)
arr.toSpliced(1, 1); // [3, 2]     (arr 유지)
arr.with(0, 99);     // [99, 1, 2] (arr 유지)

// React 상태 업데이트에 특히 유용
setItems(prev => prev.toSorted((a, b) => a.order - b.order));`}</p>
                </div>
            </div>
        </article>
    )
}
