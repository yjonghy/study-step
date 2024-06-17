const EmailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

export class DataValidation {
    inputData : any;
    start(value : any) {
        this.inputData = value
        return this
    }
    isString() {
        return typeof this.inputData === 'string'
    }
    isEmail() {
        return EmailRegExp.test(this.inputData)
    }
}