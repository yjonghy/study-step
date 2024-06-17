"use client"
import {BlueButton, PrimaryButton, SecondaryButton, SmallBtnStyle} from "@src/types/ButtonType";
import {useRouter} from "next/navigation";


const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px] gap-[20px]"
export default function Story() {

    const router = useRouter()

    
    for (let a = 0; a < 10; a++) {
        console.log(a)
    }



    return (
        <section className={parentStyle}>
            <div
                onClick={() => { router.push("/story/tailwind")  }}
                className={`${PrimaryButton} ${SmallBtnStyle} px-[12px] rounded-[8px]`}>
                <p className="text-white heading-md">Tailwind CSS 사용 후기</p>
            </div>
            <div
                onClick={() => { router.push("/story/recoil")  }}
                className={`${PrimaryButton} ${SmallBtnStyle} px-[12px] rounded-[8px]`}>
                <p className="text-white heading-md">Recoil 사용 후기</p>
            </div>


            <p>
                까먹을까봐 적는 후기
                백엔드쪽에서 content-type 을 명시적으로 지정하여 나올수있는 415에러의 경우
                axios를 통하여 통신하고 있다면 벡엔드와의 커뮤니케이션이 필요하다,
                get이거나 post요청에서 parameter가 비어있을경우
                axios는 헤더에 content-type를 추가하지않아서
                interceptors에서 추가를 하든 axios객체에서 config를 추가를 하든
                헤더에 content-type이 추가시키지않고 뺀다
            </p>

        </section>
    )
}