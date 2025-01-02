"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ClientAccountSettings() {
    const { data: session, update: updateSession } = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingLastname, setIsEditingLastname] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);

    const [isUpdating, setUpdating] = useState(false);

    const hasChanges =
        username !== "" ||
        email !== "" ||
        firstname !== "" ||
        lastname !== "" ||
        password !== "" ||
        selectedFile !== null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setUpdating(true);
        setErrorMsg("");

        const formData = new FormData();
        if (username) formData.append("username", username);
        if (email) formData.append("email", email);
        if (firstname) formData.append("firstname", firstname);
        if (lastname) formData.append("lastname", lastname);
        if (password) formData.append("password", password);
        if (selectedFile) formData.append("file", selectedFile);


        try {
            const response = await fetch("/api/users/update", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                if (data.refresh) {
                    await updateSession({
                        user: {
                            id: session?.user.id,
                            username: username || session?.user.username,
                            email: email || session?.user.email,
                            firstname: firstname || session?.user.firstname,
                            lastname: lastname || session?.user.lastname,
                        },
                    });
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                    window.location.reload()
                }
                window.location.reload()
            } else {
                setUpdating(false);
                setErrorMsg(`Failed to update user: ${data.message}`);
            }
        } catch (error) {
            setUpdating(false);
            setErrorMsg(error as string);
        }
    };

    return (
        <>
            <div className="relative flex justify-center items-center rounded-lg w-full select-none">
                {/* Overlay and Spinner */}
                {isUpdating && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 rounded-lg">
                        <span className="loading loading-bars loading-lg text-white"></span>
                    </div>
                )}

                {/* Main Form */}
                <div
                    className={`w-full rounded-lg p-8 transition-opacity duration-200 ${isUpdating ? "opacity-50" : "opacity-100"
                        }`}
                >
                    <h2 className="w-full text-lg md:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                        Update Account Information
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="flex flex-col space-y-4 w-full"
                    >
                        {/* Username Input */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <div className="flex flex-col md:flex-row md:space-x-3 items-stretch md:items-center">
                                <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={!isEditingUsername}
                                        placeholder={session?.user.username}
                                        className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 w-full focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingUsername(!isEditingUsername)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-[5em]"
                                >
                                    {isEditingUsername ? "Lock" : "Edit"}
                                </button>
                            </div>
                        </div>

                        {/* Firstname Input */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <div className="flex flex-col md:flex-row md:space-x-3 items-stretch md:items-center">
                                <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
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
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={!isEditingName}
                                        placeholder={session?.user.firstname}
                                        className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 w-full focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingName(!isEditingName)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-[5em]"
                                >
                                    <p>
                                        {isEditingName ? "Lock" : "Edit"}
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Lastname Input */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <div className="flex flex-col md:flex-row md:space-x-3 items-stretch md:items-center">
                                <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70 stroke-black dark:stroke-current"
                                        fill="none"
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
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        disabled={!isEditingLastname}
                                        placeholder={session?.user.lastname}
                                        className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 w-full focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsEditingLastname(!isEditingLastname)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-[5em]"
                                >
                                    <p>
                                        {isEditingLastname ? "Lock" : "Edit"}
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <div className="flex flex-col md:flex-row md:space-x-3 items-stretch md:items-center">
                                <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditingEmail}
                                        placeholder={session?.user.email}
                                        className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 w-full focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-[5em]"
                                >
                                    <p>
                                        {isEditingEmail ? "Lock" : "Edit"}
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div className="flex flex-col md:flex-row md:space-x-3 items-stretch md:items-center">
                                <div className="input input-bordered flex items-center gap-2 w-full bg-slate-700 rounded-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        className="h-4 w-4 opacity-70 fill-black dark:fill-current"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={!isEditingPassword}
                                        placeholder={"Enter new password"}
                                        className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 w-full focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 md:w-[5em]"
                                >
                                    <p>
                                        {isEditingPassword ? "Lock" : "Edit"}
                                    </p>
                                </button>
                            </div>
                            <div className="pt-2 w-full">
                                <button
                                    type="button"
                                    disabled={!isEditingPassword}
                                    className={`${isEditingPassword ? "bg-opacity-45 hover:text-white hover:bg-opacity-55" : "cursor-not-allowed bg-opacity-25"} bg-black w-full text-white dark:text-slate-200 text-md px-7 py-3 rounded-xl`}
                                    onClick={() => {
                                        setShowPassword((prev) => !prev);
                                    }}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="block">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">Upload Profile Image</label>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex flex-grow flex-col">
                                    <div className="flex items-center">
                                        <label
                                            htmlFor="file-upload"
                                            className={`cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg transition-all w-full mr-3
                                            ${isEditingPhoto
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 mr-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                />
                                            </svg>
                                            <span className="md:text-base">
                                                {selectedFile ? "Replace File" : "Choose File"}
                                            </span>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={!isEditingPhoto}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                                            className="ml-auto px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            {isEditingPhoto ? "Lock" : "Edit"}
                                        </button>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-base-content neutral">
                                            {selectedFile ? selectedFile.name : "No file chosen"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 rounded-lg ${isUpdating
                                ? "bg-green-800 cursor-not-allowed"
                                : hasChanges
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!hasChanges || isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Information"}
                        </button>
                    </form>
                </div >
            </div>
            {/* Error Message */}
            {errorMsg ? (
                <div className="text-white py-2 mt-4">
                    <div className="opacity-75 flex justify-center text-center bg-red-600 rounded-lg w-full py-2 px-4">
                        <p className="text-white">
                            {errorMsg}
                        </p>
                    </div>
                </div>
            ) : null
            }
        </>
    );
}
