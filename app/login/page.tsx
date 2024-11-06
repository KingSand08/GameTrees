"use client";

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useRef } from "react";
// import { SubmitLogin } from "@/app/utils/customerLogin";

export default function Page() {
    // State variables
    const [email, setEmail] = useState<string>("");
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    // Validity states for input fields
    const [isEmailValid, setValidity] = useState<boolean>(true);

    // // Error message state variable
    // const [errorUiMsg, setErrorUiMsg] = useState<string>("");

    // Refs for input fields
    const emailRef = useRef<HTMLInputElement | null>(null);

    // Setup app Router
    const router = useRouter();

    // // Submission Handler
    // const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     SubmitLogin(
    //         event,
    //         email,
    //         setValidity,
    //         setErrorUiMsg,
    //         emailRef
    //     );
    // };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                <div className="flex flex-col w-1/2 bg-slate-800 p-8 rounded-lg">
                    <h1 className="text-2xl mb-3">Sign in page</h1>
                    <div className="flex flex-col space-y-2">
                        <form action={formAction} className="flex flex-col space-y-4">
                            <h2 className="font-semibold">Email:</h2>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                ref={emailRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setEmail(event.target.value);
                                        setValidity(true);
                                    }}
                                placeholder="email..."
                                className={`py-1 px-2 rounded-lg border text-black focus:text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${!isEmailValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <div />
                            <button
                                className="bg-blue-500 text-white py-2 rounded-lg"
                                aria-disabled={isPending}
                            >
                                Submit
                            </button>
                        </form>
                        {/* Conditional rendering of the error message */}
                        {errorMessage && (
                            <>
                                <div className="py-1" />
                                <div className="opacity-85 flex justify-center text-center bg-red-600 rounded-lg w-fit mx-auto py-2 px-4 mt-[10em]">
                                    <p className="text-white">{errorMessage}</p>
                                </div>
                            </>
                        )}

                    </div>
                </div>
                <p className="text-lg">
                    or
                </p>
                <button
                    className="border border-blue-500 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => { router.push("./signup") }}
                >
                    Sign Up
                </button>

            </div>
        </>
    );
}