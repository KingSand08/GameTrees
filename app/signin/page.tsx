"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [isValid, setValidity] = useState<boolean>(true);
    const lastInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the email input


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setValidity(true);
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        return emailRegex.test(email);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (email.trim() === "") {
            alert("Email field cannot be empty!"); // Alert if empty
            lastInputRef.current?.focus(); // Focus the email input
            setValidity(false);
        } else if (!isValidEmail(email)) {
            alert("Please enter a valid email address!"); // Alert for invalid email format
            setValidity(false);
            lastInputRef.current?.focus(); // Focus the email input
        } else {
            console.log("Form submitted with email:", email);
            setValidity(true);
            // You can add further submission logic here
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col w-1/2 bg-slate-800 font-semibold p-8 rounded-lg">
                    <h1 className="text-2xl mb-3">Sign in page</h1>
                    <div className="flex flex-col space-y-2">
                        <h2>Email:</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4" noValidate>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                ref={lastInputRef}
                                onChange={handleInputChange}
                                placeholder="email..."
                                className={`py-1 px-2 rounded-lg border text-black focus:text-black border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${!isValid ? "border-red-600 text-red-800" : "border-gray-300"}`}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}