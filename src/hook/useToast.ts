import {HourToast, Toast} from "@src/atom/toast";
import {useRecoilState} from "recoil";


export function useToast() {
    const [toasts, setToast] = useRecoilState(HourToast)
    const removeToast = (toastId : Toast["id"]) => setToast((prev) => prev.filter((toast) => toast.id !== toastId ))
    const openToast = (toast : Toast) => {
        setToast((prev) => [...prev, { ...toast} ] );
        setTimeout(() => removeToast(toast.id), 3150);
    }
    return {toasts, openToast}
}


