import React, { useRef, useState } from "react";
import { GhostPrimaryButton } from "@src/types/ButtonType";


export default function JavaScriptThis() {


    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px]">
            <p className="text-gray060 heading-xl">JavaScript에서의 this란</p>
            <p className="mt-[12px] text-gray060 body-lg whitespace-pre-wrap">
                자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 참조변수.<br />
                This의 바인딩{`(가리키는 값)`}은 함수 호출 방식에 의해 동적으로 결정된다.<br />
            </p>
            <p className="mt-[2px] text-gray050 body-md whitespace-pre-wrap">
                {`->`} 사전적 개념의 this, 이해하기 쉽게 나름의 해석을 붙여보면, <br />
                Java에서의 this와 비슷한 개념으로 시작했을것 같다. <br />
                this의 출발은 객체를 만들고 객체 자신을 호출해야 할때, 객체명을 다적어야하거나 하는 번거로움을 피하기 위해서 만들어지지 않았을까 추측해본다.<br />
                예를 들면,<br />
                {`class Person {
                    public string name = ""
                    public settingName (string : name) {
                        this.name => 쉽게 접근할수있다. 이것, 이클래스라는 의미로 보여 명확하다
                    }
                }`}<br />
                javascript의 특이한점은 호출 방식에 의해 동적으로 결정되는점.
            </p>

            <p className="mt-[24px] texy-gray060 heading-sm">this가 달라지는 함수 호출 방식</p>
            <div className="mt-[8px] flex flex-col gap-[4px] text-gray060 body-sm">
                <p>1. 기본 함수 호출 {`(default)`}</p>
                <p>2. 기본 함수 호출 {`(암시적)`}</p>
                <p>3. 기본 함수 호출 {`(명시적)`}</p>
                <p>4. 기본 함수 호출 {`(new)`}</p>
            </div>

            <p className="mt-[24px] texy-gray060 heading-sm">기본 함수 호출</p>
            <div className="mt-[8px] text-gray060 body-sm">
                기본적으로 this는 전역 객체를 가리킨다. {`(브라우저에서는 window객체)`} <br />
                {` const defaultFunction = () => { console.log(this) } `} <br />
                window 출력
            </div>

            <p className="mt-[24px] texy-gray060 heading-sm">객체의 메소드 호출</p>
            <div className="mt-[8px] text-gray060 body-sm whitespace-pre-wrap">
                메소드가 속한 객체에 바인딩. 객체가 메소드를 호출하는 형태<br />
                {`const testObj = { 
                        name : "유종현",
                        print : function () {
                            console.log(this)
                        } 
                    } 
                    testObj.print() -> { name : "유종현", print : f }
                 `} <br />
            </div>

            <p className="mt-[24px] texy-gray060 heading-sm">call/apply/bind 명시적 바인딩</p>
            <div className="mt-[8px] text-gray060 body-sm whitespace-pre-wrap">
                <img src="/call_apply.png" className="object-cover mb-[4px]" alt="ast" />
                {`-> 유종현 안녕하세요 / 유종현 반갑습니다`}<br />
                call과 apply는 첫번째인자를 함수에 쓰이는 this에 명시적으로 바인딩한다.<br />
                그냥 {`action("안녕하세요)`}로 호출할경우 this는 출력되지않는다.<br />
            </div>

            <div className="mt-[12px] text-gray060 body-sm whitespace-pre-wrap">
                bind도 첫번째 인자를 특정 함수 this에 바인딩하는건 같지만<br />
                call,apply 처럼 바로 호출하는게 아닌 this가 바인딩 되어진 새로운함수를 리턴한다.<br />
                <img src="/bind.png" className="object-cover my-[4px]" alt="ast" />
                함수를 호출하는것과 함수를 반환하는것에 큰 차이가 있다.<br />
                {`( bind()()로 바로실행가능, 콜백함수로 등록가능 )`}<br />
                {`console.log(apply()) // undefined`}<br />
                {`console.log(call()) // undefined`}<br />
                {`console.log(bind()) // function() {}`}<br />
            </div>


            <p className="mt-[24px] texy-gray060 heading-sm">생성자 함수 호출</p>
            <div className="mt-[8px] text-gray060 body-sm whitespace-pre-wrap">
                객체를 생성하는 생성자 함수 {`(new)`}를 통해 만들어진 객체의 this는 해당 인스턴스가 바인딩 <br />
                {`function Me(name : string) { 
                    this.name = name
                }
                const person = new Me("종현")
                console.log(person) // Me { name : "종현" }
                `}
            </div>

            <p className="mt-[24px] texy-gray060 heading-sm">*화살표 함수</p>
            <div className="mt-[8px] text-gray060 body-sm whitespace-pre-wrap">

            </div>
        </article>
    )
}

