export const unComma = (str) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
};