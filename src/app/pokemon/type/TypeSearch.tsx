"use client"

import { useMemo, useState } from "react"
import type { CSSProperties } from "react"

type PokemonName = {
    pokemon_species_id: string
    name: string
}

type NamedResource = {
    name: string
}

type TypeRelations = {
    double_damage_from: NamedResource[]
    double_damage_to: NamedResource[]
    half_damage_from: NamedResource[]
    half_damage_to: NamedResource[]
    no_damage_from: NamedResource[]
    no_damage_to: NamedResource[]
}

export type PokemonTypeData = {
    name: string
    label: string
    damage_relations: TypeRelations
}

type PokemonApiData = {
    id: number
    name: string
    types: { slot: number; type: { name: string } }[]
}

type SelectedPokemon = {
    id: string
    name: string
    apiName: string
    types: string[]
}

type TypeMeta = {
    icon: string
    bg: string
    text: string
    border: string
}

type TypeReason = {
    defenseType: PokemonTypeData
    multiplier: number
}

const TYPE_META: Record<string, TypeMeta> = {
    normal: { icon: "●", bg: "#F4F4F3", text: "#5F6359", border: "#DADDD2" },
    fire: { icon: "▲", bg: "#FFF0E8", text: "#C6421A", border: "#FFC3A8" },
    water: { icon: "◆", bg: "#EAF4FF", text: "#1769D2", border: "#A9D4FF" },
    electric: { icon: "ϟ", bg: "#FFF8D7", text: "#A36B00", border: "#FFE27A" },
    grass: { icon: "✦", bg: "#ECF8E7", text: "#2E7D32", border: "#B7E1A1" },
    ice: { icon: "✣", bg: "#E7FAFF", text: "#0E7991", border: "#A7E7F2" },
    fighting: { icon: "◆", bg: "#FFECEA", text: "#B52E2A", border: "#F7B1AC" },
    poison: { icon: "✚", bg: "#F4E9FF", text: "#7C3FB0", border: "#D6B4F1" },
    ground: { icon: "▰", bg: "#FFF1D8", text: "#93631B", border: "#E8C279" },
    flying: { icon: "⌁", bg: "#EEF2FF", text: "#536DC6", border: "#C4CEF8" },
    psychic: { icon: "◎", bg: "#FFEAF3", text: "#C43D76", border: "#F6B2CD" },
    bug: { icon: "✶", bg: "#F0F7D8", text: "#647A13", border: "#CBDD72" },
    rock: { icon: "⬟", bg: "#F4EED8", text: "#78651F", border: "#D8C77C" },
    ghost: { icon: "◐", bg: "#EEEAF8", text: "#604D93", border: "#C6B9E2" },
    dragon: { icon: "✦", bg: "#EDEBFF", text: "#4B45B8", border: "#BDB8FF" },
    dark: { icon: "◑", bg: "#ECE9E6", text: "#463D39", border: "#C8BFB9" },
    steel: { icon: "⬢", bg: "#EDF4F6", text: "#4F717A", border: "#B9CCD1" },
    fairy: { icon: "✧", bg: "#FFEAF7", text: "#B94891", border: "#F4B7DE" },
}

const POKE_API = "https://pokeapi.co/api/v2"

const hasType = (list: NamedResource[], typeName: string) => list.some((type) => type.name === typeName)

const getTypeStyle = (typeName: string): CSSProperties => {
    const meta = TYPE_META[typeName]

    if (!meta) return {}

    return {
        backgroundColor: meta.bg,
        borderColor: meta.border,
        color: meta.text,
    }
}

const getTypeEffect = (relations: TypeRelations, attackTypeName: string) => {
    if (hasType(relations.no_damage_from, attackTypeName)) return 0
    if (hasType(relations.double_damage_from, attackTypeName)) return 2
    if (hasType(relations.half_damage_from, attackTypeName)) return 0.5
    return 1
}

const formatMultiplier = (multiplier: number) => {
    if (multiplier === 0.25) return "1/4"
    if (multiplier === 0.5) return "1/2"
    return String(multiplier)
}

function TypeBadge({ typeName, label, muted = false }: { typeName: string; label: string; muted?: boolean }) {
    const meta = TYPE_META[typeName]

    return (
        <span
            className={`type-badge body-xs font-bold px-[10px] py-[4px] rounded-full border inline-flex items-center gap-[5px] ${muted ? "opacity-75" : ""}`}
            style={getTypeStyle(typeName)}
        >
            <span className="type-icon w-[16px] h-[16px] rounded-full bg-white/70 flex items-center justify-center text-[10px] leading-none shrink-0">
                {meta?.icon ?? "?"}
            </span>
            {label}
        </span>
    )
}

