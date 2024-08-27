
import React, { useEffect, useRef, useState } from "react";
import { GhostPrimaryButton } from "@src/types/ButtonType";


export default function JavaScriptLazyEvaluation() {

    useEffect(() => {
        const testArray : number[] = [1,2,3,4]
        console.log(testArray)
    }, [])


    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px]">
            <p className="text-gray060 heading-xl"> 제너레이터와 이터레이터(지연평가)</p>
       

            <p>
                이터러블 - 자료를 반복할수 있는 객체 (array 역시 이터러블 객체이다.) 
                이터러블 이라는 개념을 사용하면 어떤 객체에든 for..of 반복문을 적용 가능
                * 이터레이터를 리턴하는 [Symbol.iterator]() 메서드를 가진 객체 *
                arr[Symbol.iterator] = null;
                for(const a of arr) console.log (a) // 에러 발생 
            </p>

            <p>
                이터레이터
                {`{value : 값 , done : true/false} 형태의 이터레이터 객체를 리턴하는 next() 메서드를 가진 객체.`}
            </p>

            <p>제너레이터</p>
        </article>
    )
}

