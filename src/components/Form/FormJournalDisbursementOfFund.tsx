import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import Modal from '../templates/Modal'
import Form from '../templates/Form'
import SelectForm from '../fields/SelectForm'
import useAccountByGroupOptions from '@/options/useAccountByGroupOptions'
import { AddJournalDisbursementOfFundAttributes } from '@/form-type'
import InputForm from '../fields/InputForm'
import { usePtkOptions } from '@/options/usePtkOptions'
import TextAreaForm from '../fields/TextAreaForm'
import Input from '../fields/Input'

export default function FormJournalDisbursementOfFund({ show, close, submit, groupId }: { show: boolean, close: () => void, submit: SubmitHandler<AddJournalDisbursementOfFundAttributes>, groupId: string }) {
    const [receipient, setReceipient] = useState(0)
    const method = useForm({
        mode: 'all',
        resolver: yupResolver(
            yup.object().shape({
                from_account: yup.string().required('akun sumber tidak boleh kosong'),
                transaction_date: yup.string().required("Tanggal tidak boleh kosong"),
                description: yup.string().required("Deskripsi tidak boleh kosong"),
                id: yup.string().required('id tidak boleh kosong'),
                ptk_id: yup.string(),
                receipient: yup.string()
            })
        )
    })

    const fromAccountOptions = useAccountByGroupOptions(1, show)
    useEffect(() => {
        if (show && groupId !== "") {
            method.reset({ id: groupId })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, groupId])
    const ptkOptions = usePtkOptions()
    return (
        <Modal title='Tambah Jurnal' show={show} close={close}>
            <Form submit={method.handleSubmit(submit)}>
                <div className=''>
                    <SelectForm instanceId='select-akun-options' title='Dari akun' method={method} methodName='from_account' options={fromAccountOptions} />
                    <InputForm id='transaction-date-journal-disbursement-of-fund' title='Tanggal transaksi' method={method} methodName='transaction_date' type='date' />
                    <TextAreaForm method={method} methodName='description' title='Deskripsi' />
                    <SelectForm instanceId='select-ptk-options' title='PTK' method={method} methodName='ptk_id' options={ptkOptions} />
                    <InputForm id='receipient-journal-disbursement-of-fund' title='Penerima' method={method} methodName='receipient' />
                </div>
            </Form>
        </Modal>
    )
}
