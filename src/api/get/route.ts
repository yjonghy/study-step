import axios from "axios";


const pokeApiUrl = `https://pokeapi.co/api/v2`
export const getPocketMonList = async () => {
    const { data } = await axios.get(`${pokeApiUrl}/pokemon-species`)
    return data
}

