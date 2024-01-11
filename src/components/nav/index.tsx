import React, {useEffect, useState} from "react";

export default function NavigationHeader() {


    return (
        <>
            <header className="hidden mobile:block bg-white">
            </header>
            <header className="mobile:hidden block pt-[25px] pb-[16px] px-[30px] bg-white w-[300px] min-w-[300px] h-full">
                <div className="flex flex-col items-center justify-center">
                    <img src="/profile.jpeg" className="w-[110px] h-[110px] rounded-full object-cover"/>
                    <p className="mt-[20px] heading-md text-gray080">유종현</p>
                    <p className="mt-[12px] heading-sm text-gray080">whdgus9269@gmail.com</p>
                    <p className="mt-[2px] heading-sm text-gray080">01083889128</p>
                </div>


                <div className="flex flex-col items-center justify-center mt-[24px]">
                    <p className="text-gray080 heading-xl">Stack</p>
                    <div className="flex flex-col items-center justify-center mt-[12px]">
                        <p className="text-gray080 heading-sm">언어</p>
                        <p className="text-gray060 body-sm text-center mt-[4px]">JavaScript, TypeScript<br/>마크업 언어 - HTML, CSS</p>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-[20px]">
                        <p className="text-gray080 heading-sm">라이브러리 및 프레임워크</p>
                        <p className="text-gray060 body-sm text-center mt-[4px]">React, Next.js</p>
                        <p className="text-gray060 body-sm text-center">tailwindcss, react-query, recoil, styled-component</p>
                    </div>
                </div>

            </header>
        </>

    )
}