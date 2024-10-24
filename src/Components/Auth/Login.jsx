import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider'; // Adjust the import path

const Login = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (data) => {
    const { email, password } = data;
    props.handleLogin(email, password);
  }

  return (
    <div className='flex w-screen h-screen bg-zinc-900 justify-center items-center'>
      <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col lg:w-1/4 md:w-1/2 sm:w-1/2 gap-4 border-2 border-emerald-600 rounded-lg px-4 py-10'>
        <input
          className='px-5 py-2 border-2 border-emerald-600 text-white text-sm rounded-full w-full bg-transparent outline-none'
          type="email"
          placeholder='Email'
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        
        <input
          className='px-5 py-2 border-2 border-emerald-600 text-white text-sm rounded-full w-full bg-transparent outline-none'
          type="password"
          placeholder='Password'
          {...register("password", { required: true })}
        />
        {errors.password && <p className="text-red-500">Password is required</p>}
        
        <input
          className='px-5 py-2 border-2 bg-emerald-600 outline-none border-none text-white text-sm rounded-full w-full cursor-pointer hover:bg-emerald-700'
          type="submit"
          value='Login'
        />
        
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
