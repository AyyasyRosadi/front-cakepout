'use client'
import monthIndex from '@/components/constants/monthIndex'
import Selector from '@/components/fields/Selector'
import Loading from '@/components/templates/Loading'
import { currency } from '@/helper/currency'
import { useGetReportBalancingStatement } from '@/hooks/react-query/useGetReportBalancingStatement'
import { AccountAttributes, AmountAndGroupAttributes, GroupBalanceReportAttributes, SelectAttributes } from '@/type'
import React, { useEffect, useState } from 'react'

const ColumnGroup = ({ data, title }: { data: AmountAndGroupAttributes, title: string, group: number }) => {
    return (
        <div>
            <h1 className='font-montserrat text-xl text-sky-800 font-semibold mb-3'>{title}</h1>
            {data?.group?.map((val: GroupBalanceReportAttributes, index: number) => (
                <div key={index} className='px-3'>
                    <h1 className='font-montserrat text-sky-800 font-semibold'>{val.group_account_name}</h1>
                    <div>
                        <div className="bg-white border-b border-slate-100 hover:bg-gray-100 overflow-y-auto flex justify-between">
                            <h1 className='w-[10%] text-sm font-semibold'>COA</h1>
                            <h1 className='w-[30%] text-sm font-semibold'>AKUN</h1>
                            <h1 className='w-[30%] text-sm font-semibold'>Nilai</h1>
                        </div>
                        {val?.accounts?.map((account: Omit<AccountAttributes, 'group_account_id' | 'activity_id'> & { amount: number }, idx: number) => (
                            <div key={idx} className="bg-white border-b border-slate-100 hover:bg-gray-100 overflow-y-auto flex justify-between">
                                <h1 className='w-[10%] text-sm'>{account.account_number}</h1>
                                <h1 className='w-[30%] text-sm'>{account.name}</h1>
                                <h1 className='w-[30%] text-sm'>{account.amount ? currency(account.amount) : currency(0)}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className='px-3'>
                <div className='w-[100%] h-[2px] bg-slate-600 my-1'></div>
                <h1 className='text-right'>Total Akhir : {data?.finalAmount ? currency(data.finalAmount) : currency(0)}</h1>
            </div>
        </div>
    )
}

export default function Page() {
    const [month, setMonth] = useState<SelectAttributes>({ value: null, label: '' })
    const report = useGetReportBalancingStatement(month.value as number)
    const reportBalancing = report?.data?.data
    const loadingReport = report?.isLoading
    const [kredit, setKredit] = useState(0)
    const [debit, setDebit] = useState(0)
    console.log(reportBalancing)
    useEffect(() => {
        if (reportBalancing) {
            setDebit(reportBalancing?.harta?.finalAmount)
            setKredit((reportBalancing?.kewajiban?.finalAmount + reportBalancing?.modal?.finalAmount) + reportBalancing.labaRugi)
        }
    }, [reportBalancing])
    return (
        <>
            <Loading show={loadingReport} />
            <div className='flex justify-center'>
                <div className='w-[40vw] p-4 bg-white shadow-xl'>
                    <Selector instanceId='select-month-report' title='Pilih Bulan' options={monthIndex} value={month} onChange={(val) => setMonth(val)} />
                    <div className='w-[100%] h-[2px] bg-slate-600 my-5'></div>
                    {month?.value ?
                        <>
                            <ColumnGroup data={reportBalancing?.harta} title='Harta' group={1} />
                            <ColumnGroup data={reportBalancing?.kewajiban} title='Kewajiban' group={2} />
                            <ColumnGroup data={reportBalancing?.modal} title='Modal' group={3} />
                            <div>
                                <h1 className='font-montserrat text-xl text-sky-800 font-semibold mb-3'>Laba Rugi</h1>
                                <div className='px-3'>
                                    <div className="bg-white border-b border-slate-100 hover:bg-gray-100 overflow-y-auto flex justify-between">
                                        <h1 className='w-[10%] text-sm font-semibold'></h1>
                                        <h1 className='w-[30%] text-sm font-semibold'></h1>
                                        <h1 className='w-[30%] text-sm font-semibold'>Nilai</h1>
                                    </div>
                                    <div className="bg-white border-b border-slate-100 hover:bg-gray-100 overflow-y-auto flex justify-between">
                                        <h1 className='w-[10%] text-sm'></h1>
                                        <h1 className='w-[30%] text-sm'></h1>
                                        <h1 className='w-[30%] text-sm'>{reportBalancing?.labaRugi ? currency(reportBalancing?.labaRugi) : currency(0)}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='px-3'>
                                <div className='w-[100%] h-[2px] bg-slate-600 my-1'></div>
                                <div className='flex gap-7 justify-end'>
                                    <h1 className='text-right'>Debit : {debit ? currency(debit) : currency(0)}</h1>
                                    <h1 className='text-right'>Kredit : {kredit ? currency(kredit) : currency(0)}</h1>
                                </div>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}
