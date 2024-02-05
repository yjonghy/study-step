import axios from "axios";
import {number} from "prop-types";


const pokeApiUrl = `https://pokeapi.co/api/v2`
export const getPocketSpecies = async (number : string) => {
    const { data } = await axios.get(`${pokeApiUrl}/pokemon-species/${number}`)
    return data
}

export const getPocketInfo = async (number: string) => {
    const { data } = await axios.get(`${pokeApiUrl}/pokemon/${number}`)
    return data
}

