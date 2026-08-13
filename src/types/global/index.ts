export {};

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        fbq : any;
    }
}
declare namespace JSX {
    interface IntrinsicElements {
        "lottie-player": any;
    }
}
