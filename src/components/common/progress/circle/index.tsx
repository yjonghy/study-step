export const btnLoaderMediumSize = "w-[24px] h-[24px]"
export const btnLoaderSmallSize = "w-[18px] h-[18px]"
export const btnLoaderWhite = "border-white border-t-white/25"
export const btnLoaderBlack = "border-gray090 border-t-gray090/25"

const ProgressCircle = ({loaderSize, loaderColor}) => {
    return (
        <div className={`rounded-[100px] border-[2px] animate-spin ${loaderSize} ${loaderColor}`}>

        </div>
    )
}

export default ProgressCircle