'use client'
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import api from "@/app/api/lib/axios";
import { AxiosResponse } from "axios";
import { UpdateWithdrawDisbursementOfFundAttributes } from "@/form-type";



export function useUpdateWithDrawDisbursementOfFund(): UseMutationResult<AxiosResponse<any, any>, Error, UpdateWithdrawDisbursementOfFundAttributes, unknown> {
    const disbursementOfFund = useMutation({
        mutationKey: ['update_withdraw_disbursement_of_fund'],
        mutationFn: (e: UpdateWithdrawDisbursementOfFundAttributes) => api.put(`/cakepout/isbursement-of-fund/withdraw/${e.uuid}`, e.data),
        onSuccess: (e) => {
            return e
        },
        onError: (e) => {
            return e
        }
    })
    return disbursementOfFund
}
