import React, {useEffect, useState} from "react";

export default function NavigationHeader() {


    return (
        <>
            <header className="hidden mobile:block bg-white">
            </header>
            <header className="mobile:hidden block pt-[25px] pb-[16px] px-[30px] bg-white w-[300px] min-w-[300px] h-full">
                <div className="flex flex-col items-center justify-center">
                    <img src="/profile.jpeg" className="w-[110px] h-[110px] rounded-full object-cover"/>
                    <p className="mt-[20px]">유종현</p>
                </div>
            </header>
        </>

    )
}