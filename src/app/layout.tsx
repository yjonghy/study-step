"use client"
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Loader} from '@react-three/drei'

const inter = Inter({subsets: ['latin']})
import 'bootstrap/dist/css/bootstrap.css'
import RouterButton from "@src/components/router-button";
import NavigationHeader from "@src/components/nav";


export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className="flex flex-col items-center relative">
                <main className={`
                w-full bg-gray030 min-h-screen h-full
                desktop:max-w-[2200px] 
                desktop:px-[48px] desktop:py-[48px]
                tablet:px-[32px] tablet:py-[32px] 
                mobile:px-[20px] mobile:py-[20px] 
                `}>
                    <section className={`
                    w-full h-full flex mobile:flex-col gap-[20px]  
                    `}>
                        <NavigationHeader />

                        <div className="w-full h-full">
                            <RouterButton />
                            {children}
                        </div>
                    </section>
                </main>
                {/*<HourFooter/>*/}
            </body>

        </html>
    )
}
