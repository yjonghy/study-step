"use client"
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Loader} from '@react-three/drei'
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ['latin']})
import RouterButton from "@src/components/router-button";
import NavigationHeader from "@src/components/nav";
import {useEffect} from "react";
import {RecoilRoot} from "recoil";
import Toast from "@src/components/common/toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";



export default function RootLayout({children}: any) {
    const pathName = usePathname()



    const queryClient = new QueryClient();
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Toast/>
                    <body className="flex flex-col items-center relative bg-gray030">
                    {pathName.includes("three") ?
                        <main className="w-full h-full">
                            {children}
                        </main>
                        :
                        <>
                            <main className={`relative
                                              w-full min-h-screen h-full
                                              desktop:max-w-[2200px] 
                                              desktop:px-[48px] desktop:py-[48px]
                                              tablet:px-[32px] tablet:py-[32px] 
                                              mobile:px-[20px] mobile:py-[20px]`}>
                                <section className={`w-full h-full flex mobile:flex-col gap-[20px] z-[1] relative`}>
                                    <NavigationHeader/>
                                    <div className="w-full h-full">
                                        {!pathName.includes("template") && <RouterButton/>}
                                        {children}
                                    </div>
                                </section>
                            </main>
                            {/* <div className="w-screen absolute top-0 left-0 h-[266px] blur-[8px]">
                                <img src="/banner.jpg" className="w-full h-full object-cover"/>
                            </div> */}
                        </>
                    }
                    </body>
                </RecoilRoot>
            </QueryClientProvider>
        </html>
    )
}
