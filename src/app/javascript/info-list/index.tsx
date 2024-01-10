
const headerStyle = "body-sm text-gray040"
const contentStyle = "body-sm text-gray080"

export default function  InfoList(props: any){

    return(
        <article className="w-full flex flex-col justify-center items-center border border-blue030 py-[8px] px-[4px] rounded-[12px]">

            <div className="w-full bg-white flex flex-col items-start gap-[4px] mt-[40px] px-[40px] rounded-[24px]">

                <div className="w-full flex pt-[20px] gap-[16px]">
                    <div className="flex flex-col w-[140px]">
                        <p className={`py-[8px] ${headerStyle}`}>문서 번호</p>
                        <p className={`py-[8px] ${headerStyle}`}>문서 이름</p>
                    </div>


                    <div className="flex flex-col w-full">
                        <p className={`py-[8px] ${contentStyle}`}>{props.index}</p>
                        <p className={`py-[8px] ${contentStyle}`}>{props.title}</p>
                    </div>
                </div>


                <div className="my-[24px] bg-gray025 h-[1px] w-full"></div>


                <div className="w-full flex pb-[20px] gap-[16px]">
                    <div className="flex flex-col w-[140px]">
                        <p className={`py-[8px] ${headerStyle}`}>문서 난이도</p>
                        <p className={`py-[8px] ${headerStyle}`}>문서 작성날짜</p>
                    </div>


                    <div className="flex flex-col w-full">
                        <p className={`py-[8px] ${contentStyle}`}>
                            이름
                        </p>
                        <p className={`py-[8px] ${contentStyle}`}>
                            이름1
                        </p>
                    </div>
                </div>
            </div>



            <div
                onClick={() => { props.showMessageDetail(props.data) }}
                className="ml-[40px] flex justify-center items-center cursor-pointer bg-hourblue rounded-[8px] h-[45px] w-[120px]">
                <p className="text-white body-sm">자세히 보기</p>
            </div>
        </article>
    )
}