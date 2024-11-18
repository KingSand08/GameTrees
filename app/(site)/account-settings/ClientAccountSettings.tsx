"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ClientAccountSettings() {
    const { data: session, update: updateSession } = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [showPassword, setShowPassword] = useState(false)

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);

    const hasChanges =
        username !== "" ||
        email !== "" ||
        name !== "" ||
        password !== "" ||
        selectedFile !== null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        if (username) formData.append("username", username);
        if (email) formData.append("email", email);
        if (name) formData.append("name", name);
        if (password) formData.append("password", password);
        if (selectedFile) formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/users/update", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // alert("User details updated successfully!");

                if (data.refresh) {
                    // Explicitly refresh session
                    await updateSession({
                        user: {
                            id: session?.user.id,
                            username: username || session?.user.username,
                            email: email || session?.user.email,
                            name: name || session?.user.name,
                        },
                    });
                }
            } else {
                alert(`Failed to update user: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating user details.");
        }
        window.location.reload()
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full bg-slate-800 shadow-lg rounded-lg p-8">
                <h2 className="w-full text-2xl font-semibold text-white mb-6">Update Account Information</h2>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="flex flex-col space-y-4 w-full"
                >
                    {/* Username Input */}
                    <div className="block">
                        <label className="text-sm font-medium text-gray-400">Username</label>
                        <div className="flex flex-row space-x-3 items-center">
                            <div className="input input-bordered flex items-center gap-2 w-full">
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
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={!isEditingUsername}
                                    placeholder={session?.user.username}
                                    className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditingUsername(!isEditingUsername)}
                                className="px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <p>
                                    {isEditingUsername ? "Lock" : "Edit"}
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="block">
                        <label className="text-sm font-medium text-gray-400">Name</label>
                        <div className="flex flex-row space-x-3 items-center">
                            <div className="input input-bordered flex items-center gap-2 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={!isEditingName}
                                    placeholder={session?.user.name}
                                    className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditingName(!isEditingName)}
                                className="px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <p>
                                    {isEditingName ? "Lock" : "Edit"}
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="block">
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <div className="flex flex-row space-x-3 items-center">
                            <div className="input input-bordered flex items-center gap-2 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70"
                                >
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                                    />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!isEditingEmail}
                                    placeholder={session?.user.email}
                                    className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditingEmail(!isEditingEmail)}
                                className="px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <p>
                                    {isEditingEmail ? "Lock" : "Edit"}
                                </p>
                            </button>
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={!isEditingPassword}
                                    placeholder={"Enter new password"}
                                    className="bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg w-full focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditingPassword(!isEditingPassword)}
                                className="px-4 py-2 w-[5em] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <p>
                                    {isEditingPassword ? "Lock" : "Edit"}
                                </p>
                            </button>
                        </div>
                        <div className="pt-2">
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

                    {/* File Upload */}
                    <div className="block">
                        <label className="text-sm font-medium text-gray-400">Upload Profile Image</label>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex flex-grow flex-col">
                                <div className="flex items-center">
                                    <label
                                        htmlFor="file-upload"
                                        className={`cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg transition-all ${isEditingPhoto
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
                                        {selectedFile ? "Replace File" : "Choose File"}
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
                                        className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        {isEditingPhoto ? "Lock" : "Edit"}
                                    </button>
                                </div>
                                <div className="pt-2">
                                    <p className="text-sm text-gray-500">
                                        {selectedFile ? selectedFile.name : "No file chosen"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 rounded-lg transition-colors ${hasChanges
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-500 text-gray-300 cursor-not-allowed"
                            }`}
                        disabled={!hasChanges}
                    >
                        Update Information
                    </button>
                </form>
            </div >
        </div >
    );
}
