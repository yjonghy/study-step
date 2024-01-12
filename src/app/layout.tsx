"use client"
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Loader} from '@react-three/drei'

const inter = Inter({subsets: ['latin']})
import RouterButton from "@src/components/router-button";
import NavigationHeader from "@src/components/nav";


export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className="flex flex-col items-center relative">
                <main className={`relative
                w-full bg-gray030 min-h-screen h-full
                desktop:max-w-[2200px] 
                desktop:px-[48px] desktop:py-[48px]
                tablet:px-[32px] tablet:py-[32px] 
                mobile:px-[20px] mobile:py-[20px] 
                `}>

                    <section className={`
                    w-full h-full flex mobile:flex-col gap-[20px] z-[1] relative
                    `}>
                        <NavigationHeader />

                        <div className="w-full h-full">
                            <RouterButton />
                            {children}
                        </div>
                    </section>


                    <div className="w-full absolute top-0 left-0 h-[266px] blur-[8px]">
                        <img src="/banner.jpg" className="w-full h-full"/>
                    </div>
                </main>
            </body>

        </html>
    )
}