function ReasonBadge({ reason }: { reason: TypeReason }) {
    return (
        <span
            className="reason-badge body-xs font-bold px-[8px] py-[5px] rounded-[8px] border inline-flex flex-col gap-[2px]"
            style={getTypeStyle(reason.defenseType.name)}
        >
            <span className="leading-none">{reason.defenseType.label}</span>
            <span className="leading-none">방어 x{formatMultiplier(reason.multiplier)}</span>
        </span>
    )
}

export default function TypeSearch({ pokemons, types }: { pokemons: PokemonName[]; types: PokemonTypeData[] }) {
    const [keyword, setKeyword] = useState("")
    const [selected, setSelected] = useState<SelectedPokemon | null>(null)
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")

    const typeMap = useMemo(() => new Map(types.map((type) => [type.name, type])), [types])

    const candidates = useMemo(() => {
        const query = keyword.trim()
        if (!query) return pokemons

        return pokemons
            .filter((pokemon) => pokemon.name.includes(query) || pokemon.pokemon_species_id === query)
    }, [keyword, pokemons])

    const defenseRows = useMemo(() => {
        if (!selected) return []

        return types
            .map((attackType) => {
                const reasons: TypeReason[] = []
                const multiplier = selected.types.reduce((value, defenseTypeName) => {
                    const defenseType = typeMap.get(defenseTypeName)
                    if (!defenseType) return value
                    const effect = getTypeEffect(defenseType.damage_relations, attackType.name)

                    if (effect !== 1) {
                        reasons.push({ defenseType, multiplier: effect })
                    }

                    return value * effect
                }, 1)

                return { type: attackType, multiplier, reasons }
            })
            .filter(({ multiplier }) => multiplier !== 1)
            .sort((a, b) => b.multiplier - a.multiplier || a.type.label.localeCompare(b.type.label, "ko"))
    }, [selected, typeMap, types])

    const weaknessRows = defenseRows.filter(({ multiplier }) => multiplier > 1)
    const resistanceRows = defenseRows.filter(({ multiplier }) => multiplier < 1)
    const criticalWeaknessRows = weaknessRows.filter(({ multiplier }) => multiplier >= 4)
    const regularWeaknessRows = weaknessRows.filter(({ multiplier }) => multiplier < 4)

    const attackRows = useMemo(() => {
        if (!selected) return []

        return selected.types.map((attackTypeName) => {
            const attackType = typeMap.get(attackTypeName)
            const relations = attackType?.damage_relations

            return {
                type: attackType,
                strong: relations?.double_damage_to.map((type) => typeMap.get(type.name)).filter(Boolean) as PokemonTypeData[],
                weak: relations?.half_damage_to.map((type) => typeMap.get(type.name)).filter(Boolean) as PokemonTypeData[],
                none: relations?.no_damage_to.map((type) => typeMap.get(type.name)).filter(Boolean) as PokemonTypeData[],
            }
        })
    }, [selected, typeMap])

    const selectPokemon = async (pokemon: PokemonName) => {
        setKeyword(pokemon.name)
        setStatus("loading")

        try {
            const response = await fetch(`${POKE_API}/pokemon/${pokemon.pokemon_species_id}`)
            if (!response.ok) throw new Error("pokemon fetch failed")

            const data: PokemonApiData = await response.json()
            setSelected({
                id: pokemon.pokemon_species_id,
                name: pokemon.name,
                apiName: data.name,
                types: data.types.sort((a, b) => a.slot - b.slot).map(({ type }) => type.name),
            })
            setStatus("idle")
        } catch {
            setStatus("error")
        }
    }

    const submitSearch = () => {
        const query = keyword.trim()
        if (!query) return

        const exact = pokemons.find((pokemon) => pokemon.name === query || pokemon.pokemon_species_id === query)
        const fallback = candidates[0]
        const pokemon = exact ?? fallback

        if (pokemon) {
            void selectPokemon(pokemon)
            return
        }

        setSelected(null)
        setStatus("error")
    }

    return (
        <div className="w-full flex flex-col gap-[20px]">
            <section className="w-full bg-white border border-gray020 rounded-[8px] p-[16px] flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="body-sm text-gray070 font-bold">포켓몬 이름 검색</p>
                    <p className="body-xs text-gray040">
                        전체 {pokemons.length}마리에서 한국어 이름이나 도감 번호로 타입 상성을 확인합니다.
                    </p>
                </div>

                <div className="flex gap-[8px] mobile:flex-col">
                    <input
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") submitSearch()
                        }}
                        className="flex-1 h-[42px] rounded-[8px] border border-gray020 px-[12px] body-sm text-gray070 outline-none focus:border-blue030 bg-white"
                        placeholder="예: 피카츄, 이상해씨, 25"
                    />
                    <button
                        type="button"
                        onClick={submitSearch}
                        className="h-[42px] px-[16px] rounded-[8px] bg-blue040 text-white body-sm font-bold hover:opacity-90 ease-out duration-[100ms]"
                    >
                        검색
                    </button>
                </div>

                <div className="flex items-center justify-between gap-[8px]">
                    <p className="body-xs text-gray040">
                        {keyword.trim() ? "검색 결과" : "전체 도감"} {candidates.length}마리
                    </p>
                    <p className="body-xs text-gray035">스크롤해서 전체 탐색</p>
                </div>

                <div className="grid grid-cols-6 mobile:grid-cols-2 gap-[8px] max-h-[520px] overflow-y-auto pr-[4px]">
                    {candidates.map((pokemon) => (
                        <button
                            type="button"
                            key={pokemon.pokemon_species_id}
                            onClick={() => selectPokemon(pokemon)}
                            className="pokemon-option h-[44px] px-[10px] rounded-[8px] border border-gray020 hover:border-blue030 hover:bg-blue005 text-left ease-out duration-[100ms] overflow-hidden flex flex-col justify-center"
                        >
                            <span className="body-xs text-gray040">No.{pokemon.pokemon_species_id}</span>
                            <span className="body-sm text-gray070 font-bold truncate">{pokemon.name}</span>
                        </button>
                    ))}
                </div>

                {status === "loading" && <p className="body-xs text-blue040">타입 데이터를 불러오는 중입니다.</p>}
                {status === "error" && <p className="body-xs text-red050">검색 결과를 찾을 수 없습니다.</p>}
            </section>

            {selected && (
                <section className="result-enter w-full flex flex-col gap-[16px]">
                    <div className="pokemon-summary w-full bg-white border border-gray020 rounded-[8px] p-[16px] flex items-center gap-[16px] mobile:items-start">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.id}.png`}
                            alt={selected.name}
                            className="sprite-pop w-[72px] h-[72px] rounded-[8px] bg-gray005 border border-gray015"
                        />
                        <div className="flex flex-col gap-[6px]">
                            <p className="body-xs text-gray040">No.{selected.id.padStart(3, "0")}</p>
                            <p className="heading-md text-gray080">{selected.name}</p>
                            <div className="flex gap-[6px] flex-wrap">
                                {selected.types.map((typeName) => {
                                    const type = typeMap.get(typeName)
                                    return <TypeBadge key={typeName} typeName={typeName} label={type?.label ?? typeName} />
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[12px]">
                        <div className="bg-white border border-gray020 rounded-[8px] p-[16px] flex flex-col gap-[12px]">
                            <div className="flex items-center justify-between gap-[8px]">
                                <p className="body-sm text-gray070 font-bold">방어 리스크</p>
                                <span className="body-xs text-gray040">상대 공격 기준</span>
                            </div>

                            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[8px]">
                                <div className={`risk-summary rounded-[8px] border px-[12px] py-[10px] flex flex-col gap-[8px] ${criticalWeaknessRows.length > 0 ? "is-critical bg-red005 border-red020" : "bg-gray005 border-gray015"}`}>
                                    <div className="flex items-center justify-between gap-[8px]">
                                        <p className={`body-xs font-bold ${criticalWeaknessRows.length > 0 ? "text-red050" : "text-gray050"}`}>4배 위험</p>
                                        <span className={`body-xs font-bold px-[7px] py-[2px] rounded-full ${criticalWeaknessRows.length > 0 ? "bg-red050 text-white" : "bg-gray020 text-gray050"}`}>
                                            {criticalWeaknessRows.length}
                                        </span>
                                    </div>
                                    <div className="flex gap-[6px] flex-wrap">
                                        {criticalWeaknessRows.length > 0 ? criticalWeaknessRows.map(({ type, multiplier }) => (
                                            <TypeBadge key={type.name} typeName={type.name} label={`${type.label} x${formatMultiplier(multiplier)}`} />
                                        )) : (
                                            <span className="body-xs text-gray040">없음</span>
                                        )}
                                    </div>
                                </div>

                                <div className="risk-summary rounded-[8px] border border-gray015 bg-gray005 px-[12px] py-[10px] flex flex-col gap-[8px]">
                                    <div className="flex items-center justify-between gap-[8px]">
                                        <p className="body-xs text-gray060 font-bold">2배 약점</p>
                                        <span className="body-xs text-gray050 font-bold px-[7px] py-[2px] rounded-full bg-gray020">
                                            {regularWeaknessRows.length}
                                        </span>
                                    </div>
                                    <div className="flex gap-[6px] flex-wrap">
                                        {regularWeaknessRows.length > 0 ? regularWeaknessRows.map(({ type, multiplier }) => (
                                            <TypeBadge key={type.name} typeName={type.name} label={`${type.label} x${formatMultiplier(multiplier)}`} />
                                        )) : (
                                            <span className="body-xs text-gray040">없음</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                {weaknessRows.length > 0 ? weaknessRows.map(({ type, multiplier, reasons }) => (
                                    <div
                                        key={type.name}
                                        className={`weakness-card grid grid-cols-[128px_96px_1fr] mobile:grid-cols-1 gap-[12px] border rounded-[8px] px-[12px] py-[12px] ${multiplier >= 4 ? "is-critical border-red020 bg-red005" : "border-gray015 bg-white"}`}
                                    >
                                        <div className="flex flex-col gap-[6px]">
                                            <p className="body-xs text-gray040 font-bold">받는 공격</p>
                                            <TypeBadge typeName={type.name} label={type.label} />
                                        </div>
                                        <div className="flex flex-col gap-[6px]">
                                            <p className="body-xs text-gray040 font-bold">최종 피해</p>
                                            <span className={`damage-pill w-fit body-sm font-bold px-[10px] py-[7px] rounded-[8px] ${multiplier >= 4 ? "is-critical bg-red050 text-white" : "bg-gray090 text-white"}`}>
                                                x{formatMultiplier(multiplier)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <div className="flex flex-col gap-[6px] bg-white/60 border border-white rounded-[8px] px-[10px] py-[8px]">
                                                <p className="body-xs text-gray050 font-bold">왜 약점인가</p>
                                                <div className="flex gap-[6px] flex-wrap items-center">
                                                    {reasons.map((reason, index) => (
                                                        <span key={`${type.name}-${reason.defenseType.name}`} className="inline-flex items-center gap-[6px]">
                                                            {index > 0 && <span className="calc-mark body-xs text-gray040 font-bold">x</span>}
                                                            <ReasonBadge reason={reason} />
                                                        </span>
                                                    ))}
                                                    <span className="calc-mark body-xs text-gray040 font-bold">=</span>
                                                    <span className={`body-xs font-bold px-[8px] py-[5px] rounded-[8px] ${multiplier >= 4 ? "bg-red050 text-white" : "bg-gray090 text-white"}`}>
                                                        x{formatMultiplier(multiplier)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="body-xs text-gray040">2배 이상 약점 타입이 없습니다.</p>
                                )}
                            </div>

                            <div className="pt-[10px] border-t border-gray015 flex flex-col gap-[8px]">
                                <p className="body-xs text-gray050 font-bold">반감 / 무효</p>
                                {resistanceRows.length > 0 ? (
                                    <div className="flex gap-[6px] flex-wrap">
                                        {resistanceRows.map(({ type, multiplier }) => (
                                            <TypeBadge
                                                key={type.name}
                                                typeName={type.name}
                                                label={`${type.label} x${formatMultiplier(multiplier)}`}
                                                muted
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="body-xs text-gray040">반감 또는 무효 타입이 없습니다.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white border border-gray020 rounded-[8px] p-[16px] flex flex-col gap-[12px]">
                            <div className="flex items-center justify-between gap-[8px]">
                                <p className="body-sm text-gray070 font-bold">공격 유리 타입</p>
                                <span className="body-xs text-gray040">자속 타입 기준</span>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                {attackRows.map(({ type, strong, weak, none }) => (
                                    <div key={type?.name} className="flex flex-col gap-[8px] border-b border-gray010 pb-[12px] last:border-b-0 last:pb-0">
                                        <div className="flex flex-col gap-[6px]">
                                            <p className="body-xs text-gray040 font-bold">내 공격 타입</p>
                                            {type && <TypeBadge typeName={type.name} label={`${type.label} 공격`} />}
                                        </div>
                                        <div className="flex flex-col gap-[6px]">
                                            <div className="flex gap-[6px] flex-wrap items-center">
                                                <span className="body-xs text-red050 font-bold w-[42px]">2배</span>
                                                {strong.length > 0 ? strong.map((target) => (
                                                    <TypeBadge key={target.name} typeName={target.name} label={target.label} />
                                                )) : <span className="body-xs text-gray040">없음</span>}
                                            </div>
                                            {(weak.length > 0 || none.length > 0) && (
                                                <div className="flex gap-[6px] flex-wrap items-center">
                                                    <span className="body-xs text-gray040 font-bold w-[42px]">주의</span>
                                                    {weak.map((target) => (
                                                        <TypeBadge key={target.name} typeName={target.name} label={`${target.label} 0.5배`} muted />
                                                    ))}
                                                    {none.map((target) => (
                                                        <TypeBadge key={target.name} typeName={target.name} label={`${target.label} 0배`} muted />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <style jsx>{`
                .result-enter {
                    animation: result-enter 260ms ease-out both;
                }

                .pokemon-summary {
                    position: relative;
                    overflow: hidden;
                }

                .pokemon-summary::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.62) 42%, transparent 72%);
                    transform: translateX(-120%);
                    animation: sheen 900ms ease-out 120ms both;
                    pointer-events: none;
                }

                .sprite-pop {
                    animation: sprite-pop 520ms cubic-bezier(0.2, 1.4, 0.28, 1) both;
                }

                .pokemon-option {
                    transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease, box-shadow 140ms ease;
                }

                .pokemon-option:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 18px rgba(36, 111, 248, 0.12);
                }

                .type-badge {
                    transition: transform 140ms ease, box-shadow 140ms ease;
                }

                .type-badge:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
                }

                .type-icon {
                    animation: icon-float 2200ms ease-in-out infinite;
                }

                .risk-summary {
                    animation: card-rise 260ms ease-out both;
                }

                .risk-summary.is-critical {
                    animation: card-rise 260ms ease-out both, critical-glow 1600ms ease-in-out infinite;
                }

                .weakness-card {
                    animation: card-rise 260ms ease-out both;
                    transition: transform 140ms ease, box-shadow 140ms ease;
                }

                .weakness-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
                }

                .weakness-card.is-critical {
                    animation: card-rise 260ms ease-out both, critical-glow 1600ms ease-in-out infinite;
                }

                .damage-pill.is-critical {
                    animation: damage-pop 1200ms ease-in-out infinite;
                }

                .reason-badge {
                    animation: reason-in 220ms ease-out both;
                }

                .calc-mark {
                    animation: calc-pop 700ms ease-in-out infinite;
                }

                @keyframes result-enter {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes sprite-pop {
                    0% { opacity: 0; transform: scale(0.82) rotate(-4deg); }
                    70% { opacity: 1; transform: scale(1.08) rotate(2deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0); }
                }

                @keyframes sheen {
                    to { transform: translateX(120%); }
                }

                @keyframes icon-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-1px); }
                }

                @keyframes card-rise {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes critical-glow {
                    0%, 100% { box-shadow: 0 0 0 rgba(230, 61, 44, 0); }
                    50% { box-shadow: 0 0 0 3px rgba(230, 61, 44, 0.08), 0 10px 24px rgba(230, 61, 44, 0.10); }
                }

                @keyframes damage-pop {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.06); }
                }

                @keyframes reason-in {
                    from { opacity: 0; transform: scale(0.94); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes calc-pop {
                    0%, 100% { opacity: 0.55; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.08); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .result-enter,
                    .pokemon-summary::after,
                    .sprite-pop,
                    .type-icon,
                    .risk-summary,
                    .risk-summary.is-critical,
                    .weakness-card,
                    .weakness-card.is-critical,
                    .damage-pill.is-critical,
                    .reason-badge,
                    .calc-mark {
                        animation: none;
                    }

                    .pokemon-option,
                    .type-badge,
                    .weakness-card {
                        transition: none;
                    }
                }
            `}</style>
        </div>
    )
}
