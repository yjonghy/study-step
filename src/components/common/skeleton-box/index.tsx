interface SkeletonBoxProps {
    boxStyle?: string
}

export default function SkeletonBox({boxStyle}: SkeletonBoxProps) {
    return (
        <div className={`${boxStyle}`}>
            <div className="animate-pulse bg-[linear-gradient(-90deg,_#E7EAEE_0%,_#EDEFF2_50%,_#E7EAEE_100%)] w-full h-full rounded-[inherit]">

            </div>

        </div>
    )
}