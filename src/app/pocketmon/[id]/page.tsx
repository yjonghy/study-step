"use client"

import {useGetPocketInfo, useGetPocketSpecies} from "@src/hook/query";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {getPocketInfo} from "@src/api/get/route";
const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"

export default function PocketMonDetail(){

    const pathName = usePathname()
    //console.log(pathName.replaceAll("/","").replace("pocketmon", ""))
    const getPocketMonSpecies = useGetPocketSpecies(pathName.replaceAll("/","").replace("pocketmon", ""))
    const getPocketInfoQuery = useGetPocketInfo(pathName.replaceAll("/","").replace("pocketmon", ""))

    const [sprites, setSprites] = useState(null)
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        if (!getPocketInfoQuery.isLoading && getPocketInfoQuery.isSuccess) {
            setSprites(getPocketInfoQuery.data.sprites)
        }
    }, [getPocketInfoQuery.isFetching])


    useEffect(() => {
        if (sprites !== null) {
            console.log(sprites)
            console.log(Object.keys(sprites))
            setImageList(Object.keys(sprites))
        }

    }, [sprites])


    return(
        <section className={parentStyle}>

            {!getPocketMonSpecies.isLoading && getPocketMonSpecies.isSuccess ?
                <>
                    <div className="flex ">
                        <p>이름</p>
                        {getPocketMonSpecies.data.names.map((value, index) => (
                            value.language.name === "ko" &&
                            <p key={index}>
                                {value.name}
                            </p>
                        ))}
                    </div>
                    <p className="">can scroll</p>
                    { imageList.length !== 0 ?
                        <div className="flex flex-col gap-[8px]  w-full h-[320px] overflow-y-auto relative">
                            {imageList.map((value, index) => (
                                <div
                                    key={index}
                                    className={`${(value.includes("other") || value.includes("versions") || sprites[value] === null) && `hidden`} flex flex-col gap-[4px] justify-center items-center`}>
                                    <img src={sprites[value]} className="w-[300px] h-[300px] object-cover"/>
                                    <p>{(value.includes("female") && sprites[value] !== null) && "암컷" }</p>
                                    <p>{(value.includes("shiny") && sprites[value] !== null ) && "이로치 형태"}</p>
                                </div>
                            ))
                            }
                        </div>
                        :
                        <>

                        </>
                    }
                </>
                :
                <></>
            }

        </section>
    )
}


