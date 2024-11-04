"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useRef, FormEvent } from "react";
import { SubmitSignup } from "@/app/utils/customerSignup";

export default function Page() {
    // State variables
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [phoneNum, setPhoneNum] = useState<string>("");

    // Validity states for input fields
    const [isNameValid, setNameValidity] = useState<boolean>(true);
    const [isUsernameValid, setUsernameValidity] = useState<boolean>(true);
    const [isEmailValid, setEmailValidity] = useState<boolean>(true);
    const [isBirthDayValid, setBirthDayValidity] = useState<boolean>(true);
    const [isPhoneNumValid, setPhoneNumValidity] = useState<boolean>(true);

    // Error message state variable
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Refs for input fields
    const nameRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const birthDayRef = useRef<HTMLInputElement | null>(null);
    const phoneNumRef = useRef<HTMLInputElement | null>(null);

    // Setup app Router
    const router = useRouter();

    // Submission Handler
    const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        SubmitSignup(
            event,
            name,
            username,
            email,
            birthDay,
            phoneNum,
            setNameValidity, setUsernameValidity, setEmailValidity, setBirthDayValidity, setPhoneNumValidity,
            setErrorMessage,
            {
                nameRef,
                usernameRef,
                emailRef,
                birthDayRef,
                phoneNumRef,
            });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                <div className="flex flex-col w-1/2 bg-slate-800 p-8 rounded-lg">
                    <h1 className="text-2xl mb-3">Sign Up</h1>
                    <div className="flex flex-col space-y-2">
                        <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-2" noValidate>
                            <h2 className="font-semibold">Name:</h2>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                ref={nameRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setName(event.target.value)
                                        setNameValidity(true);
                                    }}
                                placeholder="name..."
                                className={`py-1 px-2 rounded-lg border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                                    ${!isNameValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <h2 className="pt-2 font-semibold">Username:</h2>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                ref={usernameRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setUsername(event.target.value)
                                        setUsernameValidity(true);
                                    }}
                                placeholder="username..."
                                className={`py-1 px-2 rounded-lg border text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                                    ${!isUsernameValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <h2 className="pt-2 font-semibold">Email:</h2>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                ref={emailRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setEmail(event.target.value)
                                        setEmailValidity(true);
                                    }}
                                placeholder="email..."
                                className={`py-1 px-2 rounded-lg border text-black focus:text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                                    ${!isEmailValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <h2 className="pt-2 font-semibold">Birthday:</h2>
                            <input
                                id="date"
                                type="date"
                                value={birthDay}
                                ref={birthDayRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setBirthDay(event.target.value)
                                        setBirthDayValidity(true);
                                    }}
                                placeholder="birthday..."
                                className={`py-1 px-2 rounded-lg border 
                                    ${birthDay ? "text-black" : "text-gray-400"} focus:text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                                    ${!isBirthDayValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <h2 className="pt-2 font-semibold">Mobile Phone Number:</h2>
                            <input
                                id="mobilephone"
                                type="tel"
                                value={phoneNum}
                                ref={phoneNumRef}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        setPhoneNum(event.target.value)
                                        setPhoneNumValidity(true);
                                    }}
                                placeholder="phone number..."
                                className={`py-1 px-2 rounded-lg border text-black focus:text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                                    ${!isPhoneNumValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <div className="py-4" />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded-lg"
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
                <p className="text-lg">or</p>
                <button
                    className="border border-blue-500 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => { router.push("/login") }}
                >
                    Sign In
                </button>
            </div>
        </>
    );
}
