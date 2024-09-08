"use client"
import { useScroll } from "@react-three/drei"
import { MotionFast } from "@src/types/ButtonType"
import { ReactElement, useState } from "react"


export default function JavaSciptArrayMethod() {


    const origin = ["red", "orange", "yellow", "green", "blue", "navy", "violet"]
    const actionButtonStyle = `mt-[6px] py-[2px] w-[70px] text-white bg-gray090 hover:bg-gray070 rounded-[8px] ${MotionFast}`
    const [array, setArray] = useState({
        push: [...origin], pop: [...origin], unshift: [...origin], shift: [...origin],
        splice: [...origin], slice : [...origin]
    })
    const [spliceValue, setSpliceValue] = useState({
        start: 0, remove: 0, plus: ""
    })
    const [sliceValue, setSliceValue] = useState({
        start: 0, end: 0
    })

    const arrayAnimationElem = (title: string, children: ReactElement, onClick: () => void) => {
        return (
            <div className="flex flex-col gap-[2px]">
                <p>{title}</p>
                {children}
                <button
                    onClick={onClick}
                    className={actionButtonStyle}>
                    action
                </button>
            </div>
        )
    }

    const arrayItemElem = (value: string, index : number) => {
        return (
            <div key={value+"_"+index} className={`w-[60px] h-[60px] flex justify-center items-center ${!origin.includes(value) ? `bg-gold` : `bg-gray040`} rounded-[8px]`}>
                <p className={!origin.includes(value) ? "text-white" : "text-gray090"}>{value}</p>
            </div>
        )
    }


    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px] gap-[36px]">

            {/* push() */}
            {arrayAnimationElem(
                "push",
                <div className="flex gap-[4px] transition-all">
                    {array.push.map((item, index) => arrayItemElem(item, index))}
                </div>,
                () => {
                    const copy = [...array.push]
                    copy.push("new")
                    setArray({ ...array, push: [...copy] })
                }
            )}

            {/* pop() */}
            {arrayAnimationElem(
                "pop",
                <div className="flex gap-[4px] transition-all">
                    {array.pop.map((item, index) => arrayItemElem(item, index))}
                </div>,
                () => {
                    const copy = [...array.pop]
                    copy.pop()
                    setArray({ ...array, pop: [...copy] })
                }
            )}
            {/* unshift() */}
            {arrayAnimationElem(
                "unshift",
                <div className="flex gap-[4px] transition-all">
                    {array.unshift.map((item, index) => arrayItemElem(item, index))}
                </div>,
                () => {
                    const copy = [...array.unshift]
                    copy.unshift("new")
                    setArray({ ...array, unshift: [...copy] })
                }
            )}

            {/* shift() */}
            {arrayAnimationElem(
                "shift",
                <div className="flex gap-[4px] transition-all">
                    {array.shift.map((item, index) => arrayItemElem(item, index))}
                </div>,
                () => {
                    const copy = [...array.shift]
                    copy.shift()
                    setArray({ ...array, shift: [...copy] })
                }
            )}

            {/* splice */}
            {arrayAnimationElem(
                "splice",
                <div className="flex flex-col gap-[12px]">
                    <div className="flex gap-[4px]">
                        {/* start index */}
                        <input
                            value={spliceValue.start}
                            onChange={(event) => {
                                if (isNaN(Number(event.target.value)) || Number(event.target.value) >= array.splice.length) return
                                setSpliceValue({ ...spliceValue, start: Number(event.target.value) })
                            }}
                            type="text" className="py-[2px] px-[4px] border border-gray020 rounded-[8px]" />
                        {/* remove count */}
                        <input
                            value={spliceValue.remove}
                            onChange={(event) => {
                                if (isNaN(Number(event.target.value)) || Number(event.target.value) >= array.splice.length) return
                                setSpliceValue({ ...spliceValue, remove: Number(event.target.value) })
                            }}
                            type="text" className="py-[2px] px-[4px] border border-gray020 rounded-[8px]" />
                        {/* plus array 쉼표로 구분합니다*/}
                        <input
                            value={spliceValue.plus}
                            onChange={(event) => {
                                setSpliceValue({ ...spliceValue, plus: event.target.value })
                            }}
                            type="text" className="py-[2px] px-[4px] border border-gray020 rounded-[8px]" />
                    </div>

                    <div className="flex gap-[4px] transition-all">
                        {array.splice.map((item, index) => arrayItemElem(item, index))}
                    </div>
                </div>,
                () => {
                    const copy = [...array.splice]
                    copy.splice(spliceValue.start, spliceValue.remove, ...spliceValue.plus.split(","))
                    setArray({ ...array, splice: [...copy] })
                }
            )}

            {/* slice */}
            {arrayAnimationElem(
                "slice",
                <div className="flex flex-col gap-[12px]">
                    <div className="flex gap-[4px]">
                        {/* start index */}
                        <input
                            value={sliceValue.start}
                            onChange={(event) => {
                                if (isNaN(Number(event.target.value)) || Number(event.target.value) >= array.slice.length) return
                                setSliceValue({ ...sliceValue, start: Number(event.target.value) })
                            }}
                            type="text" className="py-[2px] px-[4px] border border-gray020 rounded-[8px]" />
                        {/* end number */}
                        <input
                            value={sliceValue.end}
                            onChange={(event) => {
                                if (isNaN(Number(event.target.value)) || Number(event.target.value) >= array.slice.length) return
                                setSliceValue({ ...sliceValue, end: Number(event.target.value) })
                            }}
                            type="text" className="py-[2px] px-[4px] border border-gray020 rounded-[8px]" />
                    </div>

                    <div className="flex gap-[4px] transition-all">
                        {array.slice.map((item, index) => arrayItemElem(item, index))}
                    </div>
                </div>,
                () => {
                    const copy = [...array.slice]
                    copy.slice(sliceValue.start, sliceValue.end)
                    console.log(copy, "cooopy")
                    setArray({ ...array, slice: copy.slice(sliceValue.start, sliceValue.end) })
                }
            )}
        </article>
    )
}