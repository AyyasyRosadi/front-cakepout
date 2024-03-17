'use client'
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/app/api/lib/axios";


export function useGetDisbursementOfFundByUuid(uuid: string, trigger: boolean) {
    const disbursementOfFund = useQuery({
        queryKey: ["get_disbursement_of_fund_by_uuid"],
        queryFn: () => api.get(`/disbursement_of_fund/${uuid}`),
        enabled: uuid !== null ? true : false
    })
    useEffect(() => {
        if (uuid) {
            disbursementOfFund.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid, trigger])
    return disbursementOfFund
}