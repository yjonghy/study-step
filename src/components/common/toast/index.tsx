"use client"
import {useRecoilValue} from "recoil";
import {HourToast} from "@src/atom/toast";
import ToastItem from "@src/components/common/toast/item";

export default function Toast() {
    const toast = useRecoilValue(HourToast)
    return (
        <>
        {
            toast.map((item, index) => (
                <ToastItem
                    key={item.id} //map 안 element key 값
                    index={index} length={toast.length} id={item.id}
                    //차례대로 index, 길이, id
                    //새로 띄운 토스트외에 나머지 토스트 opacity 0처리 위함
                    text={item.text} // toast test
                    btnText={item.btnText} // toast 오른쪽 버튼 텍스트
                    isBtn={item.isBtn} // toast 오른쪽 버튼 유무
                    onClick={item.onClick} // toast 클릭 function
                    damping={item.damping}
                    mass={item.mass}
                    stiffness={item.stiffness}
                />
            ))
        }
        </>
    )
}

