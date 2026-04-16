"use client"
import { useState } from "react"

export default function MouseEvent() {
    const [mouseOverParentCount, setMouseOverParentCount] = useState(0)
    const [mouseOverChildCount, setMouseOverChildCount] = useState(0)
    const [mouseEnterParentCount, setMouseEnterParentCount] = useState(0)
    const [mouseEnterChildCount, setMouseEnterChildCount] = useState(0)
    const [mouseOutParentCount, setMouseOutParentCount] = useState(0)
    const [mouseOutChildCount, setMouseOutChildCount] = useState(0)
    const [mouseLeaveParentCount, setMouseLeaveParentCount] = useState(0)
    const [mouseLeaveChildCount, setMouseLeaveChildCount] = useState(0)

    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">마우스 이벤트 — 버블링 차이</p>
            <p className="text-gray060 body-sm mt-[16px]">
                mouseover / mouseout 과 mouseenter / mouseleave는 비슷해 보이지만<br />
                <strong>버블링 여부</strong>에서 결정적인 차이가 있다.
            </p>

            {/* 비교 표 */}
            <div className="mt-[24px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">핵심 차이</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-yellow005 border border-yellow020 rounded-[8px] p-[12px]">
                        <p className="body-sm text-yellow060 font-bold mb-[6px]">mouseover / mouseout</p>
                        <div className="flex flex-col gap-[4px]">
                            {[
                                "버블링 O — 자식에서 발생해도 부모로 전파",
                                "자식 요소에 진입/이탈할 때도 부모 이벤트 발생",
                                "target !== currentTarget 가능",
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <div className="w-[4px] h-[4px] rounded-full bg-yellow060 flex-shrink-0 mt-[6px]" />
                                    <p className="body-xs text-gray060">{t}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-sm text-green060 font-bold mb-[6px]">mouseenter / mouseleave</p>
                        <div className="flex flex-col gap-[4px]">
                            {[
                                "버블링 X — 해당 요소 자체에만 발생",
                                "자식 요소 이동 시 부모 이벤트 미발생",
                                "target === currentTarget (항상)",
                                "이벤트 취소 불가 (cancelable: false)",
                            ].map((t, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <div className="w-[4px] h-[4px] rounded-full bg-green060 flex-shrink-0 mt-[6px]" />
                                    <p className="body-xs text-gray060">{t}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 인터랙티브 데모 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">직접 확인 — 숫자로 이벤트 발생 횟수 비교</p>
                <p className="text-gray060 body-xs mt-[2px]">바깥(노란/초록) 영역과 안쪽 영역을 마우스로 왔다갔다 해보세요.</p>
            </div>

            <div className="mt-[16px] grid grid-cols-2 mobile:grid-cols-1 gap-[16px]">
                {/* mouseover */}
                <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                        <p className="body-sm text-gray080 font-bold">mouseover</p>
                        <p className="body-xs text-gray040">버블링 O</p>
                    </div>
                    <div
                        onMouseOver={() => setMouseOverParentCount(c => c + 1)}
                        className="w-full h-[160px] flex justify-center items-center bg-yellow010 border border-yellow040 rounded-[8px] relative cursor-default select-none">
                        <p className="absolute top-[8px] right-[10px] body-xs text-yellow060 font-bold">부모 {mouseOverParentCount}</p>
                        <div
                            onMouseOver={() => setMouseOverChildCount(c => c + 1)}
                            className="w-[60%] h-[80px] bg-yellow040 rounded-[6px] relative flex items-center justify-center">
                            <p className="body-xs text-white">자식 {mouseOverChildCount}</p>
                        </div>
                    </div>
                    <p className="body-xs text-gray040">자식에 진입해도 부모 카운트 증가</p>
                </div>

                {/* mouseenter */}
                <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                        <p className="body-sm text-gray080 font-bold">mouseenter</p>
                        <p className="body-xs text-gray040">버블링 X</p>
                    </div>
                    <div
                        onMouseEnter={() => setMouseEnterParentCount(c => c + 1)}
                        className="w-full h-[160px] flex justify-center items-center bg-green005 border border-green020 rounded-[8px] relative cursor-default select-none">
                        <p className="absolute top-[8px] right-[10px] body-xs text-green060 font-bold">부모 {mouseEnterParentCount}</p>
                        <div
                            onMouseEnter={() => setMouseEnterChildCount(c => c + 1)}
                            className="w-[60%] h-[80px] bg-green020 rounded-[6px] relative flex items-center justify-center">
                            <p className="body-xs text-green060">자식 {mouseEnterChildCount}</p>
                        </div>
                    </div>
                    <p className="body-xs text-gray040">자식 이동 시 부모 카운트 증가 안 함</p>
                </div>

                {/* mouseout */}
                <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                        <p className="body-sm text-gray080 font-bold">mouseout</p>
                        <p className="body-xs text-gray040">버블링 O</p>
                    </div>
                    <div
                        onMouseOut={() => setMouseOutParentCount(c => c + 1)}
                        className="w-full h-[160px] flex justify-center items-center bg-yellow010 border border-yellow040 rounded-[8px] relative cursor-default select-none">
                        <p className="absolute top-[8px] right-[10px] body-xs text-yellow060 font-bold">부모 {mouseOutParentCount}</p>
                        <div
                            onMouseOut={() => setMouseOutChildCount(c => c + 1)}
                            className="w-[60%] h-[80px] bg-yellow040 rounded-[6px] relative flex items-center justify-center">
                            <p className="body-xs text-white">자식 {mouseOutChildCount}</p>
                        </div>
                    </div>
                    <p className="body-xs text-gray040">자식 이탈 시에도 부모 카운트 증가</p>
                </div>

                {/* mouseleave */}
                <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                        <p className="body-sm text-gray080 font-bold">mouseleave</p>
                        <p className="body-xs text-gray040">버블링 X</p>
                    </div>
                    <div
                        onMouseLeave={() => setMouseLeaveParentCount(c => c + 1)}
                        className="w-full h-[160px] flex justify-center items-center bg-green005 border border-green020 rounded-[8px] relative cursor-default select-none">
                        <p className="absolute top-[8px] right-[10px] body-xs text-green060 font-bold">부모 {mouseLeaveParentCount}</p>
                        <div
                            onMouseLeave={() => setMouseLeaveChildCount(c => c + 1)}
                            className="w-[60%] h-[80px] bg-green020 rounded-[6px] relative flex items-center justify-center">
                            <p className="body-xs text-green060">자식 {mouseLeaveChildCount}</p>
                        </div>
                    </div>
                    <p className="body-xs text-gray040">자식 이탈은 부모에 전파 안 됨</p>
                </div>
            </div>

            {/* 실무 팁 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 선택 기준</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "드롭다운 메뉴, 툴팁 — mouseenter/mouseleave 권장. 자식 요소로 이동해도 닫히지 않아야 하기 때문.",
                        "이벤트 위임 패턴 — mouseover/mouseout 활용. 버블링으로 부모 하나에서 다수의 자식 이벤트 관리.",
                        "React에서는 onMouseEnter / onMouseLeave가 기본 제공되어 버블링 없는 처리 편리.",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-blue030 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
