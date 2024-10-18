import React, { useState } from 'react'
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <>
        <div className='flex w-screen h-screen bg-zinc-900 justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col lg:w-1/4 md:w-1/2 sm:w-1/2 gap-4 border-2 border-emerald-600 rounded-lg  px-4 py-10'>
                <input 
                className='px-5 py-2 border-2 border-emerald-600 text-white text-sm rounded-full w-full bg-transparent'
                type="email" 
                placeholder='Email' 
                {...register("email")}/>
                <input 
                className='px-5 py-2 border-2 border-emerald-600 text-white text-sm rounded-full w-full bg-transparent'
                type="password" 
                placeholder='Password' />

                <input 
                className='px-5 py-2 border-2 bg-emerald-600 outline-none border-none text-white text-sm rounded-full w-full bg-transparent'
                type="submit" 
                value='Login' 
                {...register("password")}
                />
                

            </form>

        </div>
    </>
  )
}

export default Login