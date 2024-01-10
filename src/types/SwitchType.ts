export interface ToggleType {
    bar : {
        width? : string;
        height? : string;
    },
    circle : {
        width? : string;
        height? : string;
    }
    gap : {
        top? : string
        left? : string
    }
    checked? : boolean;
    setChange? : any
}
