import React, { useEffect, useState } from "react";




export default function NavigationHeader() {


    return (
        <>
            <header className="hidden mobile:block bg-white/70 rounded-[8px] rounded-[8px] sticky top-[20px] shadow-shadow15">
                <div className="flex items-center justify-center mt-[12px] gap-[8px]">
                    {/* <img src="/profile_v2.jpeg" className="w-[40px] h-[40px] rounded-full object-cover"/> */}
                    <p className="heading-sm text-gray080">유종현 /</p>
                    <p className="heading-xs text-gray080">whdgus9269@gmail.com /</p>
                    <p className="heading-xs text-gray080">01083889128 /</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-[20px] flex-1">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-gray080 heading-md">언어</p>
                        <p className="text-gray080 body-xs text-center mt-[4px]">JavaScript, TypeScript<br />마크업 언어 - HTML, CSS</p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 mt-[12px] mb-[20px]">
                        <p className="text-gray080 heading-md">라이브러리 및 프레임워크</p>
                        <p className="text-gray080 body-xs text-center mt-[4px]">React, Next.js</p>
                        <p className="text-gray080 body-xs text-center">tailwindcss, react-query, recoil, styled-component</p>
                    </div>
                </div>
            </header>


            <header className="mobile:hidden block py-[40px] rounded-[8px] px-[30px] bg-white/70 min-w-[300px] h-full sticky top-[20] shadow-shadow15">
                <div className="flex justify-center gap-[20px]">
                    <img src="/profile_v2.jpeg" className="w-[56px] h-[56px] min-w-[56px] min-h-[56px] rounded-full object-cover" alt="profile_image" />
                    <div>
                        <p className="heading-2xl text-gray080">유종현</p>
                        <p className="mt-[12px] heading-sm text-gray060">whdgus9269@gmail.com</p>
                        <div className="w-full flex gap-[10px] justify-start">
                            <p className="mt-[2px] heading-sm text-gray060">01083889128</p>
                            <p className="mt-[2px] heading-sm text-gray060">1997년생</p>
                        </div>
                        <a className="mt-[2px] heading-sm text-blue030 underline" href="https://github.com/yjonghy/study-step" target="_blank">깃헙 링크</a>
                    </div>
                </div>
                {/* <div className="flex flex-col items-center justify-center mt-[24px]">
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
                </div> */}
            </header>
        </>

    )
}