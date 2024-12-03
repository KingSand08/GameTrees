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
        <div className="max-w-screen-sm mx-auto py-6">
            <h1 className="text-center text-2xl font-semibold bg-gradient-to-b rounded-md">
                Sign In
            </h1>

            {/* Success Message */}
            {successMsg ? (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-green-600 rounded-lg w-full py-2 px-4 space-x-4">
                        <p className="text-white">{successMsg}</p>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                </div>
            ) : null}

            <form onSubmit={onSubmit} className="p-2 flex flex-col gap-4">

                {/* Email Input */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-white text-md font-medium">
                        Email:
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
                            placeholder="Enter email"
                            onChange={(e) => (email.current = e.target.value)}
                            className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-white text-md font-medium">
                        Password:
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
                            placeholder="Enter password"
                            className="bg-transparent placeholder-gray-400 p-2 w-full focus:outline-none"
                            autoComplete="off"
                            onChange={(e) => (password.current = e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full text-slate-200 text-md bg-black bg-opacity-45 px-4 py-2 rounded-lg hover:bg-opacity-55"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                    <AcceptFormButton msg="Sign in" />
                    <CancelButton props={{ callbackUrl: props.callbackUrl ?? "/" }} />
                </div>
            </form>

            {/* Separator */}
            <div className="text-center text-slate-200 text-md my-3">OR</div>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-4 items-center">
                <OAuthButton callbackUrl={props.callbackUrl} provider={"google"} onSignInStart={handleOAuthSignInStart} />
                <OAuthButton callbackUrl={props.callbackUrl} provider={"discord"} onSignInStart={handleOAuthSignInStart} />
                <OAuthButton callbackUrl={props.callbackUrl} provider={"github"} onSignInStart={handleOAuthSignInStart} />
            </div>

            {/* Error Message */}
            {(errorMsg || props.error) && (
                <div className="bg-red-600 text-white text-center rounded-lg py-2 px-4 mt-4">
                    <p>{errorMsg || getErrorMessage(props.error)}</p>
                </div>
            )}
        </div>
    );
};

export default Signin;
