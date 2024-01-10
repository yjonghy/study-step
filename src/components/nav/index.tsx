import React, {useEffect, useState} from "react";
import Button from "@src/components/common/button";
import process from "process";
import {useRef} from "react";

const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL + "web/icon/ic-default-profile.svg"
const navMenuStyle = "body-md text-gray090 px-[16px] py-[12px] cursor-pointer"
const menuParentStyle = `absolute top-[100%] bg-white p-[6px] flex flex-col shadow-shadow16_15 z-[51] rounded-[8px] min-w-[246px]
                         desktop:right-[48px]
                         tablet:right-[32px]
                         mobile:right-0`


export default function NavigationHeader() {


    return (
        <>
            <header className="hidden mobile:block bg-white">
                {/*<div id="hour_head_mobile"*/}
                {/*     className={`*/}
                {/*            w-full min-h-[54px] fixed top-0 left-0 z-50 backdrop-blur-[40px] px-[20px] */}
                {/*            ${pathName.includes("search") || pathName.includes("message") || pathName.includes("inbox") ? "bg-white" : "bg-white/50"}`}>*/}
                {/*    <div className="relative flex justify-between min-h-[54px]">*/}
                {/*        <Link*/}
                {/*            onClick={() =>  { pathName === "/" && window.scrollTo(0, 1) } }*/}
                {/*            href={"/"} className='flex justify-start items-center w-[48px] h-[48px]'>*/}
                {/*            <img src={process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL +"web/icon/m_logo.svg"} alt={"hourplace"}/>*/}
                {/*        </Link>*/}
                {/*        <div*/}
                {/*            ref={profileRef}*/}
                {/*            onClick={() => setMenuPopup(!menuPopup)}*/}
                {/*            className="w-[48px] h-[48px] flex justify-end items-center cursor-pointer self-center">*/}
                {/*            <img ref={mobileBurgerBtnRef} src={icDir+"ic-menu.svg"} alt={"menu"}/>*/}
                {/*        </div>*/}
                {/*        {menuLayout()}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div style={{height: `${headerBgHeight}px`}} className="bg-transparent w-full min-h-[54px]"></div>*/}
            </header>

            <header className="mobile:hidden block pt-[25px] pb-[16px] px-[30px] bg-white w-[300px] min-w-[300px] h-full">

                <div className="flex flex-col items-center justify-center">
                    <img src="/profile.jpeg" className="w-[110px] h-[110px] rounded-full object-cover"/>
                    <p className="mt-[20px]">유종현</p>
                </div>


                {/*<div id="hour_head"*/}
                {/*     className={`*/}
                {/*            w-screen min-h-[86px] fixed top-0 left-0 z-50 backdrop-blur-[40px] flex justify-center*/}
                {/*            ${pathName.includes("search") || pathName.includes("message") || pathName.includes("inbox") ? "bg-white" : "bg-white/50"}`}>*/}


                {/*        <div className="flex justify-between py-[22px] w-full max-w-[1320px] px-[48px] tablet:px-[32px] relative">*/}

                {/*        <Link className="cursor-pointer h-[34px] w-[124px] min-w-[124px]" href={"/"}>*/}
                {/*            /!* 아워플레이스 로고 *!/*/}
                {/*            <img className="w-full h-full" src={process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL +"web/icon/Logo.svg"} alt={"hourplace"}/>*/}
                {/*        </Link>*/}


                {/*        <div className={`flex items-center w-full justify-end*/}
                {/*            ${(pathName.includes("place/register") || pathName.includes("/edit/")) && `hidden`}`}>*/}

                {/*           <Link href={"/info/hosting"} className={`text-gray090 heading-sm  ${GhostPrimaryButton} ${SmallBtnStyle} ${MotionFast} rounded-[100px] px-[16px]`}>List your space</Link>*/}

                {/*            /!*"?s=300x300&t=cover&q=80&f=png"*!/*/}


                {/*            /!*w-[36px] h-[36px]*!/*/}
                {/*            {(!loading && logged) &&*/}
                {/*                <div className={`mobile:hidden relative w-fit mr-[8px] ml-[2px]`} onClick={() => router.push("/inbox")}>*/}
                {/*                    <div className={`flex items-center justify-center ${GhostPrimaryButton} ${MotionFast} rounded-[100px] w-[36px] h-[36px] ml-[2px]`}>*/}
                {/*                        <img src={icDir + "ic-mail.svg"} className="w-[18px] h-[18px]"/>*/}
                {/*                    </div>*/}
                {/*                    /!* w-[36px] h-[36px] *!/*/}

                {/*                    <div className={`absolute top-0 left-[18px] right-0  ${messageCount === 0 && `hidden`}`}>*/}
                {/*                        <div className="bg-hourblue border-white border-[1.5px] rounded-[20px] pr-[4.5px] pl-[4.5px] min-w-[17px] w-fit*/}
                {/*                    flex justify-center items-center text-white text-[10px] leading-[15px] tracking-[-0.2px] font-bold ">*/}
                {/*                            {messageCount >= 100 ? "99+" : messageCount}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            }*/}


                {/*            {!loading ?*/}
                {/*                logged ?*/}
                {/*                    (<img*/}
                {/*                        ref={profileRef}*/}
                {/*                        onClick={() => setMenuPopup(!menuPopup)}*/}
                {/*                        className={`min-w-[42px] w-[42px] h-[42px] max-h-[42px] rounded-[100px] cursor-pointer object-cover ml-[8px]`}*/}
                {/*                        src={user.image_url !== "" ? process.env.NEXT_PUBLIC_IMAGE_URL + user.image_url+ "?s=200x200&t=inside&q=80&f=jpeg" : defaultImage}*/}
                {/*                        alt={"profile_image"}/>) :*/}
                {/*                    (<Button*/}
                {/*                        onClick={() => setLoginPopup(true)}*/}
                {/*                        btnStyle={`${PrimaryButton} ${SmallBtnStyle} ${MotionFast} px-[16px]`}*/}
                {/*                        text={{value: "Sign in", style: "heading-sm text-white"}}/>) : <></>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        {menuLayout()}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div style={{height: `${headerBgHeight}px`}} className="bg-transparent w-full min-h-[86px]"></div>*/}
            </header>
        </>

    )
}