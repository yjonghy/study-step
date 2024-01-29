import React, {useRef, useState} from "react";
import {GhostPrimaryButton} from "@src/types/ButtonType";


export default function MouseEvent (){

    const [mouseOverParentCount, setMouseOverParentCount] = useState(0)
    const [mouseOverChildCount, setMouseOverChildCount] = useState(0)

    const [mouseOutParentCount, setMouseOutParentCount] = useState(0)
    const [mouseOutChildCount, setMouseOutChildCount] = useState(0)

    const [mouseEnterParentCount, setMouseEnterParentCount] = useState(0)
    const [mouseEnterChildCount, setMouseEnterChildCount] = useState(0)


    const [mouseLeaveParentCount, setMouseLeaveParentCount] = useState(0)
    const [mouseLeaveChildCount, setMouseLeaveChildCount] = useState(0)


    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px]">
            <p className="text-gray060 heading-xl">mouse 이벤트 차이</p>
            <div className="w-full mt-[4px] flex justify-center gap-[8px]">
                <div className="flex bg-gray040 gap-[4px] p-[8px] rounded-[8px]">
                    <p className="text-gray090 body-md">
                        mouseOver
                    </p>
                    <p className="text-gray090 body-md">
                        mouseOut
                    </p>
                </div>

                <div className="flex bg-gray040 gap-[4px] p-[8px] rounded-[8px]">
                    <p  className="text-gray090 body-md">
                        mouseEnter
                    </p>
                    <p  className="text-gray090 body-md">
                        mouseLeave
                    </p>
                </div>
            </div>

            <p className="mt-[10px] text-gray090 body-md">
                위그룹으로 묶이고 이벤트자체는 비슷하나 버블링에서 큰차이가 있다
                <br /><br />
                mouseOver/mouseOut는 이벤트가 발생시 버블링이 일어난다.<br />
                mouseEnter/mouseLeave는 이벤트가 발생시 버블링이 일어나지 않아 본인만이 이벤트를 받을수있다<br />
                target === currentTarget (always)<br />
                <br /><br />
                * mouseEnter/mouseLeave 이벤트는 취소 불가능
                <br />
                아래는 흔히 볼수있는 예제
            </p>


            <p className="body-xl text-gray090 mt-[12px]">mouseOver</p>
            <div
                onMouseOver={() => setMouseOverParentCount(mouseOverParentCount + 1)}
                className="w-[400px] h-[300px] flex justify-center items-center bg-yellow070 relative">
                <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseOverParentCount}</p>
                <div
                    onMouseOver={() => setMouseOverChildCount(mouseOverChildCount + 1)}
                    className="w-[300px] h-[200px] bg-yellow010 relative">
                    <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseOverChildCount}</p>
                </div>
            </div>


            <p className="body-xl text-gray090 mt-[12px]">mouseEnter</p>
            <div
                onMouseEnter={() => setMouseEnterParentCount(mouseEnterParentCount + 1)}
                className="w-[400px] h-[300px] flex justify-center items-center bg-green070 relative">
                <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseEnterParentCount}</p>
                <div
                    onMouseEnter={() => setMouseEnterChildCount(mouseEnterChildCount + 1)}
                    className="w-[300px] h-[200px] bg-green010 relative">
                    <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseEnterChildCount}</p>
                </div>
            </div>


            <p className="body-xl text-gray090 mt-[12px]">mouseOut</p>
            <div
                onMouseOut={() => setMouseOutParentCount(mouseOutParentCount - 1)}
                className="w-[400px] h-[300px] flex justify-center items-center bg-yellow070 relative">
                <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseOutParentCount}</p>
                <div
                    onMouseOut={() => setMouseOutChildCount(mouseOutChildCount - 1)}
                    className="w-[300px] h-[200px] bg-yellow010 relative">
                    <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseOutChildCount}</p>
                </div>
            </div>


            <p className="body-xl text-gray090 mt-[12px]">mouseLeave</p>
            <div
                onMouseLeave={() => setMouseLeaveParentCount(mouseLeaveParentCount - 1)}
                className="w-[400px] h-[300px] flex justify-center items-center bg-green070 relative">
                <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseLeaveParentCount}</p>
                <div
                    onMouseLeave={() => setMouseLeaveChildCount(mouseLeaveChildCount - 1)}
                    className="w-[300px] h-[200px] bg-green010 relative">
                    <p className="absolute top-[10px] right-[10px] body-md text-gray090">{mouseLeaveChildCount}</p>
                </div>
            </div>
        </article>
    )
}

