import { useEffect, useRef } from "react"

import lottie from "lottie-web"

interface LottieProps {
    animationData: any
    width: number
    height: number
    loop : boolean
}

export const Lottie = ({ animationData, width, height, loop }: LottieProps) => {
    const element = useRef<HTMLDivElement>(null)
    const lottieInstance = useRef<any>()
    useEffect(() => {
        if (element.current && typeof window !== "undefined" && document !== undefined) {
            lottieInstance.current = lottie.loadAnimation({
                animationData,
                container: element.current,
                loop : loop
            })
        }
        return () => { lottieInstance.current?.destroy() }
    }, [animationData])
    return <div style={{ width, height }} ref={element}></div>
}