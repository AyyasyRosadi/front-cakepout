'use client'
import api from "@/app/api/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGetAllMonthlyAccountCalculation() {
    const monthlyAccountCalculation = useQuery({
        queryKey: ['get_all_monthly_account_calculation'],
        queryFn: () => api.get(`/monthly_account_calculation`),
    })
    useEffect(() => {
        monthlyAccountCalculation.refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return monthlyAccountCalculation
}

export function useGetMonthlyAccountCalculationByMonthIndex(monthIndex: string) {
    const monthlyAccountCalculation = useQuery({
        queryKey: ['get_monthly_account_calculation_by_month_index'],
        queryFn: () => api.get(`/monthly_account_calculation/month_index/${monthIndex}`),
    })
    useEffect(() => {
        if (monthIndex) {
            monthlyAccountCalculation.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthIndex])
    return monthlyAccountCalculation

}

export function useGetMonthlyAccountCalculationByYear(year: string) {
    const monthlyAccountCalculation = useQuery({
        queryKey: ['get_monthly_account_calculation_by_year'],
        queryFn: () => api.get(`/monthly_account_calculation/year/${year}`),
    })
    useEffect(() => {
        if (year) {
            monthlyAccountCalculation.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year])
    return monthlyAccountCalculation
}