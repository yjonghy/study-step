"use client"

export default function EventLoop() {
    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px]">
            <p className="text-gray060 heading-xl">Event Loop</p>
            <div className="text-gray060 body-sm mt-[20px]">
                우선 정확하게 알아야 할 부분.
                Event Loop !== Javascript Engine 
                Event Loop는 JS 런타임 환경의 일부다. 
                JS 런타임은 이벤트 루프, 콜백 큐, Web APIs(브라우저 런타임 기준) 등을 포함하는 더 넓은 개념이다. 
                이들은 엔진위에서, 엔진과 같이 동작한다.
            </div>


            <p className="mt-[12px] text-gray060 body-lg whitespace-pre-wrap">
                1 - javascript는 단일(싱글)스레드 언어이다.
                1.1 - js 엔진에 힙과 콜스택의 메모리 공간존재
                1.2 - 힙엔 생성한 변수(객체)저장, 실행할 코드들은 콜스택에 저장 선입후출 형태로 코드 실행
                2 - 이벤트루프를 통하여, 비동기 방식으로 동시성을 지원한다.
                2.1 - 이벤트루프 모델은 큐에 담아있는 비동기처리가 끝난 함수들을 실행하는데, 콜스택이 비어있을 경우 큐에 있는 함수들을 콜스택에 전달 후 실행
                2.2 - Web API {`->`} 브라우저가 제공하는 api모음 (setTimeout, XMLHttpRequest 등)
                2.3 - 코드실행중 비동기함수(Web API, Promise API 등)를 만나면 해당 api에서 코드 실행 후 콜백큐에 처리결과를 담는다
                * 콜백큐
                1. 태스크 큐 (매크로 태스크큐)
                - setTimeout, setInterval 등
                2. 마이크로 태스크 큐
                - Promise, async/awit 등
                우선순위는 {`2 > 1`} 이다 (Promise가 setTimeout보다 먼저 실행되는 이유)
            </p>


        </article>
    )
}