'use client'
import api from "@/app/api/lib/axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";


export default function useGetAllAccountingYear(trigger: boolean): UseQueryResult<AxiosResponse<any, any>, Error> {
    const accountingYear = useQuery({
        queryKey: ['get_all_accounting_year'],
        queryFn: () => api.get(`/cakepout/accounting-year`),
        enabled: trigger ? true : false
    })
    useEffect(() => {
        accountingYear.refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger])
    return accountingYear
}
