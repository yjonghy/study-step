"use client"

import {useGetPocketMonList} from "@src/hook/query";
import {useEffect} from "react";

export default function PocketMonDetail(){

    const getPocketMonListQuery = useGetPocketMonList()



    useEffect(() => {
        if (!getPocketMonListQuery.isLoading && getPocketMonListQuery.isSuccess) {
            //console.log(getPocketMonListQuery.data)
        }
    }, [getPocketMonListQuery.isFetching])

    return(
        <section>

        </section>
    )
}