import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = (props) => {
  const navigate = useNavigate(); // Initialize navigate
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  

  const handleSignUp = (data) => {
    const {firstName, email, password } = data;
    props.handleSignUp(firstName, email, password);
    navigate('/dashboard')
  }

  return (
    <div className='flex flex-col w-screen h-screen bg-zinc-900 justify-center items-center'>
      <h2 className='font-semibold text-white text-3xl m-2 font-[Gilroy-Medium]'>Signup</h2>
      <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col lg:w-1/4 md:w-1/2 sm:w-1/2 gap-4 border-2 border-emerald-600 rounded-lg px-4 py-10'>
        
        <input
          className='px-5 py-2 border-2 border-emerald-600 text-white text-sm rounded-full w-full bg-transparent outline-none'
          type="text"
          placeholder='First Name'
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <p className="text-red-500">Name is required</p>}
        
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
          value='Signup'
        />
        
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </form>

      <div className='mt-4 text-white'>
        <p>
          Already have an account? 
          <span 
            className='text-emerald-600 hover:underline cursor-pointer' 
            onClick={() => navigate('/login')} // Use navigate to go to the Login component
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
