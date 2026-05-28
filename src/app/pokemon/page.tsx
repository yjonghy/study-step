import Link from "next/link"
import { pokemonName } from "@src/app/pokemon/model"

const koreanPokemon = pokemonName.filter((p) => p.local_language_id === "3")

export default function PocketMon() {
    return (
        <article className="flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]">

            {/* SSG 설명 배너 */}
            <div className="w-full mb-[20px] bg-green005 border border-green020 rounded-[10px] px-[16px] py-[12px] flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px]">
                    <span className="bg-green040 text-white body-xs font-bold px-[8px] py-[2px] rounded-full">SSG</span>
                    <p className="body-sm text-green070 font-bold">Static Site Generation</p>
                </div>
                <p className="body-xs text-green060">
                    이 목록 페이지는 <strong>빌드 타임</strong>에 정적으로 생성됩니다.
                    서버 컴포넌트라 클라이언트 JS가 없고, CDN에서 즉시 응답합니다.
                </p>
                <p className="body-xs text-green050 font-mono">
                    {'// Server Component — no "use client", no hydration overhead'}
                </p>
            </div>

            {/* 포켓몬 그리드 */}
            <div className="w-full h-full grid grid-cols-3 gap-[12px]">
                {koreanPokemon.map((pokemon) => (
                    <Link
                        key={pokemon.pokemon_species_id}
                        href={`/pokemon/${pokemon.pokemon_species_id}`}
                        className="w-full py-[10px] flex flex-col justify-center items-center gap-[4px] rounded-[8px] border border-gray020 hover:border-blue030 hover:bg-blue005 ease-out duration-[100ms] cursor-pointer"
                    >
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_species_id}.png`}
                            className="w-[52px] h-[52px]"
                            alt={pokemon.name}
                        />
                        <p className="body-xs text-gray040">No.{pokemon.pokemon_species_id}</p>
                        <p className="body-sm text-gray080 font-bold">{pokemon.name}</p>
                    </Link>
                ))}
            </div>
        </article>
    )
}
