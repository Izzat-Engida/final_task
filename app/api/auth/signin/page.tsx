'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
type Person={
  email:string,
  password:string
}
function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<Person>({ defaultValues: { email: '', password: '' } });
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data:Person ) => {
  setError('');
  setLoading(true);
  const result = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
    callbackUrl: '/',
  });
  setLoading(false);
console.log(data.email,data.password);
  if (result?.error) {
    setError(result.error);
  } else if (result?.ok) {
    
    router.push('/');
  } else {
    setError('Unexpected error occurred.');
  }
};


  const handleGoogleSignIn = async () => {
    setError('');
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="font-Poppins text-[#25324B] font-[900] text-[32px]">
        Welcome Back
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <div
            className="flex justify-center items-center h-[50px] w-auto px-[12px] py-[16px] hover:bg-[#F8F8FD] cursor-pointer mb-6"
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
              Sign In With Google
            </span>
          </div>
          <div className="flex items-center text-[#D6DDEB] font-Epilogue font-[400] text-[16px] leading-[1.6]">
            <span className="block border-t border-[#D6DDEB] w-26 opacity-50 mr-4"></span>
            <p>Or Sign In with Email</p>
            <span className="block border-t border-[#D6DDEB] w-16 opacity-50 ml-4"></span>
          </div>
        </div>

        <div>
          <form className="text-[#515B6F]" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Please enter your email',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0d0990] rounded-[80px] text-white py-[15px] px-[24px] hover:bg-[rgb(13,9,144)] transition-colors disabled:bg-[#0d0990]/50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="py-[12px]">
            <p className="font-Epilogue font-[400] text-[16px] leading-[1.6] text-[#202430]">
              Don’t have an account?{' '}
              <Link href="/SignUp" className="font-Poppins text-[#4640DE]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;