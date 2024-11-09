"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react'

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
            <div className='g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-2xl'>
                Sign In
            </div>
            <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
                <div className="flex flex-col space-y-2 mt-4">
                    <label
                        htmlFor="email"
                        className="text-xl text-white font-medium"
                    >
                        Email:
                    </label>
                </div>
                <div className='text-lg w-full'>
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
                        className="text-xl text-white font-medium"
                    >
                        Password:
                    </label>
                    <div className='text-lg w-full'>
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
                            className="text-black dark:text-slate-200 text-xl bg-black bg-opacity-45 max-w-fit mx-auto px-4 py-3 rounded-xl hover:text-white hover:bg-opacity-75"
                            onClick={() => {
                                setShowPassword((prev) => !prev);
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className='flex space-x-5 mx-auto mt-5'>
                    <div
                        className='text-xl w-28 bg-blue-500 text-center py-2 rounded-md text-white transition hover:bg-blue-800 hover:text-slate-300 hover:border-transparent active:scale-95'>
                        <button type="submit">
                            Sign In
                        </button>
                    </div>
                    <Link
                        href={props.callbackUrl ?? "/"}
                        className='text-xl w-28 border border-red-600 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95'>
                        Cancel
                    </Link>
                </div>
            </form>
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