"use client";
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react'
import OAuthButton from './OAuthButton';
import CancelButton from '../buttons/CancelButton';
import AcceptFormButton from '../buttons/AcceptFormButton';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const Signin = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    console.log(props.callbackUrl)

    const email = useRef("");
    const password = useRef("");
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl ?? "http://localhost:300"
        });
    }

    return (
        <div className={props.className}>
            <h1 className='g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-2xl font-semibold'>
                Sign In
            </h1>
            <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="email"
                        className="text-md text-white font-medium"
                    >
                        Email:
                    </label>
                </div>
                <div className='text-md w-full'>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="new type email"
                        className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => (email.current = e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label
                        htmlFor="password"
                        className="text-md text-white font-medium"
                    >
                        Password:
                    </label>
                    <div className='text-md w-full'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="new type password"
                            className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => (password.current = e.target.value)}
                        />
                    </div>
                    <div className='pt-3 mx-auto pb-3'>
                        <button
                            type="button"
                            className="text-black dark:text-slate-200 text-md bg-black bg-opacity-45 max-w-fit mx-auto px-4 py-3 rounded-xl hover:text-white hover:bg-opacity-75"
                            onClick={() => {
                                setShowPassword((prev) => !prev);
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                {/* Form User Choice Section */}
                <div className='flex space-x-5 mx-auto mt-3'>
                    <AcceptFormButton msg="Sign in" />
                    <CancelButton props={{
                        callbackUrl: props.callbackUrl ?? "/"
                    }} />
                </div>
            </form>
            <div className='flex flex-col'>
                <p className="text-black dark:text-slate-200 text-md mx-auto mt-[1em] mb-[1.5em]">
                    OR
                </p>
            </div>

            {/* OAuth Sign-In Buttons */}
            <div className="flex flex-col items-center gap-4">
                <OAuthButton callbackUrl={props.callbackUrl} provider={'google'} />
            </div>

            {/* Error Message */}
            {!!props.error &&
                <div className='flex justify-center mt-10'>
                    <p className='text-red-100 bg-red-600 p-6 rounded-lg w-fit'>
                        {props.error === "CredentialsSignin" ? "Invalid email or password." : "Authentication Failed"}
                    </p>
                </div>
            }
        </div>
    )
}

export default Signin;