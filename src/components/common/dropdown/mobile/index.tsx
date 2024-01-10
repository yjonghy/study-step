"use client"
import {DropDownType} from "@src/types/DropDownType";
import Button from "@src/components/common/button";
import {LargeBtnStyle, PrimaryButton} from "@src/types/ButtonType";

const selectMenuStyle = "my-[12px] rounded-[12px] cursor-pointer hover:bg-gray010 py-[12px] px-[16px]"


//transition opacity-1
export const parentOpenAnimation = "w-full h-full"

//transition delay-[150ms] opacity-0
export const parentCloseAnimation = "w-0 h-0"
export const dropdownContent = "bg-white bottom-0 rounded-t-[12px] shadow-shadow16_15 mobile:px-[20px] tablet:px-[16px] py-[6px] w-full absolute overflow-y-auto max-h-[40%]"

//transition duration-150 ease-in-out bottom-0
export const mobileOpenAnimation = "block"

//transition duration-150 ease-in-out translate-y-[100%]
export const mobileCloseAnimation = "hidden"
//translate-y-[100%]

//translate-y-[-100%]
export default function BottomDropDown({data, title_, onSelect, onClose}: DropDownType) {

    return (
        <>
            <div className="my-[20px]">{title_}</div>
            {data?.map((item, index) => (
                <div id={`drop_down_${item}`} key={index} onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onSelect(item)
                }} className={selectMenuStyle}>
                    {item}
                </div>
            ))}
            <Button
                onClick={onClose}
                btnStyle={`${PrimaryButton} ${LargeBtnStyle} mt-[24px] w-full`}
                text={{value: "Back", style: "heading-md text-white"}}/>
        </>
    )
}