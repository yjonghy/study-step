import {ButtonType, MotionFast} from "@src/types/ButtonType";
import ProgressCircle from "@src/components/common/progress/circle";
const Button = ({btnStyle, onClick, leftImage, text, rightImage, isLoading = false, loaderSize, loaderColor}: ButtonType) => {
    return (
        <button className={`${btnStyle} items-center flex justify-center rounded-[100px] ${MotionFast}`} onClick={() => onClick && onClick()}>
            {/* 버튼 왼쪽 이미지 */}

            {!isLoading ?
                <>
                    {leftImage && <img src={leftImage.url} alt={text.value} className={leftImage.style} />}
                    <div className={text.style}>{text.value}</div>
                    {rightImage && <img src={rightImage.url} alt={text.value} className={rightImage.style} />}
                </> :
                <>
                    <ProgressCircle loaderSize={loaderSize} loaderColor={loaderColor}/>
                </>
            }


        </button>
    );
};

export default Button;
