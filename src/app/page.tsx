import Image from 'next/image'
import Link from "next/link";


const studyList = ["html-css", "javascript", "react", "next", "cs"]
export default function Home() {
    return (
        <main className="flex flex-col">

            <section className="flex flex-col items-start">
                <p className="text-gray080 ">study list</p>
                {studyList.map((value, index) => (
                    <div className="w-full py-[14px] px-[16px] bg-yellow060">
                        <Link href={`/${value}`} target={"_blank"}>
                            {value}
                        </Link>
                    </div>
                ))}

            </section>
        </main>
    )
}
