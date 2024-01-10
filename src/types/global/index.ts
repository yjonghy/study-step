export {};

declare global {
    interface Window {
        gtag: any;
        fbq : any;
    }
}
declare namespace JSX {
    interface IntrinsicElements {
        "lottie-player": any;
    }
}