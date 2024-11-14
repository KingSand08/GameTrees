"use client";

import React, { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import CustomerRegistration from "@/database/customerRegisteration";
import CancelButton from "../buttons/CancelButton";
import AcceptFormButton from "../buttons/AcceptFormButton";

const initialState = {
    message: "",
};

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const SignUp = (props: Props) => {
    useFormStatus();
    const [state, formAction] = useFormState(CustomerRegistration, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className={props.className}>
                <h1 className="g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-3xl font-semibold">
                    Sign Up
                </h1>
                <form method="post" action={formAction} className="p-2 flex flex-col gap-3">
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="username"
                            className="text-xl text-white font-medium"
                        >
                            *Username:
                        </label>
                    </div>
                    <div className='text-lg w-full'>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Mastercheif"
                            required
                            className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                        <label
                            htmlFor="name"
                            className="text-xl text-white font-medium"
                        >
                            *Full Name:
                        </label>
                        <div className='text-lg w-full'>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Marston"
                                required
                                className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                        <label
                            htmlFor="email"
                            className="text-xl text-white font-medium"
                        >
                            *Email:
                        </label>
                        <div className='text-lg w-full'>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="games@g.com"
                                required
                                className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                        <label
                            htmlFor="date"
                            className="text-xl text-white font-medium"
                        >
                            *Date of Birth:
                        </label>
                        <div className='text-lg w-full'>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                placeholder="date of birth"
                                required
                                className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                        <label
                            htmlFor="tel"
                            className="text-xl text-white font-medium"
                        >
                            Mobile Phone:
                        </label>
                        <div className='text-lg w-full'>
                            <input
                                type="tel"
                                id="tel"
                                name="tle"
                                placeholder="(408)000-0000"
                                className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4">
                        <label
                            htmlFor="password"
                            className="text-xl text-white font-medium"
                        >
                            *Password:
                        </label>
                        <div className='text-lg w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="new type password"
                                required
                                className="w-full py-2 px-4 rounded-lg border text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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

                    {/* Form User Choice Section */}
                    <div className='flex space-x-5 mx-auto mt-3'>
                        <AcceptFormButton
                            msg="Sign Up"
                            name="submit"
                            id="submit"
                            value="register"
                        />
                        <CancelButton props={{
                            callbackUrl: props.callbackUrl ?? "/"
                        }} />
                    </div>

                    {/* Error Message */}
                    {state?.message ? (
                        <div className="text-white py-2 mt-4">

                            <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                                <p className="text-white">{state?.message}</p>
                            </div>
                        </div>
                    ) : null}
                </form>
            </div>
        </>
    );
};

export default SignUp;