import {TextButtonType} from "@src/types/ButtonType";

export default function TextButton({ style, text, onClick, id } : TextButtonType) {
    return (
        <div
            id={id ? id : "text-button"}
            onClick={onClick}
            className={style + " cursor-pointer underline underline-offset-2 decoration-1 hover:decoration-2"}>
            {text}
        </div>
    )
}