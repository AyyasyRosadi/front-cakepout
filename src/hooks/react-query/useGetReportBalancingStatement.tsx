'use client'
import api from "@/app/api/lib/axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";


export function useGetReportBalancingStatement(monthIndex: number): UseQueryResult<AxiosResponse<any, any>, Error> {
    const reportBalancing = useQuery({
        queryKey: ['get_report_balance_statement'],
        queryFn: () => api.get(`/cakepout/report/balance-statement?month_index=${monthIndex}`),
        enabled: monthIndex !== null ? true : false
    })
    useEffect(() => {
        if (monthIndex !== null) {
            reportBalancing.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthIndex])
    return reportBalancing
}