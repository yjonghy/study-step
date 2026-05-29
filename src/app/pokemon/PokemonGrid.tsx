"use client"
import Link from "next/link"
import { useEffect } from "react"

type Pokemon = {
    pokemon_species_id: string
    name: string
}

const SCROLL_KEY = "pokemon-list-scroll"

export default function PokemonGrid({ pokemons }: { pokemons: Pokemon[] }) {
    useEffect(() => {
        const saved = sessionStorage.getItem(SCROLL_KEY)
        if (saved) {
            window.scrollTo({ top: Number(saved) })
            sessionStorage.removeItem(SCROLL_KEY)
        }
    }, [])

    const saveScroll = () => {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
    }

    return (
        <div className="w-full h-full grid grid-cols-3 gap-[12px]">
            {pokemons.map((pokemon) => (
                <Link
                    key={pokemon.pokemon_species_id}
                    href={`/pokemon/${pokemon.pokemon_species_id}`}
                    onClick={saveScroll}
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
    )
}
