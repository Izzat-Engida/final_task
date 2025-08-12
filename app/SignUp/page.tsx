'use client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Person } from '../types/job'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios';
import {signIn} from 'next-auth/react'

function SignUp() {
  const { register, handleSubmit, getValues, formState } = useForm<Person>()
  const { errors } = formState
  const router=useRouter()
  const [error,setError]=useState('')
  const [success,setSucess]=useState('')
  const [loading,setLoading]=useState(false)
  const onSubmit=async(data:Person)=>{
    setError('')
    setSucess('')
    setLoading(true);
    try{
      const res=await axios.post('https://akil-backend.onrender.com/signup',{
        name:data.name,
        email:data.email,
        password:data.password,
        role:data.role || 'user', //why is there a role in the endpoint weird

      });
      setSucess('Signup successful! Please verify your email.');
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    }catch(error){
      setError('Signup failed. Please try again.');
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  const handleGoogleSignIn = async () => {
    setError('');
    await signIn('google',{callbackUrl:'/'});
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
     <p className='font-Poppins text-[#25324B] font-[900] text-[32px] '>
        Sign Up Today!
     </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}


      <div className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
            <div
          className="flex justify-center items-center h-[50px] w-auto  px-[12px] py-[16px] hover:bg-[#F8F8FD] cursor-pointer mb-6"
          role="button"
          tabIndex={0}
          onClick={handleGoogleSignIn}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleGoogleSignIn();
            }
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
          <span className="font-Epilogue font-[700] text-[#4640DE] text-[16px] leading-[1.6] pl-[10px]">
            Sign up With Google
          </span>
        </div>
          <div className="flex items-center text-[#D6DDEB] font-Epilogue font-[400] text-[16px]  leading-[1.6]">
  <span className="block border-t border-[#D6DDEB] w-26 opacity-50 mr-4"></span>
  <p>Or Sign Up with Email</p>
  <span className="block border-t border-[#D6DDEB] w-16 opacity-50 ml-4"></span>
</div>

        </div>

        <div>
          <form className='text-[#515B6F]' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder='Enter your name'
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please enter your name',
                  },
                })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder='Enter your email'
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Please enter your email',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Password
              </label>
                <input
                  type="password"
                  id="password"
                  placeholder='Enter your password'
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Please enter your password',
                    },
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder='Confirm your password'
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Please confirm your password',
                  },
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0d0990] rounded-[80px] text-white py-[15px] px-[24px] hover:bg-[rgb(13,9,144)] transition-colors "
            >
              {loading? 'Signing up...': 'Continue'}
            </button>
          </form>
          <div className='py-[12px]'>
            <p className='font-Epilogue font-[400] text-[16px] leading-[1.6] text-[#202430]'>Already have an account?
                <Link href='/api/auth/signin' className='font-Poppins text-[#4640DE]'>Login</Link>
            
            </p>
            <p className='font-Epilogue font-[400] text-[14px] leading-[1.6] text-[#515B6F] py-[12px]'>By clicking 'Continue', you acknowledge that you have read and accepted
                our <span className='text-[#4640DE]'>Terms of Serivce</span> and <span className='text-[#4640DE]'>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp