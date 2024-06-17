"use client"
import {useEffect} from "react";
const reason = []
const reasonData = [
    "버즈니 복지가 너무 좋아서", "홈쇼핑 서비스에 관심이 있어서", "잘하는 사람들과 함께 일하고 싶어서", "나의 워라벨을 지키고 싶어서", "기타"
]
const figure = []
const figureData = [
    "서비스 지향성", "업무 전문성", "능동적 도전성", "협업과 커뮤니케이션", "긍정 에너지"
]
const welfare = []
const welfareData = [
    "성장을 장려하는 평가/보상제도", "역랑있는 누구나 리더가 될 수 있는 문화", "적극적인 교육/컨퍼런스 지원", "자기계발 적극 지원제도", "업무 관련 무제한 도서구입비", "role-driven 조직구조", "최신 업무 장비 지원", "성과/역량 기반 평가/보상 제도"
]
export default function Homework() {
    useEffect(() => {
        fetch(`https://event-assignment.buzzni.net/event/3/answers`)
            .then((response) => response.json())
            .then((data) => {
                let elem = data.payload;
                const max = elem.length
                elem.forEach((item : any) => {
                    const reasonSelect = Object.values(item.value)[0]
                    const figureSelect = Object.values(item.value)[1]
                    const welfareSelect = Object.values(item.value)[2]

                    if (reasonSelect !== undefined && reasonSelect !== null) {
                        reason.push({ userId : item.user_id, select  : Object.values(item.value)[0].toString() })
                    }
                    if (figureSelect !== undefined && figureSelect !== null) {
                        figure.push({ userId : item.user_id, select  : Object.values(item.value)[1].toString() })
                    }
                    if (welfareSelect !== undefined && welfareSelect !== null) {
                        welfare.push({ userId : item.user_id, select  : Object.values(item.value)[2].toString() })
                    }
                })
                setReasonUi(max)
                setFigureUi(max)
                setWelfareUi(max)
            })
            .catch((error) => {

            });
    }, [])


    const setReasonUi = (max : number) => {
        let reason_1_count = 0
        let reason_2_count = 0
        let reason_3_count = 0
        let reason_4_count = 0
        let reason_5_count = 0
        reason.forEach((item) => {
            item.select.split(",").forEach((value : any) => {
                if (value === "0") {
                    reason_1_count += 1
                } else if (value === "1") {
                    reason_2_count += 1
                } else if (value === "2") {
                    reason_3_count += 1
                } else if (value === "3") {
                    reason_4_count += 1
                } else if (value === "4") {
                    reason_5_count += 1
                }
            })
        })
        const reasonCountArray = []
        reasonCountArray.push(reason_1_count)
        reasonCountArray.push(reason_2_count)
        reasonCountArray.push(reason_3_count)
        reasonCountArray.push(reason_4_count)
        reasonCountArray.push(reason_5_count)

        reasonCountArray.forEach((value, index) => {
            const reasonElem = window.document.getElementById(`reason_${index}`)
            if (reasonElem) reasonElem.style.width = `${(value / max) * 960}px`

            const reasonPercent = window.document.getElementById(`reason_${index}_percent`)
            if (reasonPercent) reasonPercent.innerText = ((value / max) * 100).toFixed(1) + "%"

            const reasonCount = window.document.getElementById(`reason_${index}_count`)
            if (reasonCount) reasonCount.innerText = String(value)
        })
    }
    const setFigureUi = (max : number) => {
        let figure_1_count = 0
        let figure_2_count = 0
        let figure_3_count = 0
        let figure_4_count = 0
        let figure_5_count = 0
        figure.forEach((item) => {
            item.select.split(",").forEach((value : any) => {
                if (value === "0") {
                    figure_1_count += 1
                } else if (value === "1") {
                    figure_2_count += 1
                } else if (value === "2") {
                    figure_3_count += 1
                } else if (value === "3") {
                    figure_4_count += 1
                } else if (value === "4") {
                    figure_5_count += 1
                }
            })
        })

        const figureCountArray = []
        figureCountArray.push(figure_1_count)
        figureCountArray.push(figure_2_count)
        figureCountArray.push(figure_3_count)
        figureCountArray.push(figure_4_count)
        figureCountArray.push(figure_5_count)

        figureCountArray.forEach((value, index) => {
            const figureElem = window.document.getElementById(`figure_${index}`)
            if (figureElem) figureElem.style.width = `${(value / max) * 960}px`

            const figurePercent = window.document.getElementById(`figure_${index}_percent`)
            if (figurePercent) figurePercent.innerText = ((value / max) * 100).toFixed(1) + "%"

            const figureCount = window.document.getElementById(`figure_${index}_count`)
            if (figureCount) figureCount.innerText = String(value)
        })
    }

    const setWelfareUi = (max : number) => {
        let welfare_1_count = 0
        let welfare_2_count = 0
        let welfare_3_count = 0
        let welfare_4_count = 0
        let welfare_5_count = 0
        let welfare_6_count = 0
        let welfare_7_count = 0
        let welfare_8_count = 0

        welfare.forEach((item) => {
            item.select.split(",").forEach((value : any) => {
                if (value === "0") {
                    welfare_1_count += 1
                } else if (value === "1") {
                    welfare_2_count += 1
                } else if (value === "2") {
                    welfare_3_count += 1
                } else if (value === "3") {
                    welfare_4_count += 1
                } else if (value === "4") {
                    welfare_5_count += 1
                } else if (value === "5") {
                    welfare_6_count += 1
                } else if (value === "6") {
                    welfare_7_count += 1
                } else if (value === "7") {
                    welfare_8_count += 1
                }
            })
        })

        const welfareCountArray = []
        welfareCountArray.push(welfare_1_count)
        welfareCountArray.push(welfare_2_count)
        welfareCountArray.push(welfare_3_count)
        welfareCountArray.push(welfare_4_count)
        welfareCountArray.push(welfare_5_count)
        welfareCountArray.push(welfare_6_count)
        welfareCountArray.push(welfare_7_count)
        welfareCountArray.push(welfare_8_count)

        welfareCountArray.forEach((value, index) => {
            const welfareElem = window.document.getElementById(`welfare_${index}`)
            if (welfareElem) welfareElem.style.width = `${(value / max) * 960}px`

            const welfarePercent = window.document.getElementById(`welfare_${index}_percent`)
            if (welfarePercent) welfarePercent.innerText = ((value / max) * 100).toFixed(1) + "%"

            const welfareCount = window.document.getElementById(`welfare_${index}_count`)
            if (welfareCount) welfareCount.innerText = String(value)
        })
    }

    /*
    1번 항목에 버즈니 복지가 너무 좋아서 만 클릭하면 287명만 빨강
——
2번 항목에서 홈쇼핑 서비스관심 + 나의 워라벨을 지키고 싶어 2개 클릭하면 홈쇼핑서비스 || 나의 워라벨 선택한 응답자 통계
——
1번 버즈니 복지가 좋아서 + 2번 홈쇼핑 서비스관심 2개 클릭하면 2개가 포함되어있는 응답자 통계 버즈니복지 && 홈쇼핑서비스

     */

    const clickChart = (index : number) => {

    }

    return (
        <>
            <div className="mt-[40px] flex flex-col gap-[4px] h-fit w-[960px] gap-[2px]">
                <p className="mb-[10px] text-[18px] font-normal leading-[22px] tracking-[0]">Q. 버즈니에 지원한 이유는 무엇 때문인가요?</p>
                {reasonData.map((value, index) => (
                    <div key={`reason_${index}`} className="w-full h-[20px] bg-gray020 relative cursor-pointer">
                        <div className="absolute px-[10px] w-[960px] h-full flex justify-between items-center">
                            <p id={`reason_${index}_percent`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                            <p className="text-[12px] font-normal leading-[16px] tracking-[0]">{value}</p>
                            <p id={`reason_${index}_count`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                        </div>
                        <div id={`reason_${index}`} className={`h-full flex-1 rounded-t-[2px] bg-blue020`}></div>
                    </div>
                ))}
            </div>


            <div className="mt-[40px] flex flex-col gap-[4px] h-fit w-[960px] gap-[2px]">
                <p className="mb-[10px] text-[18px] font-normal leading-[22px] tracking-[0]">Q. 버즈니의 인재상 중 어떤 모습들을 가지고 있나요?(중복 가능)</p>
                {figureData.map((value, index) => (
                    <div key={`figure_${index}`} className="w-full h-[20px] bg-gray020 relative cursor-pointer">
                        <div className="absolute px-[10px] w-[960px] h-full flex justify-between items-center">
                            <p id={`figure_${index}_percent`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                            <p className="text-[12px] font-normal leading-[16px] tracking-[0]">{value}</p>
                            <p id={`figure_${index}_count`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                        </div>
                        <div id={`figure_${index}`} className={`h-full flex-1 rounded-t-[2px] bg-blue020`}></div>
                    </div>
                ))}
            </div>


            <div className="mt-[40px] flex flex-col gap-[4px] h-fit w-[960px] gap-[2px]">
                <p className="mb-[10px] text-[18px] font-normal leading-[22px] tracking-[0]">Q. 버즈니의 복지 중에서 본인이 가장 마음에 드는 복지는 무엇인가요? 최대 5가지를 골라주세요.</p>
                {welfareData.map((value, index) => (
                    <div key={`welfare_${index}`} className="w-full h-[20px] bg-gray020 relative cursor-pointer">
                        <div className="absolute px-[10px] w-[960px] h-full flex justify-between items-center">
                            <p id={`welfare_${index}_percent`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                            <p className="text-[12px] font-normal leading-[16px] tracking-[0]">{value}</p>
                            <p id={`welfare_${index}_count`} className="text-[12px] font-normal leading-[16px] tracking-[0]"></p>
                        </div>
                        <div id={`welfare_${index}`} className={`h-full flex-1 rounded-t-[2px] bg-blue020`}></div>
                    </div>
                ))}
            </div>
        </>
    )
}