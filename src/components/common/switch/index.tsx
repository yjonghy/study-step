import {ToggleType} from "@src/types/SwitchType";

export default function ToggleSwitch({bar, circle, gap, checked, setChange}: ToggleType) {

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                checked={checked}
                onChange={setChange}
                type="checkbox" value="" className="sr-only peer"/>
            <div
                className={`
                relative rounded-[100px] ${bar.width} ${bar.height} 
                bg-gray030
                after:border-gray030
                after:hover:border-gray035
                peer-hover:bg-gray035
                peer-checked:bg-gray070
                peer-checked:hover:bg-gray070
                peer-checked:after:hover:border-gray070
                peer-checked:after:border-gray070
                peer-checked:after:translate-x-full
                after:content-['']
                after:absolute
                
                ${gap.top}
                ${gap.left}
                
                peer-checked:after:left-0
                after:bg-white
                after:border
                after:transition-all
                after:rounded-full
                
                ${circle.width}
                ${circle.height}
                `}></div>
        </label>
    )
}
