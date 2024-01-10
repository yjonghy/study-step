import React from "react";

export interface NotificationType {
    parentStyle? : string
    cardColor? : string
    sideColor? : string
    notificationIcon? : string
    notificationMessage? : string
    notificationButton? : string
    onClick? : any;
    children?: React.ReactNode;

}
