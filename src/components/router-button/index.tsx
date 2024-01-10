import React from "react";
import { useRouter, usePathname } from 'next/navigation';

const btnDefaultStyle = "flex justify-center items-center cursor-pointer py-[4px] px-[8px] rounded-[8px]"

export default function RouterButton() {

    const router = useRouter()
    const pathName = usePathname()


    const goPage = (value : string) => { router.push(value) }


    return (
        <nav className="flex gap-[10px]">
            <div
                onClick={() => goPage("/html-css")}
                className={`${btnDefaultStyle}`}>
                <p>
                    html/css
                </p>
            </div>

            <div
                onClick={() => goPage("/javascript")}
                className={`${btnDefaultStyle}`}>
                <p>
                    javascript/typescript
                </p>
            </div>


            <div
                onClick={() => goPage("/react")}
                className={`${btnDefaultStyle}`}>
                <p>
                    React
                </p>
            </div>

            <div
                onClick={() => goPage("/next")}
                className={`${btnDefaultStyle}`}>
                <p>
                    Next
                </p>
            </div>

        </nav>
    )
}