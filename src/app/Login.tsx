'use client'
import Image from "next/image";
import Example from "@/assets/icons/example.png"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import InputForm from "@/components/fields/InputForm";
import { UseLogin } from "@/queries/authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/templates/Loading";
import UseCheckHasLogin from "@/hooks/useCheckHasLogin";
import { AuthenticationAttributes } from "@/type";

export default function Login() {
    UseCheckHasLogin()
    const navigation = useRouter()
    const [showLoading, setShowLoading] = useState(false)
    const method = useForm({
        mode: 'all',
        resolver: yupResolver(
            yup.object().shape({
                username: yup.string().required('username cannot empty'),
                password: yup.string().min(8, 'password at least have 8 character').required('password cannot empty'),
            })
        )
    })
    const submit_ = async (e: AuthenticationAttributes) => {
        setShowLoading(true)
        const isLogin = await UseLogin(e)
        if (isLogin?.status === 200 && isLogin?.url) {
            console.log('hello')
            navigation.push(isLogin?.url)
            console.log(isLogin)
        }
        setShowLoading(false)
    }
    return (
        <>
            <Loading show={showLoading} />
            <div className="flex justify-center items-center h-screen">
                <div className="w-[30vw] rounded-xl shadow-xl border bg-sky-600">
                    <div className="p-4 flex items-center gap-2">
                        <Image src={Example} alt="" className="w-10 h-10 bg-white rounded-full p-1" />
                        <h1 className="font-semibold font-montserrat text-white text-lg">Cakepout</h1>
                    </div>
                    <form className="p-4 flex flex-col items-end" onSubmit={method.handleSubmit(submit_)}>
                        <InputForm title="Username" method={method} methodName="username" whiteText />
                        <InputForm title="Password" method={method} methodName="password" whiteText />
                        <button type="submit" className="bg-white px-5 py-2 mt-4 flex font-montserrat text-sky-700 rounded-md hover:bg-slate-100 cursor-pointer">Login</button>
                    </form>
                </div>
            </div >
        </>
    );
}