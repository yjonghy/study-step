"use client"
import {pocketmonName} from "@src/app/pocketmon/model";
import {GhostPrimaryButton, MotionFast} from "@src/types/ButtonType";


const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"

export default function PocketMon() {


    return (
        <article className={parentStyle}>
            <div className="w-full h-full grid grid-cols-3 gap-[16px]">
                {pocketmonName.map((value, index) => (
                    <>{
                        value.local_language_id === "3" ?
                            <div className={`w-full py-[8px] flex flex-col justify-center items-center gap-[4px] rounded-[8px] ${MotionFast} ${GhostPrimaryButton} cursor-pointer`} key={index}>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value.pokemon_species_id}.png`} className="w-[52px] h-[52px]"/>
                                <div className="flex w-full justify-center items-center">
                                    <p className="heading-md text-gray090">No.</p>
                                    <p className="body-md text-gray090">{value.local_language_id}</p>
                                </div>
                                <div className="flex w-full justify-center items-center gap-[8px]">
                                    <p className="heading-md text-gray090">이름</p>
                                    <p className="body-md text-gray090">{value.name}</p>
                                </div>
                            </div>
                            :
                            <></>
                    }</>
                ))}
            </div>
        </article>
    )

}