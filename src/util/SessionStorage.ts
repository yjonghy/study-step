export const setSessionItem = (key, value) => {
    if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, value)
    }
}

export const getSessionItem = (key) => {
    let value = ""
    if (typeof  window !== "undefined") {
        value = window.sessionStorage.getItem(key) || ""
    }
    return value
}

export const removeSessionItem = (key) => {
    if (typeof  window !== "undefined") {
        window.sessionStorage.removeItem(key)
    }
}


export const sessionKey = {
    signupDoneEmail : "signupDoneEmail",
    signupDonePw : "signupDonePw",
    mainScroll : "mainScroll",
    myListScroll : "myListScroll",
    innerCheck : "innerCheck",
    draftProcessCheck : "draftProcessCheck",
    imageLoad : "imageLoad",

    photoPopupClose : "photoPopupClose",
    photoListClose : "photoListClose"
}
