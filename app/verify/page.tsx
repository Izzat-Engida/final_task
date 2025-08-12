'use client';
import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter,useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

type OTPData = {
  otp: string;
};

function VerifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPData>();
  const router = useRouter();
  const sea=useSearchParams();
  const email=sea.get('email');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

 

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data: OTPData) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axios.post('https://akil-backend.onrender.com/verify-email', {
        email,
        OTP: data.otp,
      });
      setSuccess('Email verified successfully!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setError('Email is missing.');
      return;
    }

    setError('');
    setSuccess('');
    setResending(true);
    try {
      await axios.post('https://akil-backend.onrender.com/resend-otp', { email });
      setSuccess('A new OTP has been sent to your email.');
      setTimer(30);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <p className="font-Poppins text-[#25324B] font-[900] text-[32px] mb-4">
        Verify Your Email
      </p>
      <p className="text-sm text-gray-500 mb-4">OTP sent to <strong>{email}</strong></p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="w-full max-w-md p-6">
        <form className="text-[#515B6F]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="otp" className="block font-Epilogue font-[600] text-[16px] leading-[1.6] mb-1">
              OTP (4 digits)
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter 4-digit OTP"
              maxLength={4}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('otp', {
                required: 'Please enter your OTP',
                pattern: {
                  value: /^\d{4}$/,
                  message: 'OTP must be a 4-digit number',
                },
              })}
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d0990] rounded-[80px] text-white py-[15px] px-[24px] hover:bg-[rgb(13,9,144)] transition-colors disabled:bg-[#0d0990]/50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="py-4">
          <p className="font-Epilogue text-[14px] text-[#202430] text-center">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resending || timer > 0}
              className="text-[#4640DE] font-semibold underline ml-1"
            >
              {resending
                ? 'Sending...'
                : timer > 0
                ? `Resend in ${timer}s`
                : 'Resend OTP'}
            </button>
          </p>
        </div>

        <p className="text-center mt-4 font-Epilogue text-[14px] text-[#202430]">
          Back to{' '}
          <Link href="/SignUp" className="text-[#4640DE] font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
