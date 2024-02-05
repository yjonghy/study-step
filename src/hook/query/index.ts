import {QUERY_KEYS} from "@src/hook/keys";
import {useQuery} from "@tanstack/react-query";
import {getPocketInfo, getPocketSpecies} from "@src/api/get/route";

export const useGetPocketSpecies = (number : string) => {
    return useQuery<any>([QUERY_KEYS.GET_POCKET_MON_SPECIES],
        () => getPocketSpecies(number),{
            enabled : true
        })
}
export const useGetPocketInfo = (number : string) => {
    return useQuery<any>([QUERY_KEYS.GET_POCKET_MON_INFO],
        () => getPocketInfo(number),{
            enabled : true
        })
}