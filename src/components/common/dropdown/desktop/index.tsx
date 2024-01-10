import {DropDownType} from "@src/types/DropDownType";

const pcDropDownBg = "bg-white rounded-[12px] shadow-shadow16_15 p-[6px] w-full mt-[6px] overflow-auto max-w-[480px] max-h-[278px]"
const selectMenuStyle = "p-[12px] rounded-[8px] cursor-pointer hover:bg-gray010"

//transition duration-150 ease-in-out translate-y-[0] opacity-1
export const openAnimation = "block"
//transition duration-150 ease-in-out translate-y-[-120%] opacity-0
export const closeAnimation = "hidden"
export default function DesktopDropDown({data, title_, onSelect, onClose}: DropDownType) {
    return (
        <div id="drop_down" className={pcDropDownBg}>
            {data?.map((item, index) => (
                <div id={`drop_down_${item}`} key={index} onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onSelect(item)
                }} className={selectMenuStyle} >
                    {item}
                </div>
            ))}
        </div>
    )
}

