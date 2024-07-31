"use client"
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setLoginStatus } from '@/utils/login-status';

interface LoginProps {
  googleText: string;
  emailLabel: string;
  passwordLabel: string;
  submitButtonText: string;
  registerLinkText: string;
}

interface FormData {
    email: string;
    password: string;
  } 

const Login: React.FC<LoginProps> = ({
  googleText,
  emailLabel,
  passwordLabel,
  submitButtonText,
  registerLinkText,
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter(); // Use the router from next/navigation
  
    // Simulate authentication (Replace this with your actual authentication logic)
    const authenticate = (data: FormData) => {
      // Example: hardcoded email and password for demonstration
      if (data.email === 'test@yzedtech.com' && data.password === '123456') {
        setLoginStatus(true); //Set LoginStatus True
        console.log("setloginstatus to be true");
        router.push('/quiz'); // Navigate to the "quiz" page
      } else {  
        toast.error('不正確的信箱或密碼'); // Display error message
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {/* Google Login Button */}
        <button className="btn btn-outline btn-primary w-full mb-4">
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="h-5 w-5 mr-2"
          />
          {googleText}
        </button>

        {/* Email Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit(authenticate)}>
          <div>
            <label htmlFor="email" className="label">
              <span className="label-text">{emailLabel}</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: '信箱是必要的' })}
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="label-text">{passwordLabel}</span>
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: '密碼是必要的' })}
              className="input input-bordered w-full"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {submitButtonText}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {registerLinkText}{' '}
            <Link href="/register" className="text-primary">
              點此註冊
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
