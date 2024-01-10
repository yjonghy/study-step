import BottomDropDown, {
    dropdownContent, mobileCloseAnimation,
    mobileOpenAnimation,
    parentCloseAnimation,
    parentOpenAnimation
} from "@src/components/common/dropdown/mobile";
import DesktopDropDown, {closeAnimation, openAnimation} from "@src/components/common/dropdown/desktop";
import {DropDownType} from "@src/types/DropDownType";
import {useMediaQuery} from "react-responsive";
import {useEffect, useRef} from "react";


export const dropdownInputType = "desktop:relative"
export default function Dropdown ({data, title_, onSelect, onClose, show}: DropDownType) {

    const isMobile_Tablet = useMediaQuery({ query: "(max-width:1023px)" });

    const desktopRef = useRef(null)

    useEffect(() => {
        if (show && !isMobile_Tablet) desktopRef.current.scrollIntoView({ behavior: "smooth" })
    }, [show]);

    const stopEvent = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        isMobile_Tablet ?
            <div
                onClick={(event) => {
                    stopEvent(event)
                    onClose()
                }}
                className={`bg-dim fixed bottom-0 left-0 z-10
                ${show ? `${parentOpenAnimation}` : `${parentCloseAnimation}`}`}>
                {/*bottom-0 left-0 */}
                {/*bottom-[-100%] left-[-100%] */}
                <div
                    onClick={event => stopEvent(event)}
                    id="drop_down"
                     className={`${dropdownContent} 
                     ${show ? mobileOpenAnimation : mobileCloseAnimation} `}>
                    <BottomDropDown
                        onClose={onClose}
                        title_={title_}
                        data={data}
                        onSelect={onSelect}/>
                </div>
            </div> :
            <div ref={desktopRef}
                className={`absolute top-[100%] w-full z-10
                ${show ? openAnimation : closeAnimation}`}>
                <DesktopDropDown
                    data={data}
                    onSelect={onSelect}/>
            </div>
    )
}