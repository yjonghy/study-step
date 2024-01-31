export const EmailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
export const PasswordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
export const NumberRegExp = /^[0-9]+$/;
export const LinkExp = /^(\S)+\.(\S)+$/i;

export const LinkProtocolExp = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]/i;