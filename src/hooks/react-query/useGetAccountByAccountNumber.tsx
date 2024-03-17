'use client'
import api from "@/app/api/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGetAccountByAccountNumber(accountNumber: string) {
    const account = useQuery({
        queryKey: ["get_account_by_account_number"],
        queryFn: () => api.get(`/account/account_number/${accountNumber}`),
        enabled: accountNumber !== null ? true : false
    })
    useEffect(() => {
        if (accountNumber) {
            account.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountNumber])
}