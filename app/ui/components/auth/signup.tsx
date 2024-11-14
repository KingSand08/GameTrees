"use client";

import React, { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import CustomerRegistration from "@/database/customerRegisteration";

const initialState = {
    message: "",
};

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const SignUp = (props: Props) => {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(CustomerRegistration, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full  flex flex-col p-8 bg-slate-800 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-4 text-white font-semibold text-center">
                        Sign Up
                    </h1>
                    <form method="post" action={formAction}>
                        <div className="flex flex-col space-y-2">
                            <label
                                htmlFor="username"
                                className="text-lg text-white font-medium"
                            >
                                *Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Mastercheif"
                                required
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label
                                htmlFor="name"
                                className="text-lg text-white font-medium"
                            >
                                *Full Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Marston"
                                required
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label
                                htmlFor="email"
                                className="text-lg text-white font-medium"
                            >
                                *Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="games@g.com"
                                required
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label
                                htmlFor="date"
                                className="text-lg text-white font-medium"
                            >
                                *Date of Birth:
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                placeholder="date of birth"
                                required
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label
                                htmlFor="tel"
                                className="text-lg text-white font-medium"
                            >
                                Mobile Phone:
                            </label>
                            <input
                                type="tel"
                                id="tel"
                                name="tle"
                                placeholder="(408)000-0000"
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label
                                htmlFor="password"
                                className="text-lg text-white font-medium"
                            >
                                *Password:
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="new type password"
                                required
                                className="py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="text-black dark:text-white"
                                onClick={() => {
                                    setShowPassword((prev) => !prev);
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Error Message */}
                        <div className="text-white py-2 mt-4">
                            {state?.message ? (
                                <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                                    <p className="text-white">{state?.message}</p>
                                </div>
                            ) : null}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            name="submit"
                            id="submit"
                            value="register"
                            className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            {pending ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;