export const setItem = (key, value) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value)
    }
}

export const getItem = (key) => {
    let value = ""
    if (typeof  window !== "undefined") {
        value = window.localStorage.getItem(key) || ""
    }
    return value
}

export const removeItem = (key) => {
    if (typeof  window !== "undefined") {
        window.localStorage.removeItem(key)
    }
}


export const removeAllItem = () => {
    if (typeof  window !== "undefined") {
        window.localStorage.clear()
    }
}

export const localKey = {
    //isLogged : "usIsLogged",
    isVerify : "isVerify",
    isDelete : "isDelete",
    userInfoUS : "userInfoUS"
}
