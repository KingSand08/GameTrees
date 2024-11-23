"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import CustomerRegistration from "@/database/queries/auth/customerRegisteration";
import CancelButton from "../buttons/CancelButton";
import AcceptFormButton from "../buttons/AcceptFormButton";
import { signIn } from "next-auth/react";

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const SignUp = (props: Props) => {
    useFormStatus();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call the customer registration API
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const result = await CustomerRegistration(formData);

            // If registration was successful, sign the user in
            if (result.status === "success") {

                setErrorMsg("");
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                setSuccessMsg(result.message)
                await new Promise(f => setTimeout(f, 1200))
                    .then(async () => {
                        await signIn("credentials", {
                            email: email,
                            password: password,
                        });
                    });

            } else {
                setErrorMsg(result.message);
            }
        } catch (error) {
            setErrorMsg("An error occurred during registration.");
            console.error(error);
        }
    };

    return (
        <>
            <div className={props.className}>
                <h1 className="g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-2xl font-semibold">
                    Sign Up
                </h1>
                <form
                    className="p-2 flex flex-col gap-3"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {/* Username Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="username"
                            className="text-white text-md font-medium"
                        >
                            *Username:
                        </label>
                        <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                                />
                            </svg>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Master Chief"
                                required
                                className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="fname"
                            className="text-white text-md font-medium"
                        >
                            *Full Name:
                        </label>
                        <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 opacity-70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Marston"
                                required
                                className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="email"
                            className="text-white text-md font-medium"
                        >
                            *Email:
                        </label>
                        <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="games@g.com"
                                required
                                className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* DOB Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="date"
                            className="text-white text-md font-medium"
                        >
                            *Date of Birth:
                        </label>
                        <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 opacity-70"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                placeholder="date of birth"
                                required
                                className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="tel"
                            className="text-white text-md font-medium"
                        >
                            Mobile Phone:
                        </label>
                        <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.15 19.37 19.37 0 01-6-6A19.86 19.86 0 013.1 4.18 2 2 0 015.12 2h3a2 2 0 012 1.72 12.07 12.07 0 00.57 2.54 2 2 0 01-.45 2L8.09 9.91a16 16 0 006 6l1.65-1.65a2 2 0 012-.45 12.07 12.07 0 002.54.57A2 2 0 0122 16.92z" />
                            </svg>
                            <input
                                type="tel"
                                id="tel"
                                name="tel"
                                placeholder="(408)000-0000"
                                className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="w-full block mt-4">
                        <div className="flex flex-col space-y-2">
                            <label
                                htmlFor="tel"
                                className="text-white text-md font-medium"
                            >
                                *Password:
                            </label>
                            <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="new type password"
                                    required
                                    className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>


                        <div className='w-full flex items-center py-2'>
                            <button
                                type="button"
                                className="w-full dark:text-slate-200 text-md bg-black bg-opacity-45 mx-auto px-7 py-3 rounded-xl hover:hover:bg-opacity-55"
                                onClick={() => {
                                    setShowPassword((prev) => !prev);
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Form User Choice Section */}
                    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                        <AcceptFormButton msg="Sign Up" name="submit" id="submit" value="register" />
                        <CancelButton props={{ callbackUrl: props.callbackUrl ?? "/" }} />
                    </div>

                    {/* Error Message */}
                    {errorMsg ? (
                        <div className="text-white py-2 mt-4">
                            <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                                <p className="text-white">{errorMsg}</p>
                            </div>
                        </div>
                    ) : null}

                    {/* Success Message */}
                    {successMsg ? (
                        <div className="text-white py-2 mt-4">
                            <div className="opacity-75 flex justify-center text-center bg-green-600 rounded-lg w-full py-2 px-4 space-x-4">
                                <p className="text-white">{successMsg}</p>
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        </div>
                    ) : null}
                </form>
            </div>
        </>
    );
};

export default SignUp;