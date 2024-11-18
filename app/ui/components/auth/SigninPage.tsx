"use client";

import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import OAuthButton from "./OAuthButton";
import CancelButton from "../buttons/CancelButton";
import AcceptFormButton from "../buttons/AcceptFormButton";

type Props = {
    callbackUrl?: string | "/";
    error?: string;
};

const Signin = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const email = useRef("");
    const password = useRef("");

    const getErrorMessage = (error: string | undefined): string => {
        if (!error) return "";
        switch (error) {
            case "CredentialsSignin":
                return "Invalid email or password.";
            default:
                return "Authentication Failed.";
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMsg("");
        setSuccessMsg("Signing in...");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));

            await signIn("credentials", {
                email: email.current,
                password: password.current,
                redirect: true,
                callbackUrl: props.callbackUrl ?? "/"
            });

        } catch (error) {
            setErrorMsg("An error occurred while signing in.");
            console.error(error);
        }
    };

    const handleOAuthSignInStart = () => {
        setSuccessMsg("Signing in...");
        setErrorMsg("");
    };

    return (
        <div className="">
            <h1 className="g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-2xl font-semibold">
                Sign In
            </h1>
            <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-md text-white font-medium">
                        Email:
                    </label>
                </div>
                {/* Email Input */}
                <div className="block">
                    <div className="flex flex-row space-x-3 items-center">
                        <div className="input input-bordered flex items-center gap-2 w-full">
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
                                placeholder="new type email"
                                onChange={(e) => (email.current = e.target.value)}
                                className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Password Input */}
                <div className="block">
                    <label className="text-sm font-medium text-gray-400">Password</label>
                    <div className="flex flex-row space-x-3 items-center">
                        <div className="input input-bordered flex items-center gap-2 w-full">
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
                                placeholder={"Enter new password"}
                                className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                                autoComplete="off"
                                onChange={(e) => (password.current = e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="pt-3 mx-auto pb-3">
                            <button
                                type="button"
                                className="w-fit text-white dark:text-slate-200 text-md bg-black bg-opacity-45 max-w-fit mx-auto px-7 py-3 rounded-xl hover:text-white hover:bg-opacity-55"
                                onClick={() => {
                                    setShowPassword((prev) => !prev);
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Form User Choice Section */}
                <div className="flex space-x-5 mx-auto mt-3">
                    <AcceptFormButton msg="Sign in" />
                    <CancelButton props={{ callbackUrl: props.callbackUrl ?? "/" }} />
                </div>
            </form>
            <div className="flex flex-col">
                <p className="text-white dark:text-slate-200 text-md mx-auto mt-[1em] mb-[1.5em]">OR</p>
            </div>

            {/* OAuth Sign-In Buttons */}
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-3/4">
                    <OAuthButton callbackUrl={props.callbackUrl} provider={"google"} onSignInStart={handleOAuthSignInStart} />
                    <OAuthButton callbackUrl={props.callbackUrl} provider={"discord"} onSignInStart={handleOAuthSignInStart} />
                    <OAuthButton callbackUrl={props.callbackUrl} provider={"github"} onSignInStart={handleOAuthSignInStart} />
                </div>
            </div>

            {/* Success Message */}
            {successMsg ? (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-green-600 rounded-lg w-full py-2 px-4 space-x-4">
                        <p className="text-white">{successMsg}</p>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                </div>
            ) : null}

            {/* Error Message */}
            {errorMsg || props.error ? (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                        <p className="text-white">{errorMsg || getErrorMessage(props.error)}</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Signin;
