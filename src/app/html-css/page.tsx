"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"


export default function HtmlCss() {


    const router = useRouter()
    const [openDNS, setOpenDNS] = useState(false)

    const clickDNS = () => { setOpenDNS(!openDNS) }


    return (
        <section className={parentStyle}>
            {/*브라우저 렌더링 과정을 설명해주세요.*/}
            <article className="w-full h-full">
                <h1 className="text-gray090 heading-xl">브라우저 렌더링 과정</h1>
                <div className="mt-[24px]">
                    <p className="text-gray090 body-xl">
                        1. 탐색
                    </p>
                    <div
                        onClick={clickDNS}
                        className="mt-[12px] relative cursor-pointer">
                        <p className="text-gray090 body-md">DNS 조회</p>
                        {openDNS &&
                            <div className="absolute top-[calc(100%_+_4px)] w-full p-[10px] bg-yellow020 rounded-[8px] text-white body-xs">
                                *DNS란 <br/>
                                Domain Name System 약자
                                입력한 도메인(www.naver.com)을 실제 네트워크상에서 사용하는 IP 주소(223.130.200.104)로 바꾸고 해당 IP 주소로 접속하는 과정 (그 반대의 과정도 포함)
                                <p
                                    className="mt-[10px] text-hourblue underline body-xs"
                                    onClick={() => {
                                        router.push("/computer-science/dns")
                                    }}>자세한 내용</p>
                            </div>
                        }
                        <p className="mt-[4px] body-xs">기본적인 프로세스는 요청한 도매인을 가지고 네임서버에 접속하여 연결된 아이피를 찾고 해당 아이피로 접속하게 해준다.(DNS란?)</p>
                    </div>
                    <div className="mt-[12px]">
                        <p className="text-gray090 body-md">TCP Handshake</p>
                        <p className="mt-[4px] text-gray090 body-xs">ip 주소를 통해 접속한 서버와 <span className="text-hourblue underline cursor-pointer " onClick={() => {router.push("/computer-science/tcp")}}>tcp 3way-handshake</span> 를 통해 연결을 설정.</p>
                    </div>
                    <div className="mt-[12px]">
                        <p className="text-gray090 body-md">TLS Negotiation</p>
                        <p className="mt-[4px] body-xs text-hourblue underline cursor-pointer" onClick={() => {router.push("/computer-science/tls")}}>보안성 연결을 위한 TLS 연결</p>
                    </div>
                </div>
                <div className="mt-[24px]">
                    <p className="text-gray090 body-xl">
                        2. 응답
                    </p>
                    <p className="body-xs text-gray090 mt-[4px]">요청한 아이피로부터 리소스를 응답받는다</p>
                </div>
                <div className="mt-[24px]">
                    <p className="text-gray090 body-xl">3. 구문 분석</p>
                    <img className="w-full  mt-[12px]" src="/domtree.webp"/>
                    <p className="body-xs text-gray090">-브라우저가 html 원시 바이트를 html 정의된 인코딩에 따라 문자로 변환</p>
                    <p className="body-xs text-gray090">-브라우저가 문자열을 W3C 표준에 지정된 고유 토큰(문법적 의미를 갖는 코드최소단위)으로 생성</p>
                    <p className="body-xs text-gray090">-생성된 토큰으로 속성 및 규칙을 정의하는 객채(노드)로 변환</p>
                    <p className="body-xs text-gray090">-겍체를 html 중첩관계를 반영하여 트리 구조로 구성한다(DOM tree)</p>

                    <p className="mt-[4px] body-xs text-gray090">
                        *css파일도 위와 같은 과정을 거쳐 cssom을 생성한다
                    </p>
                </div>
                <div className="mt-[24px]">
                    <p className="text-gray090 body-xl">4. 렌더</p>
                    <p className="text-gray090 body-xs mt-[12px]">
                        <p className="body-md">-Style</p>
                        생성된 DOM tree 와 cssom 를 매칭시켜서 렌더트리를 구성<br/>
                        렌더트리는 실제로 화면에 그려질 Tree<br/>
                        실제로 눈에 보이는 노드만 순회하여 구성 <br/>
                        display : none {`->`} 렌더 트리에서 제외 <br/>
                        visibility : hidden {`->`} 렌더 트리에 포함
                    </p>
                    <p className="text-gray090 body-xs mt-[12px]">
                        <p className="body-md">-Layout</p>
                        렌더트리를 기반으로 각 노드의 도형 값을 계산하기 위해 레이아웃을 실행<br/>
                        레이아웃은 렌더트리에 있는 모든 노드의 너비, 높이, 위치를 결정하는 프로세스 (뷰포트 기반)<br/>
                        (리플로우 는 레이아웃 이후에 있는 페이지의 일부분이나 전체 문서에 대한 크기나 위치에 대한 결정)<br/>
                        렌더트리가 한번 만들어지고 레이아웃 실행 객체의 정확한 크기와 위치를 결정하기 위해서, 브라우저는 렌더 트리의 루트부터 시작하여 순회<br/>
                        레이아웃은 일반적으로 본문에서 시작해 모든 후손의 크기를 각 요소의 박스 모델 속성을 통해 계산
                    </p>
                    <p className="text-gray090 body-xs mt-[12px]">
                        <p className="body-md">-Painting</p>
                        브라우저는 레이아웃 단계에서 계산된 각 박스를 실제 화면의 픽셀로 변환
                        텍스트, 색깔, 경계, 그림자 및 버튼이나 이미지 같은 대체 요소를 포함하여 모든 요소의 시각적인 부분을 화면에 그리는 작업
                    </p>

                    <p className="text-gray090 body-xs mt-[12px]">
                        <p className="body-sm">리플로우</p>
                        position, width, height, margin, padding, border, border-width, font-size, font-weight, line-height, text-align, overflow<br/>
                        <p className="body-sm mt-[4px]">리페인트</p>
                        background, color, text-decoration, border-style, border-radius
                    </p>

                    <p className="text-gray090 body-xs mt-[12px]">
                        <p className="body-md">-Compositing</p>
                        각 레이어를 올바른 순서로 합침,
                        이 과정에서 브라우저는 투명도, 변환, 클리핑 등의 효과를 적용.
                        최종적으로 페이지의 모든 요소들을 하나의 이미지로 합친다
                    </p>
                </div>
            </article>




            {/*시멘틱 태그를 지켜서 html을 구성해야하는 이유가 있나요?*/}
            {/*CSS transform과 position의 차이점에 대해 설명해주세요.*/}
            {/*Z-index와 스택 컨텍스트(stacking Context)가 어떻게 형성되는지 설명하세요.*/}
            {/*브라우저가 Reflow와 Repaint가 실행되는 시점에 대해서 설명해주세요.*/}
            {/*css 박스모델에 대해 설명해주세요*/}
            {/*Scene*/}
        </section>
    )

}