import Link from "next/link"
import { pokemonName } from "@src/app/pokemon/model"
import type { Metadata } from "next"
import SpriteGallery from "./SpriteGallery"

export const revalidate = 3600

const POKE_API = "https://pokeapi.co/api/v2"

const koreanIds = pokemonName
    .filter((p) => p.local_language_id === "3")
    .map((p) => p.pokemon_species_id)
    .filter((id, i, arr) => arr.indexOf(id) === i)

export async function generateStaticParams() {
    return koreanIds.map((id) => ({ id }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const koreanEntry = pokemonName.find(
        (p) => p.pokemon_species_id === params.id && p.local_language_id === "3"
    )
    const name = koreanEntry?.name ?? `포켓몬 #${params.id}`
    return {
        title: `${name} — 포켓몬 도감`,
        description: `포켓몬 No.${params.id} ${name}의 상세 정보`,
        openGraph: {
            title: `${name} — 포켓몬 도감`,
            images: [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`],
        },
    }
}

type SpeciesData = {
    names: { name: string; language: { name: string } }[]
    flavor_text_entries: { flavor_text: string; language: { name: string }; version: { name: string } }[]
    genera: { genus: string; language: { name: string } }[]
}

type PokemonData = {
    sprites: Record<string, string | null>
    types: { type: { name: string } }[]
    height: number
    weight: number
    base_experience: number
    stats: { base_stat: number; stat: { name: string } }[]
}

const TYPE_COLOR: Record<string, string> = {
    fire: "bg-red005 text-red050 border-red020",
    water: "bg-blue005 text-blue040 border-blue020",
    grass: "bg-green005 text-green060 border-green020",
    electric: "bg-yellow005 text-yellow060 border-yellow020",
    psychic: "bg-red005 text-red050 border-red020",
    ice: "bg-blue005 text-blue030 border-blue020",
    dragon: "bg-blue005 text-blue040 border-blue020",
    normal: "bg-gray010 text-gray060 border-gray020",
    fighting: "bg-red005 text-red050 border-red020",
    flying: "bg-blue005 text-blue030 border-blue020",
    poison: "bg-gray010 text-gray060 border-gray020",
    ground: "bg-yellow005 text-yellow060 border-yellow020",
    rock: "bg-gray010 text-gray060 border-gray020",
    bug: "bg-green005 text-green060 border-green020",
    ghost: "bg-gray015 text-gray060 border-gray025",
    steel: "bg-gray010 text-gray060 border-gray020",
    dark: "bg-gray015 text-gray060 border-gray025",
    fairy: "bg-red005 text-red050 border-red020",
}

const STAT_LABEL: Record<string, string> = {
    hp: "HP",
    attack: "공격",
    defense: "방어",
    "special-attack": "특공",
    "special-defense": "특방",
    speed: "스피드",
}

export default async function PocketMonDetail({ params }: { params: { id: string } }) {
    const [speciesRes, pokemonRes] = await Promise.all([
        fetch(`${POKE_API}/pokemon-species/${params.id}`, { next: { revalidate } }),
        fetch(`${POKE_API}/pokemon/${params.id}`, { next: { revalidate } }),
    ])

    if (!speciesRes.ok || !pokemonRes.ok) {
        return (
            <article className="flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]">
                <p className="body-sm text-red050">데이터를 불러올 수 없습니다.</p>
            </article>
        )
    }

    const species: SpeciesData = await speciesRes.json()
    const pokemon: PokemonData = await pokemonRes.json()

    const koreanName = species.names.find((n) => n.language.name === "ko")?.name ?? `#${params.id}`
    const koreanGenus = species.genera.find((g) => g.language.name === "ko")?.genus ?? ""
    const flavorEntry =
        species.flavor_text_entries.find((f) => f.language.name === "ko") ??
        species.flavor_text_entries.find((f) => f.language.name === "en")
    const flavorText = flavorEntry?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ") ?? ""

    const mainSprites = [
        { key: "front_default", label: "기본" },
        { key: "front_shiny", label: "이로치" },
        { key: "front_female", label: "암컷" },
        { key: "front_shiny_female", label: "이로치 암컷" },
    ].filter(({ key }) => pokemon.sprites[key] !== null && pokemon.sprites[key] !== undefined)

    const prevId = Number(params.id) > 1 ? String(Number(params.id) - 1) : null
    const nextId = koreanIds.includes(String(Number(params.id) + 1)) ? String(Number(params.id) + 1) : null

    return (
        <article className="flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]">

            {/* ISR 설명 배너 */}
            <div className="w-full mb-[20px] bg-blue005 border border-blue020 rounded-[10px] px-[16px] py-[12px] flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px] flex-wrap">
                    <span className="bg-blue040 text-white body-xs font-bold px-[8px] py-[2px] rounded-full">ISR</span>
                    <p className="body-sm text-blue050 font-bold">Incremental Static Regeneration</p>
                    <span className="body-xs text-blue030 font-mono ml-auto">revalidate: 3600s</span>
                </div>
                <p className="body-xs text-blue040">
                    이 상세 페이지는 <strong>빌드 타임에 정적 생성</strong>되고, 1시간마다 백그라운드에서 재생성됩니다.
                    첫 요청은 캐시된 HTML을 즉시 반환하고, 만료 후 첫 요청 시 새 페이지를 생성합니다.
                </p>
                <p className="body-xs text-blue030 font-mono">
                    export const revalidate = 3600 &nbsp;·&nbsp; generateStaticParams() &nbsp;·&nbsp; generateMetadata()
                </p>
            </div>

            {/* 뒤로가기 */}
            <Link href="/pokemon" className="flex items-center gap-[6px] text-gray040 hover:text-gray080 ease-out duration-[150ms] group mb-[20px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[150ms]">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="body-sm">목록으로</span>
            </Link>

            {/* 메인 카드 */}
            <div className="w-full flex gap-[24px] flex-wrap">

                {/* 스프라이트 */}
                <SpriteGallery
                    main={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
                    sprites={mainSprites.slice(1).map(({ key, label }) => ({ src: pokemon.sprites[key] as string, label }))}
                />

                {/* 기본 정보 */}
                <div className="flex flex-col gap-[8px] flex-1 min-w-[160px]">
                    <p className="body-xs text-gray040">No.{params.id.padStart(3, "0")}</p>
                    <p className="heading-xl text-gray080">{koreanName}</p>
                    {koreanGenus && <p className="body-sm text-gray050">{koreanGenus}</p>}

                    {/* 타입 */}
                    <div className="flex gap-[6px] mt-[4px]">
                        {pokemon.types.map(({ type }) => (
                            <span key={type.name} className={`body-xs font-bold px-[10px] py-[3px] rounded-full border ${TYPE_COLOR[type.name] ?? "bg-gray010 text-gray060 border-gray020"}`}>
                                {type.name}
                            </span>
                        ))}
                    </div>

                    {/* 신체 */}
                    <div className="flex gap-[16px] mt-[4px]">
                        <div className="flex flex-col gap-[2px]">
                            <p className="body-xs text-gray040">키</p>
                            <p className="body-sm text-gray070 font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="body-xs text-gray040">몸무게</p>
                            <p className="body-sm text-gray070 font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                        </div>
                    </div>

                    {/* 설명 */}
                    {flavorText && (
                        <p className="body-xs text-gray060 leading-[1.7] mt-[4px] bg-gray005 rounded-[8px] p-[10px] border border-gray015">
                            {flavorText}
                        </p>
                    )}
                </div>
            </div>

            {/* 스탯 */}
            <div className="w-full mt-[24px]">
                <p className="body-sm text-gray060 font-bold mb-[10px]">기본 스탯</p>
                <div className="flex flex-col gap-[8px]">
                    {pokemon.stats.map(({ stat, base_stat }) => (
                        <div key={stat.name} className="flex items-center gap-[10px]">
                            <p className="body-xs text-gray050 w-[48px] shrink-0">{STAT_LABEL[stat.name] ?? stat.name}</p>
                            <p className="body-xs text-gray070 font-bold w-[28px] text-right shrink-0">{base_stat}</p>
                            <div className="flex-1 h-[6px] bg-gray015 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-blue030"
                                    style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    {/* 총합 */}
                    <div className="flex items-center gap-[10px] pt-[6px] border-t border-gray015 mt-[2px]">
                        <p className="body-xs text-gray060 font-bold w-[48px] shrink-0">총합</p>
                        <p className="body-xs text-blue040 font-bold w-[28px] text-right shrink-0">
                            {pokemon.stats.reduce((sum, { base_stat }) => sum + base_stat, 0)}
                        </p>
                        <div className="flex-1 h-[6px] bg-gray015 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-blue040"
                                style={{ width: `${Math.min((pokemon.stats.reduce((s, { base_stat }) => s + base_stat, 0) / 720) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 이전/다음 네비게이션 */}
            <div className="w-full flex justify-between mt-[28px] pt-[20px] border-t border-gray015">
                {prevId && koreanIds.includes(prevId) ? (
                    <Link href={`/pokemon/${prevId}`} className="flex items-center gap-[6px] text-gray040 hover:text-blue040 ease-out duration-[100ms] group">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-[2px] ease-out duration-[100ms]">
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="body-sm">이전</span>
                    </Link>
                ) : <div />}
                {nextId ? (
                    <Link href={`/pokemon/${nextId}`} className="flex items-center gap-[6px] text-gray040 hover:text-blue040 ease-out duration-[100ms] group">
                        <span className="body-sm">다음</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-[2px] ease-out duration-[100ms]">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                ) : <div />}
            </div>
        </article>
    )
}
