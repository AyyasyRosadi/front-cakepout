'use client'
import React, { useEffect } from 'react'
import { Location } from '../../TableData'
import TitleTable from '@/components/custom/TitleTable'
import FormBeginingBalance from './Form'
import { useGetAccountBeginingBalancing } from '@/hooks/react-query/useGetAccountBeginingBalancing'
import { useRouter } from 'next/navigation'
import Loading from '@/components/templates/Loading'

export default function Page() {
    const navigate = useRouter()
    const allAccount = useGetAccountBeginingBalancing(true)
    useEffect(() => {
        if (allAccount?.data?.data?.harta?.find((harta) => harta?.account?.find((val) => val?.ledger?.length! > 0))) {
            navigate.push('/home/ledger/journal')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allAccount?.data?.data])
    return (
        <>
            <Location />
            <Loading show={allAccount?.isLoading} />
            <div className='border bg-white px-7 py-10 full rounded-sm shadow-md mt-[2vh]'>
                <div className='flex justify-between mb-5 h-[10%]'>
                    <TitleTable title={"Saldo Awal"} />
                </div>
                <FormBeginingBalance data={allAccount?.data?.data!} loading={allAccount?.isLoading} />
            </div>
        </>
    )
}
