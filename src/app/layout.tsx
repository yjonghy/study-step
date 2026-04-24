"use client"
import './globals.css'
import {usePathname} from "next/navigation";
import NavigationHeader from "@src/components/nav";
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
                    <body className="flex flex-col items-center relative bg-gray010">
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
                                        {children}
                                    </div>
                                </section>
                            </main>
                        </>
                    }
                    </body>
                </RecoilRoot>
            </QueryClientProvider>
        </html>
    )
}
