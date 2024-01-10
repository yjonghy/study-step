export default function Popup({children, onBgClick}) {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onBgClick && onBgClick()
            }}
            className="z-[51] fixed top-0 left-0 h-full bg-dim flex justify-center w-screen">
            <div className="bg-white
            desktop:self-center tablet:self-end mobile:self-end
            desktop:rounded-[16px] tablet:rounded-t-[16px] mobile:rounded-t-[16px]">
                {children}
            </div>
        </div>
    )
}