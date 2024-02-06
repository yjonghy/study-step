"use client"
import {useRouter} from "next/navigation";
const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px] gap-[8px]"


const csData = [
    {title_ : "http 버전 특징",  link : "/computer-science/http-version" },
    {title_ : "osi 7계층",  link : "/computer-science/osi" },
    {title_ : "tcp",  link : "/computer-science/tcp" },
]
export default function Cs() {

    const router = useRouter()

    return (
        <section className={parentStyle}>
            {csData.map((value, index) => (
                <div
                    key={index}
                    onClick={() => { router.push(value.link) }}
                    className="p-[8px] flex flex-col gap-[4px] bg-gray040 rounded-[8px] cursor-pointer">
                    <p className="body-md text-gray090">{value.title_}</p>
                </div>
            ))}
        </section>
    )

}