import {useRouter} from "next/navigation";
// import {useGetMessageDetail} from "@src/hook/query/place";
// import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
// import {userIdOnClickInMessageDetail, userInfo} from "@src/atom/user";
// import {requestOptions} from "@src/libs/auth";
import {useEffect, useState} from "react";

const headerStyle = "body-sm text-gray040"
const contentStyle = "body-sm text-gray080"

export default function  InfoListDetail(props: any){


    const router = useRouter()
    // const user = useRecoilValue(userInfo)
    const [detailData, setDetailData] = useState(null)
    const [messageArray, setMessageArray] = useState([])

    // const [userCheckId ,setUserClickId] = useRecoilState(userIdOnClickInMessageDetail)


    // function goUserDetail(userId : number) {
    //     setUserClickId(userId)
    // }
    //
    // useEffect(() => {
    //     if (userCheckId !== 0) {
    //         router.push("/user")
    //     }
    // }, [userCheckId])
    //
    // const getMessageDetailQuery = useGetMessageDetail(props.data.placeId, props.data.questionUserId, requestOptions(user))

    // useEffect(() => {
    //     if (!getMessageDetailQuery.isLoading && getMessageDetailQuery.isSuccess) {
    //         if (getMessageDetailQuery.data.data.error === "") {
    //             const array = [...getMessageDetailQuery.data.data.result.message]
    //
    //             console.log(getMessageDetailQuery.data.data.result)
    //             setMessageArray(array)
    //             setDetailData(getMessageDetailQuery.data.data.result)
    //         }
    //     }
    // }, [getMessageDetailQuery.isLoading])

    const commonOption : Intl.DateTimeFormatOptions = {
        hourCycle : "h23",
        year : "numeric",
        day : "numeric",
        weekday : "short",
        hour : "2-digit",
        minute : "numeric",
        second : "numeric",
        timeZone : new Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    const resultOption = commonOption
    resultOption.month = "short"
    const resultFormatter =  new Intl.DateTimeFormat('kr', resultOption)

    const partsOffset = (dtf : Intl.DateTimeFormat, date) => {
        const typePos = { weekday:0, day : 1, month: 2, year: 3, hour : 4, minute: 5, second : 6 }
        const formatted = dtf.formatToParts(date), filled = []
        for (let i = 0; i < formatted.length; i++) {
            const { type, value } = formatted[i], pos = typePos[type]
            if (pos !== undefined) filled[pos] = value
        }
        return filled
    }

    const convertString = (data) => {
        let resultDate = new Date(data * 1000)
        let origin = partsOffset(resultFormatter, resultDate)
        let period = origin[4] >= 12 ? "PM" : "AM"
        let time = origin[4] > 12 ? origin[4] - 12 : origin[4]
        time = time.length >= 2 &&  time[0] === "0" ? time[1] : time
        return `${origin[3]}년${origin[2]}${origin[1]}일 ${origin[0]}요일 ${period} ${time}:${origin[5]}`
    }




    return(
        <article className="w-full flex flex-col justify-center items-center h-[1000px] overflow-y-hidden">

            <div
                onClick={() => {props.closeDetail()}}
                className="mt-[40px] py-[12px] self-start flex justify-center items-center cursor-pointer bg-hourblue rounded-[8px] h-[45px] w-[120px]">
                <p className="text-white body-sm">뒤로가기</p>
            </div>



            <div className="w-full bg-white flex flex-col items-start gap-[4px] mt-[40px] px-[40px] rounded-[24px]">

                <div className="w-full flex pt-[20px] gap-[16px]">
                    <div className="flex flex-col w-[140px]">
                        <p className={`py-[8px] ${headerStyle}`}>장소 번호</p>
                        <p className={`py-[8px] ${headerStyle}`}>장소명</p>
                    </div>


                    <div className="flex flex-col w-full">
                        <p className={`py-[8px] ${contentStyle}`}>
                            {detailData !== null && detailData.placeId}
                            {detailData !== null &&
                                <a
                                    href={`/place/${detailData.placeId}`}
                                    target={"_blank"}
                                    referrerPolicy={"no-referrer"}
                                    className="ml-[8px] text-blue030 heading-sm cursor-pointer inline-block">상세보기</a>
                            }
                        </p>
                        <p className={`py-[8px] ${contentStyle}`}>
                            {detailData !== null && detailData.title}
                        </p>
                    </div>
                </div>


                <div className="my-[24px] bg-gray025 h-[1px] w-full"></div>


                <div className="w-full flex pb-[20px] gap-[16px]">
                    <div className="flex flex-col w-[140px]">
                        <p className={`py-[8px] ${headerStyle}`}>발신인</p>
                        <p className={`py-[8px] ${headerStyle}`}>수신인</p>
                    </div>


                    <div className="flex flex-col w-full">
                        <p className={`py-[8px] ${contentStyle}`}>
                            {/*{detailData !== null && `${detailData.questionUserFirstName} ${detailData.questionUserLastName}`}*/}
                            {/*<span*/}
                            {/*    onClick={() => goUserDetail(detailData.questionUserId)}*/}
                            {/*    className="ml-[8px] text-blue030 heading-sm cursor-pointer">상세보기</span>*/}
                        </p>
                        <p className={`py-[8px] ${contentStyle}`}>
                            {/*{detailData !== null && `${detailData.placeUserFirstName} ${detailData.placeUserLastName}`}*/}
                            {/*<span*/}
                            {/*    onClick={() => goUserDetail(detailData.placeUserId)}*/}
                            {/*    className="ml-[8px] text-blue030 heading-sm cursor-pointer">상세보기</span>*/}
                        </p>
                    </div>
                </div>
            </div>


            <article className="w-full mt-[35px] bg-white flex flex-col items-start px-[40px] rounded-[24px] pt-[24px] overflow-y-auto">


                {(detailData !== null && messageArray.length >= 1) && messageArray.map((value) =>  (
                    <div className="w-full" key={value.id}>
                        <div className="w-full bg-white flex flex-col items-start gap-[4px] mt-[4px]">
                            <p className="heading-md text-gray080">{value.firstName} {value.lastName}</p>
                            <p className="body-md text-gray080">{value.message}</p>
                            <p className="body-xs text-gray050">{convertString(value.createdAtTimeStamp)}</p>
                        </div>
                        <div className="my-[24px] bg-gray025 w-full h-[1px]"></div>
                    </div>
                ))}
            </article>

        </article>
    )
}