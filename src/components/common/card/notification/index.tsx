"use client"
import {NotificationType} from "@src/types/card/NotificationType";
import TextButton from "@src/components/common/button/text";

const layoutStyle = "relative rounded-[8px] overflow-hidden flex flex-col"
const sideStyle = "absolute h-full w-[4px] left-0"
const IcStyle = "w-[15px] h-[15px] self-center"
const messageStyle = "self-center py-[16px] mx-[12px] body-sm text-gray090"
const buttonParentStyle = "flex flex-col gap-[1px] self-center mr-[16px] cursor-pointer"

const buttonStyle = "border-gray090 whitespace-nowrap heading-sm text-gray090"

export default function NotificationCard(
    {
        parentStyle, cardColor, sideColor, notificationButton,
        notificationIcon, notificationMessage, onClick, children
    }: NotificationType) {

    return (
        <div className={`${parentStyle} ${cardColor} ${layoutStyle}`}>
            <div className="flex justify-between space-between">
                <div className={`${sideColor} ${sideStyle}`}></div>
                <div className="ml-[16px] flex">
                    <img src={notificationIcon} alt="notification_icon" className={IcStyle}/>
                    <p className={messageStyle}>{notificationMessage}</p>
                </div>
                {notificationButton &&
                    <div className={buttonParentStyle}>
                        <TextButton
                            style={buttonStyle}
                            text={notificationButton}
                            onClick={onClick}
                        />
                    </div>}
            </div>
            {children && children}
        </div>
    )
}

