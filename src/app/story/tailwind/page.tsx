"use client";
const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"

export default function TailWindStory() {
    return (
        <article className={parentStyle}>
            <p>Tailwind CSS 작업 회고</p>
            <p className="w-full body-md text-gray080 break-all">
                <br/><br/>
                <p>Tailwind CSS 장점</p>
                우선 개발 속도가 매우 빠르다.<br/>
                컴포넌트를 작성하며 굳이 다른 파일을 열거나 갔다 올 필요 없이 바로바로 클래스 명을 적어주며 스타일을 확인할 수 있다.<br/>
                또한, custom이 매우 용이하다. tailwind.config.js 파일을 통해 custom을 할 수 있으며, 대괄호 형식으로 정해진 수치가 아닌 원하는 수치를 지정할 수
                있다.<br/>
                그리고 한번 익숙해지면 클래스 명을 보는 순간 명확하게 무슨 레이아웃인지 감을 잡을 수 있다.<br/>
                해당의 요소의 position, display 속성이 뭔지 코드를 보고 대강 UI를 짐작할 수 있다.<br/>
                <br/><br/>
                <p>Tailwind CSS 장점</p>
                단점도 존재한다. 먼저, 클래스 명이 길어진다. 이는 풍습을 통해 해결할 수 있지만, 기본적인 클래스 명은 길다.<br/>
                예를 들면 크기와 position, 그리고 flex 지정 후 가운데 정렬, 해당 레이아웃에 padding 추가, rounded 추가, 그림자 추가 등등을 넣게 되면 아마<br/>
                className=w-full h-full relative flex items-center justify-center p-[20px] rounded-[12px] shadow-shadow
                15<br/>
                처처럼 생각보다 길어질 수 있다. custom 부분은 공통적인 UI들의 클래스는 따로 상수를 만든 뒤에 작업하는 방식 등으로 작업을 했었다.<br/>
                cons boxLayout = w-full h-full relative flex items-center justify-center p-[20px] rounded-[12px]
                shadow-shadow 15<br/>
                className=boxLayout<br/>
                <br/><br/>
                <p>그 외 헤맸던 부분</p>
                style을 동적으로 바꾸려 할때 대괄호 안에서 바꾸는게 아닌 클래스명 자체를 바꿔줘야 한다는것<br/>
                예를 들면<br/>
                {`className={\`w-[\${on ? '100px' : '200px'}]\`}`}<br/>
                위와같은 방식으로 동적으로 생성된 클래스는 Tailwind가 인식하지 않는다<br/>
                {`className={\`\${on ? 'w-[100px]' : 'w-[200px]'\`}`}<br/>
                위와 같은 방식으로 작성해야 한다.<br/>
            </p>


            

        </article>
    )
}