// {
//     "base_happiness": 50,
//     "capture_rate": 45,
//     "color": {
//     "name": "green",
//         "url": "https://pokeapi.co/api/v2/pokemon-color/5/"
// },
//     "egg_groups": [
//     {
//         "name": "monster",
//         "url": "https://pokeapi.co/api/v2/egg-group/1/"
//     },
//     {
//         "name": "plant",
//         "url": "https://pokeapi.co/api/v2/egg-group/7/"
//     }
// ],
//     "evolution_chain": {
//     "url": "https://pokeapi.co/api/v2/evolution-chain/1/"
// },
//     "evolves_from_species": {
//     "name": "ivysaur",
//         "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
// },
//     "flavor_text_entries": [
//     {
//         "flavor_text": "The plant blooms\nwhen it is\nabsorbing solar\fenergy. It stays\non the move to\nseek sunlight.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "red",
//             "url": "https://pokeapi.co/api/v2/version/1/"
//         }
//     },
//     {
//         "flavor_text": "The plant blooms\nwhen it is\nabsorbing solar\fenergy. It stays\non the move to\nseek sunlight.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "blue",
//             "url": "https://pokeapi.co/api/v2/version/2/"
//         }
//     },
//     {
//         "flavor_text": "The flower on its\nback catches the\nsun's rays.\fThe sunlight is\nthen absorbed and\nused for energy.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "yellow",
//             "url": "https://pokeapi.co/api/v2/version/3/"
//         }
//     },
//     {
//         "flavor_text": "By spreading the\nbroad petals of\nits flower and\fcatching the sun's\nrays, it fills its\nbody with power.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "gold",
//             "url": "https://pokeapi.co/api/v2/version/4/"
//         }
//     },
//     {
//         "flavor_text": "It is able to con­\nvert sunlight into\nenergy. As a\fresult, it is more\npowerful in the\nsummertime.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "silver",
//             "url": "https://pokeapi.co/api/v2/version/5/"
//         }
//     },
//     {
//         "flavor_text": "As it warms it­\nself and absorbs\nthe sunlight, its\fflower petals\nrelease a pleasant\nfragrance.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "crystal",
//             "url": "https://pokeapi.co/api/v2/version/6/"
//         }
//     },
//     {
//         "flavor_text": "There is a large flower on VENUSAUR’s\nback. The flower is said to take on vivid\ncolors if it gets plenty of nutrition\fand sunlight. The flower’s aroma\nsoothes the emotions of people.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "ruby",
//             "url": "https://pokeapi.co/api/v2/version/7/"
//         }
//     },
//     {
//         "flavor_text": "There is a large flower on VENUSAUR’s\nback. The flower is said to take on vivid\ncolors if it gets plenty of nutrition\fand sunlight. The flower’s aroma\nsoothes the emotions of people.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "sapphire",
//             "url": "https://pokeapi.co/api/v2/version/8/"
//         }
//     },
//     {
//         "flavor_text": "VENUSAUR’s flower is said to take on vivid\ncolors if it gets plenty of nutrition and\nsunlight. The flower’s aroma soothes the\nemotions of people.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "emerald",
//             "url": "https://pokeapi.co/api/v2/version/9/"
//         }
//     },
//     {
//         "flavor_text": "A bewitching aroma wafts from its flower.\nThe fragrance becalms those engaged in\na battle.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "firered",
//             "url": "https://pokeapi.co/api/v2/version/10/"
//         }
//     },
//     {
//         "flavor_text": "Its plant blooms when it is absorbing\nsolar energy. It stays on the move to\nseek sunlight.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "leafgreen",
//             "url": "https://pokeapi.co/api/v2/version/11/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "diamond",
//             "url": "https://pokeapi.co/api/v2/version/12/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "pearl",
//             "url": "https://pokeapi.co/api/v2/version/13/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "platinum",
//             "url": "https://pokeapi.co/api/v2/version/14/"
//         }
//     },
//     {
//         "flavor_text": "By spreading the broad petals of\nits flower and catching the sun’s\nrays, it fills its body with power.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "heartgold",
//             "url": "https://pokeapi.co/api/v2/version/15/"
//         }
//     },
//     {
//         "flavor_text": "It is able to convert sunlight into\nenergy. As a result, it is more\npowerful in the summertime.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "soulsilver",
//             "url": "https://pokeapi.co/api/v2/version/16/"
//         }
//     },
//     {
//         "flavor_text": "Le parfum de sa fleur se fait plus\npénétrant les lendemains de pluie.\nCela appâte les autres Pokémon.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "black",
//             "url": "https://pokeapi.co/api/v2/version/17/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "black",
//             "url": "https://pokeapi.co/api/v2/version/17/"
//         }
//     },
//     {
//         "flavor_text": "Le parfum de sa fleur se fait plus\npénétrant les lendemains de pluie.\nCela appâte les autres Pokémon.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "white",
//             "url": "https://pokeapi.co/api/v2/version/18/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "white",
//             "url": "https://pokeapi.co/api/v2/version/18/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "black-2",
//             "url": "https://pokeapi.co/api/v2/version/21/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on\nits back smells stronger. The\nscent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "white-2",
//             "url": "https://pokeapi.co/api/v2/version/22/"
//         }
//     },
//     {
//         "flavor_text": "おおきな　はなびらを　ひろげ\nたいようの　ひかりを　あびていると\nからだに　げんきが　みなぎっていく。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "큰 꽃잎을 펼쳐\n햇빛을 받고 있으면\n몸에 힘이 넘쳐흐른다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "Ses pétales lui servent à capter la lumière du soleil.\nIl peut ainsi en canaliser l’énergie.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "Es spreizt die breiten Blätter seiner Blüte,\num seinen Körper mit Sonnenenergie\nzu durchfluten.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "Llena su cuerpo de energía con los rayos solares que\ncaptan los anchos pétalos de su flor.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "Si riempie di energia grazie ai grandi petali del fiore,\nche spalanca catturando i raggi solari.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "By spreading the broad petals of its flower\nand catching the sun’s rays, it fills its body\nwith power.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "大きな　花びらを　広げ\n太陽の　光を　浴びていると\n体に　元気が　みなぎっていく。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "x",
//             "url": "https://pokeapi.co/api/v2/version/23/"
//         }
//     },
//     {
//         "flavor_text": "あめの　ふった　よくじつは　せなかの\nはなの　かおりが　つよまる。かおりに\nさそわれ　ポケモンが　あつまる。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "비가 내린 다음 날은 등의\n꽃향기가 강해진다. 향기에\n이끌려 포켓몬이 모여든다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "Le parfum de sa fleur se fait plus pénétrant les\nlendemains de pluie. Cela appâte les autres Pokémon.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "Nach einem Regentag riecht die Blume auf seinem\nRücken intensiver. Das Aroma zieht andere\nPokémon an.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "Después de un día de lluvia, la flor de su lomo tiene\nun aroma más potente y atrae a otros Pokémon.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "Dopo la pioggia, il fiore sul suo dorso emana un\nprofumo più intenso e attira gli altri Pokémon.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "After a rainy day, the flower on its back smells\nstronger. The scent attracts other Pokémon.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "雨の　降った　翌日は\n背中の　花の　香りが　強まる。\n香りに　誘われ　ポケモンが　集まる。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "y",
//             "url": "https://pokeapi.co/api/v2/version/24/"
//         }
//     },
//     {
//         "flavor_text": "じゅうぶんな　えいようと　たいようの　ひかりが\nはなの　いろを　あざやかに　すると　いわれる。\nはなの　かおりは　ひとの　こころを　いやす。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "충분한 영양분과 태양의 빛이\n꽃의 색을 선명하게 만든다고 한다.\n꽃의 향기는 사람의 마음을 치유한다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "Une belle fleur se trouve sur le dos de Florizarre.\nElle prend une couleur vive lorsqu’elle est bien nourrie et bien\nensoleillée. Le parfum de cette fleur peut apaiser les gens.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "Bisaflor hat eine Blume auf seinem Rücken. Wenn sie\nviel Nahrung und Sonne aufnimmt, verfärbt sie sich bunt.\nDer Duft der Blume mildert die Emotionen der Menschen.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "Venusaur tiene una flor enorme en el lomo que, según\nparece, adquiere unos colores muy vivos si está bien\nnutrido y le da mucho el sol. El aroma delicado de la flor\ntiene un efecto relajante en el ánimo de las personas.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "C’è un grande fiore sulla schiena di Venusaur. Si dice che\ni colori diventino più vividi con il giusto nutrimento e i\nraggi solari. Il suo profumo calma le reazioni emotive\ndelle persone.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "There is a large flower on Venusaur’s back. The flower is said\nto take on vivid colors if it gets plenty of nutrition and sunlight.\nThe flower’s aroma soothes the emotions of people.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "十分な　栄養と　太陽の　光が\n花の　色を　鮮やかに　すると　いわれる。\n花の　香りは　人の　心を　癒す。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "omega-ruby",
//             "url": "https://pokeapi.co/api/v2/version/25/"
//         }
//     },
//     {
//         "flavor_text": "じゅうぶんな　えいようと　たいようの　ひかりが\nはなの　いろを　あざやかに　すると　いわれる。\nはなの　かおりは　ひとの　こころを　いやす。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "충분한 영양분과 태양의 빛이\n꽃의 색을 선명하게 만든다고 한다.\n꽃의 향기는 사람의 마음을 치유한다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "Une belle fleur se trouve sur le dos de Florizarre.\nElle prend une couleur vive lorsqu’elle est bien nourrie et bien\nensoleillée. Le parfum de cette fleur peut apaiser les gens.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "Bisaflor hat eine Blume auf seinem Rücken. Wenn sie viel\nNahrung und Sonne aufnimmt, verfärbt sie sich bunt.\nDer Duft der Blume besänftigt die Gemüter der Menschen.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "Venusaur tiene una flor enorme en el lomo que, según\nparece, adquiere unos colores muy vivos si está bien\nnutrido y le da mucho el sol. El aroma delicado de la flor\ntiene un efecto relajante en el ánimo de las personas.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "C’è un grande fiore sulla schiena di Venusaur. Si dice che\ni colori diventino più vividi con il giusto nutrimento e i\nraggi solari. Il suo profumo calma le reazioni emotive\ndelle persone.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "There is a large flower on Venusaur’s back. The flower is said\nto take on vivid colors if it gets plenty of nutrition and sunlight.\nThe flower’s aroma soothes the emotions of people.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "十分な　栄養と　太陽の　光が\n花の　色を　鮮やかに　すると　いわれる。\n花の　香りは　人の　心を　癒す。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "alpha-sapphire",
//             "url": "https://pokeapi.co/api/v2/version/26/"
//         }
//     },
//     {
//         "flavor_text": "せなかに　はえた　おおきな　ハナは\nたいようの　ひかりを　きゅうしゅうし\nエネルギーに　へんかん　できる。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "등 위에 활짝 핀 큰 꽃은\n태양 빛을 흡수해서\n에너지로 변환할 수 있다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "長在背上的大花\n能夠吸收太陽光，\n並轉換成能量。",
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "Les pétales de sa fleur dorsale absorbent les\nrayons du soleil pour les convertir en énergie.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "Die große Blume auf seinem Rücken absorbiert\nSonnenlicht und kann dieses in Energie\numwandeln.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "La flor que tiene en el lomo puede recoger los\nrayos solares para transformarlos en energía.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "Il grande fiore che ha sulla schiena può assorbire\ni raggi solari e trasformarli in energia.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "The flower on its back catches the sun’s rays.\nThe sunlight is then absorbed and\nused for energy.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "背中に　生えた　大きな　ハナは\n太陽の　光を　吸収し\nエネルギーに　変換　できる。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "它背上开出的大花\n能够吸收太阳光\n并将其转换为能量。",
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         },
//         "version": {
//             "name": "lets-go-pikachu",
//             "url": "https://pokeapi.co/api/v2/version/31/"
//         }
//     },
//     {
//         "flavor_text": "せなかに　はえた　おおきな　ハナは\nたいようの　ひかりを　きゅうしゅうし\nエネルギーに　へんかん　できる。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "등 위에 활짝 핀 큰 꽃은\n태양 빛을 흡수해서\n에너지로 변환할 수 있다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "長在背上的大花\n能夠吸收太陽光，\n並轉換成能量。",
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "Les pétales de sa fleur dorsale absorbent les\nrayons du soleil pour les convertir en énergie.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "Die große Blume auf seinem Rücken absorbiert\nSonnenlicht und kann dieses in Energie\numwandeln.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "La flor que tiene en el lomo puede recoger los\nrayos solares para transformarlos en energía.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "Il grande fiore che ha sulla schiena può assorbire\ni raggi solari e trasformarli in energia.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "The flower on its back catches the sun’s rays.\nThe sunlight is then absorbed and\nused for energy.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "背中に　生えた　大きな　ハナは\n太陽の　光を　吸収し\nエネルギーに　変換　できる。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "它背上开出的大花\n能够吸收太阳光\n并将其转换为能量。",
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         },
//         "version": {
//             "name": "lets-go-eevee",
//             "url": "https://pokeapi.co/api/v2/version/32/"
//         }
//     },
//     {
//         "flavor_text": "たいようエネルギーを　えいようにして\nおおきなハナが　ひらく。　ひなたに\nひきよせられるように　いどうする。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "태양에너지를 양분으로\n큰 꽃을 피운다. 양지를 향해\n이끌려가듯이 이동한다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "把太陽的能源當成養分，\n開出碩大的花朵。總是\n朝著有陽光的地方移動。",
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "Sa plante donne une grosse fleur quand\nelle absorbe les rayons du soleil. Il est toujours\nà la recherche des endroits les plus ensoleillés.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "Es nutzt Solarenergie als Nahrung und bringt so\nseine große Blume zum Blühen. Es geht dorthin,\nwo die Sonne scheint.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "La planta florece cuando absorbe energía solar,\nlo cual le obliga a buscar siempre la luz del sol.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "Il fiore sboccia assorbendo energia solare.\nSi muove continuamente in cerca di luce.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "Its plant blooms when it is absorbing solar\nenergy. It stays on the move to seek sunlight.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "太陽エネルギーを　栄養にして\n大きな花が　開く。　日なたに\n引き寄せられるように　移動する。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "把太阳的能源当成养分，\n开出硕大的花朵。总是\n朝着有阳光的地方移动。",
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         },
//         "version": {
//             "name": "sword",
//             "url": "https://pokeapi.co/api/v2/version/33/"
//         }
//     },
//     {
//         "flavor_text": "はなから　うっとりする　かおりが\nただよい　たたかうものの　きもちを\nなだめてしまう。",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "꽃에서 황홀한 향기가\n퍼져 나와 싸우는 자의\n기분을 달래준다.",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "花朵散發出的迷人香味，\n能安撫激動的心情，\n甚至消弭鬥爭。",
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "Une douce senteur émane de sa plante.\nCette fragrance calme tous ceux qui sont\nengagés dans un combat.",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "Die Blume verströmt einen zauberhaften Duft.\nEr beschwichtigt erhitzte Kämpfer.",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "La flor que tiene en el lomo libera un delicado\naroma, que tiene un efecto relajante en combate.",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "Il suo fiore emana una fragranza inebriante\ncapace di placare l’animo di chi è impegnato\nnella lotta.",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "A bewitching aroma wafts from its flower.\nThe fragrance becalms those engaged\nin a battle.",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "花から　うっとりする　香りが\nただよい　戦うものの　気持ちを\nなだめてしまう。",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     },
//     {
//         "flavor_text": "花朵散发出的迷人香味\n能安抚激动的心情，\n甚至消弭斗争。",
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         },
//         "version": {
//             "name": "shield",
//             "url": "https://pokeapi.co/api/v2/version/34/"
//         }
//     }
// ],
//     "form_descriptions": [],
//     "forms_switchable": true,
//     "gender_rate": 1,
//     "genera": [
//     {
//         "genus": "たねポケモン",
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         }
//     },
//     {
//         "genus": "씨앗포켓몬",
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         }
//     },
//     {
//         "genus": "種子寶可夢",
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         }
//     },
//     {
//         "genus": "Pokémon Graine",
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         }
//     },
//     {
//         "genus": "Samen-Pokémon",
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         }
//     },
//     {
//         "genus": "Pokémon Semilla",
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         }
//     },
//     {
//         "genus": "Pokémon Seme",
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         }
//     },
//     {
//         "genus": "Seed Pokémon",
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         }
//     },
//     {
//         "genus": "たねポケモン",
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         }
//     },
//     {
//         "genus": "种子宝可梦",
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         }
//     }
// ],
//     "generation": {
//     "name": "generation-i",
//         "url": "https://pokeapi.co/api/v2/generation/1/"
// },
//     "growth_rate": {
//     "name": "medium-slow",
//         "url": "https://pokeapi.co/api/v2/growth-rate/4/"
// },
//     "habitat": {
//     "name": "grassland",
//         "url": "https://pokeapi.co/api/v2/pokemon-habitat/3/"
// },
//     "has_gender_differences": true,
//     "hatch_counter": 20,
//     "id": 3,
//     "is_baby": false,
//     "is_legendary": false,
//     "is_mythical": false,
//     "name": "venusaur",
//     "names": [
//     {
//         "language": {
//             "name": "ja-Hrkt",
//             "url": "https://pokeapi.co/api/v2/language/1/"
//         },
//         "name": "フシギバナ"
//     },
//     {
//         "language": {
//             "name": "roomaji",
//             "url": "https://pokeapi.co/api/v2/language/2/"
//         },
//         "name": "Fushigibana"
//     },
//     {
//         "language": {
//             "name": "ko",
//             "url": "https://pokeapi.co/api/v2/language/3/"
//         },
//         "name": "이상해꽃"
//     },
//     {
//         "language": {
//             "name": "zh-Hant",
//             "url": "https://pokeapi.co/api/v2/language/4/"
//         },
//         "name": "妙蛙花"
//     },
//     {
//         "language": {
//             "name": "fr",
//             "url": "https://pokeapi.co/api/v2/language/5/"
//         },
//         "name": "Florizarre"
//     },
//     {
//         "language": {
//             "name": "de",
//             "url": "https://pokeapi.co/api/v2/language/6/"
//         },
//         "name": "Bisaflor"
//     },
//     {
//         "language": {
//             "name": "es",
//             "url": "https://pokeapi.co/api/v2/language/7/"
//         },
//         "name": "Venusaur"
//     },
//     {
//         "language": {
//             "name": "it",
//             "url": "https://pokeapi.co/api/v2/language/8/"
//         },
//         "name": "Venusaur"
//     },
//     {
//         "language": {
//             "name": "en",
//             "url": "https://pokeapi.co/api/v2/language/9/"
//         },
//         "name": "Venusaur"
//     },
//     {
//         "language": {
//             "name": "ja",
//             "url": "https://pokeapi.co/api/v2/language/11/"
//         },
//         "name": "フシギバナ"
//     },
//     {
//         "language": {
//             "name": "zh-Hans",
//             "url": "https://pokeapi.co/api/v2/language/12/"
//         },
//         "name": "妙蛙花"
//     }
// ],
//     "order": 3,
//     "pal_park_encounters": [
//     {
//         "area": {
//             "name": "field",
//             "url": "https://pokeapi.co/api/v2/pal-park-area/2/"
//         },
//         "base_score": 90,
//         "rate": 3
//     }
// ],
//     "pokedex_numbers": [
//     {
//         "entry_number": 3,
//         "pokedex": {
//             "name": "national",
//             "url": "https://pokeapi.co/api/v2/pokedex/1/"
//         }
//     },
//     {
//         "entry_number": 3,
//         "pokedex": {
//             "name": "kanto",
//             "url": "https://pokeapi.co/api/v2/pokedex/2/"
//         }
//     },
//     {
//         "entry_number": 228,
//         "pokedex": {
//             "name": "original-johto",
//             "url": "https://pokeapi.co/api/v2/pokedex/3/"
//         }
//     },
//     {
//         "entry_number": 233,
//         "pokedex": {
//             "name": "updated-johto",
//             "url": "https://pokeapi.co/api/v2/pokedex/7/"
//         }
//     },
//     {
//         "entry_number": 82,
//         "pokedex": {
//             "name": "kalos-central",
//             "url": "https://pokeapi.co/api/v2/pokedex/12/"
//         }
//     },
//     {
//         "entry_number": 3,
//         "pokedex": {
//             "name": "letsgo-kanto",
//             "url": "https://pokeapi.co/api/v2/pokedex/26/"
//         }
//     },
//     {
//         "entry_number": 70,
//         "pokedex": {
//             "name": "isle-of-armor",
//             "url": "https://pokeapi.co/api/v2/pokedex/28/"
//         }
//     },
//     {
//         "entry_number": 166,
//         "pokedex": {
//             "name": "blueberry",
//             "url": "https://pokeapi.co/api/v2/pokedex/33/"
//         }
//     }
// ],
//     "shape": {
//     "name": "quadruped",
//         "url": "https://pokeapi.co/api/v2/pokemon-shape/8/"
// },
//     "varieties": [
//     {
//         "is_default": true,
//         "pokemon": {
//             "name": "venusaur",
//             "url": "https://pokeapi.co/api/v2/pokemon/3/"
//         }
//     },
//     {
//         "is_default": false,
//         "pokemon": {
//             "name": "venusaur-mega",
//             "url": "https://pokeapi.co/api/v2/pokemon/10033/"
//         }
//     },
//     {
//         "is_default": false,
//         "pokemon": {
//             "name": "venusaur-gmax",
//             "url": "https://pokeapi.co/api/v2/pokemon/10195/"
//         }
//     }
// ]
// }