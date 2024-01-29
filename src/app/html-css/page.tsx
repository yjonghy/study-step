"use client"
import {useState} from "react";
import InfoListDetail from "@src/app/javascript/info-list/detail";
import InfoList from "@src/app/javascript/info-list";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"


const title_ = ["javascript 엔진", "adsasd", 'ADsdas']
export default function HtmlCss() {


    const [showDetail, setShowDetail] = useState({state: false, data: {}})
    const showMessageDetail = (data) => {
        setShowDetail({state: true, data: data})
    }
    const closeMessageDetail = () => {
        setShowDetail({state: false, data: {}})
    }


    return (
        <article className={parentStyle}>
            시멘틱 태그를 지켜서 html을 구성해야하는 이유가 있나요?


            CSS transform과 position의 차이점에 대해 설명해주세요.
            Z-index와 스택 컨텍스트(stacking Context)가 어떻게 형성되는지 설명하세요.
            브라우저 렌더링 과정을 설명해주세요.
            브라우저가 Reflow와 Repaint가 실행되는 시점에 대해서 설명해주세요.
            css 박스모델에 대해 설명해주세요

            Scene



        </article>
    )

}