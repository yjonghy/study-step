"use client"
import React, {useEffect} from "react";

function Bang() {

    function solution(my_str, n) {
        let answer = [];
        return answer;
    }
    const connection = () => {

    }

    return (
        <div className="flex flex-col justify-center items-center">
            {/*  내 보드판  */}
            {/* 상단 체력바 */}
            {/* 3칸짜리 왼쪽 총 가운데 직업 오른쪽 역할 */}
            {/* 상대방 보드판 같은 형삭 */}
            {/* 장착 아이템은 개수 상관없이 배치 가능 어디에 놓을지 적어도 카드 설명은 보여야 할것같은데 */}
            <section id="my_board" className="flex flex-col">
                <div id="healthy_bar" className="flex gap-[4px]">
                    {[0,0,0,0].map((value, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center w-[10px] h-[20px]">
                        </div>
                    ))}
                </div>
            </section>

            <p className="text-gray090 text-[40px] mt-20">뱅 닷지시티</p>
            <div className="text-gray090 mt-3.5">현재 차례 : 누구누구</div>

            <div className="w-[900px] h-[900px] opacity-10 bg-yellow010 border border-gray080 flex justify-center items-center">
                <div className="">


                </div>
                {/*
                    정중앙 카드 더미
                    버린 카드
                    아이템 효과 일러...? => 텍스트로 표현ㄴ
                */}
                <div className="w-[600px] h-[600px] opacity-10 bg-yellow010 border border-gray080 flex justify-center items-center">
                    <div className="w-[300px] h-[300px] opacity-10 bg-yellow010 border border-gray080">
                    </div>
                </div>
            </div>
        </div>)
}

export default Bang