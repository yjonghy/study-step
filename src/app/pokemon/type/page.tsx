import { pokemonName } from "@src/app/pokemon/model"
import TypeSearch, { PokemonTypeData } from "./TypeSearch"

export const revalidate = 3600

const POKE_API = "https://pokeapi.co/api/v2"
const BATTLE_TYPE_COUNT = 18
const BATTLE_TYPES = [
    { name: "normal", label: "노말" },
    { name: "fighting", label: "격투" },
    { name: "flying", label: "비행" },
    { name: "poison", label: "독" },
    { name: "ground", label: "땅" },
    { name: "rock", label: "바위" },
    { name: "bug", label: "벌레" },
    { name: "ghost", label: "고스트" },
    { name: "steel", label: "강철" },
    { name: "fire", label: "불꽃" },
    { name: "water", label: "물" },
    { name: "grass", label: "풀" },
    { name: "electric", label: "전기" },
    { name: "psychic", label: "에스퍼" },
    { name: "ice", label: "얼음" },
    { name: "dragon", label: "드래곤" },
    { name: "dark", label: "악" },
    { name: "fairy", label: "페어리" },
]

const ATTACK_CHART: Record<string, { double?: string[]; half?: string[]; none?: string[] }> = {
    normal: { half: ["rock", "steel"], none: ["ghost"] },
    fighting: { double: ["normal", "rock", "steel", "ice", "dark"], half: ["flying", "poison", "bug", "psychic", "fairy"], none: ["ghost"] },
    flying: { double: ["fighting", "bug", "grass"], half: ["rock", "steel", "electric"] },
    poison: { double: ["grass", "fairy"], half: ["poison", "ground", "rock", "ghost"], none: ["steel"] },
    ground: { double: ["poison", "rock", "steel", "fire", "electric"], half: ["bug", "grass"], none: ["flying"] },
    rock: { double: ["flying", "bug", "fire", "ice"], half: ["fighting", "ground", "steel"] },
    bug: { double: ["grass", "psychic", "dark"], half: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"] },
    ghost: { double: ["ghost", "psychic"], half: ["dark"], none: ["normal"] },
    steel: { double: ["rock", "ice", "fairy"], half: ["steel", "fire", "water", "electric"] },
    fire: { double: ["bug", "steel", "grass", "ice"], half: ["rock", "fire", "water", "dragon"] },
    water: { double: ["ground", "rock", "fire"], half: ["water", "grass", "dragon"] },
    grass: { double: ["ground", "rock", "water"], half: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"] },
    electric: { double: ["flying", "water"], half: ["grass", "electric", "dragon"], none: ["ground"] },
    psychic: { double: ["fighting", "poison"], half: ["steel", "psychic"], none: ["dark"] },
    ice: { double: ["flying", "ground", "grass", "dragon"], half: ["steel", "fire", "water", "ice"] },
    dragon: { double: ["dragon"], half: ["steel"], none: ["fairy"] },
    dark: { double: ["ghost", "psychic"], half: ["fighting", "dark", "fairy"] },
    fairy: { double: ["fighting", "dragon", "dark"], half: ["poison", "steel", "fire"] },
}

type TypeApiData = {
    name: string
    names: { name: string; language: { name: string } }[]
    damage_relations: PokemonTypeData["damage_relations"]
}

const koreanPokemon = pokemonName
    .filter((p) => p.local_language_id === "3")
    .map(({ pokemon_species_id, name }) => ({ pokemon_species_id, name }))

const toNamedResources = (typeNames: string[] = []) => typeNames.map((name) => ({ name }))

function getFallbackTypeData(): PokemonTypeData[] {
    return BATTLE_TYPES.map((type) => {
        const doubleDamageFrom = BATTLE_TYPES
            .filter((attackType) => ATTACK_CHART[attackType.name]?.double?.includes(type.name))
            .map(({ name }) => ({ name }))
        const halfDamageFrom = BATTLE_TYPES
            .filter((attackType) => ATTACK_CHART[attackType.name]?.half?.includes(type.name))
            .map(({ name }) => ({ name }))
        const noDamageFrom = BATTLE_TYPES
            .filter((attackType) => ATTACK_CHART[attackType.name]?.none?.includes(type.name))
            .map(({ name }) => ({ name }))

        return {
            name: type.name,
            label: type.label,
            damage_relations: {
                double_damage_from: doubleDamageFrom,
                double_damage_to: toNamedResources(ATTACK_CHART[type.name]?.double),
                half_damage_from: halfDamageFrom,
                half_damage_to: toNamedResources(ATTACK_CHART[type.name]?.half),
                no_damage_from: noDamageFrom,
                no_damage_to: toNamedResources(ATTACK_CHART[type.name]?.none),
            },
        }
    })
}

async function getTypeData(): Promise<PokemonTypeData[]> {
    try {
        const responses = await Promise.all(
            Array.from({ length: BATTLE_TYPE_COUNT }, (_, index) =>
                fetch(`${POKE_API}/type/${index + 1}`, { next: { revalidate } })
            )
        )

        if (responses.some((response) => !response.ok)) {
            return getFallbackTypeData()
        }

        const typeData: TypeApiData[] = await Promise.all(responses.map((response) => response.json()))

        return typeData.map((type) => ({
            name: type.name,
            label: type.names.find((name) => name.language.name === "ko")?.name ?? type.name,
            damage_relations: type.damage_relations,
        }))
    } catch {
        return getFallbackTypeData()
    }
}

export default async function PokemonTypePage() {
    const types = await getTypeData()

    return (
        <article className="flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]">
            <div className="w-full mb-[20px] bg-blue005 border border-blue020 rounded-[10px] px-[16px] py-[12px] flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px] flex-wrap">
                    <span className="bg-blue040 text-white body-xs font-bold px-[8px] py-[2px] rounded-full">PokeAPI</span>
                    <p className="body-sm text-blue050 font-bold">Type Damage Relations</p>
                    <span className="body-xs text-blue030 font-mono ml-auto">/type/1-18</span>
                </div>
                <p className="body-xs text-blue040">
                    PokeAPI의 타입 상성 데이터와 포켓몬 타입 정보를 조합해서 약점과 공격 유리 타입을 계산합니다.
                </p>
            </div>

            <TypeSearch pokemons={koreanPokemon} types={types} />
        </article>
    )
}
