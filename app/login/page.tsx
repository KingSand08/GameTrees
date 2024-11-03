"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useRef, FormEvent } from "react";
import { SubmitLogin } from "@/app/utils/customerLogin";

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [isEmailValid, setValidity] = useState<boolean>(true);

    const emailRef = useRef<HTMLInputElement | null>(null);

    const router = useRouter();


    const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        SubmitLogin(
            event,
            email, setEmail,
            setValidity,
            emailRef
        );
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                <div className="flex flex-col w-1/2 bg-slate-800 p-8 rounded-lg">
                    <h1 className="text-2xl mb-3">Sign in page</h1>
                    <div className="flex flex-col space-y-2">
                        <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-4" noValidate>
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
                            <div />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
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