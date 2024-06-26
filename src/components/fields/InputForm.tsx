import { ChangeEventHandler, ReactNode, useEffect } from "react";
import { InputType } from "@/type";
import { UseFormReturn } from "react-hook-form";
import { convertToRupiah, formatRupiah } from "@/helper/currency";

type InputFormAttributes = {
    id: string;
    max?: number;
    step?: number;
    type?: InputType;
    title?: string;
    className?: string;
    read?: boolean;
    icon?: ReactNode;
    methodName: string;
    method: UseFormReturn<any, any, undefined>;
    whiteText?: boolean;
    isConvert?: boolean;
    isSetValue?: boolean;
    setValue?: string | number | undefined;
    noMessage?:boolean;
}
function InputForm({ id, max, step, type, title, className, read, icon, method, methodName, whiteText, isConvert, isSetValue, setValue,noMessage }: InputFormAttributes): ReactNode {
    const { error } = method.getFieldState(methodName)
    const watch = method.watch(methodName)
    useEffect(() => {
        if (isConvert) {
            let value = convertToRupiah(watch)
            let toIdr = formatRupiah(value, '')
            method.setValue(methodName, toIdr)
        }
        if (isSetValue && setValue) {
            let toIdr = formatRupiah(setValue as number, '')
            method.setValue(methodName, toIdr)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConvert, watch, isSetValue, setValue])
    return (
        <div className={`flex flex-col relative w-[100%] items-center`}>
            <label htmlFor={id} className={`text-left w-full font-montserrat font-semibold ${whiteText ? 'text-white' : 'text-gray-700'}`}>{title}</label>
            <div className='flex w-full'>
                <input id={id} {...method.register(methodName)} max={max} step={step} type={type} className={`py-[7px] px-2 outline-none border border-gray-400 mt-1 text-gray-800 hover:border-gray-400 w-full font-montserrat ${className}`} readOnly={read} />
                {icon}
            </div>
            {error && !noMessage && <p className={`mt-1 px-[4px] text-sm font-light text-left w-full ${whiteText ? 'text-red-100' : 'text-red-600'}`}>{error.message}</p>}
        </div>
    )
}

export default InputForm