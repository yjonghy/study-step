import {QUERY_KEYS} from "@src/hook/keys";
import {useQuery} from "@tanstack/react-query";
import {getPocketMonList} from "@src/api/get/route";

export const useGetPocketMonList = () => {
    return useQuery<any>([QUERY_KEYS.GET_POCKET_MON],
        () => getPocketMonList(),{
            enabled : true, retry : 1
        })
}
