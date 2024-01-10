"use client"

import {PlacelistType} from "@src/types/PlacelistType";
import process from "process";
import {comma} from "@src/util/setComma";
import Link from "next/link";
import Image from "next/image";

export const placeCardParent = `
    w-full grid 
    desktop:grid-cols-4 desktop:gap-x-[16px] desktop:gap-y-[24px]
    tablet:grid-cols-3 tablet:gap-x-[16px] tablet:gap-y-[24px]
    mobile:grid-cols-2 mobile:gap-x-[13px] mobile:gap-y-[24px]
`
export default function PlaceCard({ data } : PlacelistType) {

    return(
        // onClick={() => {window.open(`/place/${data.id}`, "_blank")}}
        <Link className="flex flex-col cursor-pointer" href={`/place/${data.id}`} target={"_blank"}>
            <img src={process.env.NEXT_PUBLIC_IMAGE_URL+data.coverImagePath+"?s=300x300&t=cover&q=80"} alt={"cover"} className="rounded-[8px] w-full aspect-[3/2] object-cover"/>
            {/*<Image src={process.env.NEXT_PUBLIC_IMAGE_URL+data.coverImagePath+"?s=300x200&t=cover&q=80"} alt={"thumbnail"}*/}
            {/*       className="rounded-[8px] w-full aspect-[3/2] object-cover" width={1} height={1}/>*/}
            <div className="flex flex-col">
                <div className="mt-[10px] body-xs text-gray090 break-all line-clamp-1 text-ellipsis">
                    {data.title}
                </div>
                <div className="mt-[2px] body-xs text-gray050 break-all line-clamp-1 text-ellipsis">
                    {data.city}, {data.state}
                </div>
                <div className="w-full flex justify-between mt-[8px]">
                    <div className="heading-sm text-gray090">${comma(data.price)}<span className="ml-[2px] body-sm">/ hr</span></div>
                </div>
            </div>
        </Link>
    )
}