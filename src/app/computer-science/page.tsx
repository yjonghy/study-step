"use client"
import {useRouter} from "next/navigation";
const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"


const csData = [
    {title_ : "http 버전 특징",  link : "/computer-science/http-version" }

]
export default function Cs() {

    const router = useRouter()

    return (
        <article className={parentStyle}>
            {csData.map((value, index) => (
                <div
                    key={index}
                    onClick={() => { router.push(value.link) }}
                    className="p-[8px] flex flex-col gap-[4px] bg-gray040 rounded-[8px]">
                    <p className="body-md text-gray090">{value.title_}</p>
                </div>
            ))}
        </article>
    )

}