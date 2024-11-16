"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/app/ui/components/auth/Avatar";

export default function AccountSettingsPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload-image-db", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Image uploaded successfully!");
            window.location.reload(); // Reloads the page to reflect the updated image
        } else {
            const data = await response.json();
            alert(`Failed to upload image: ${data.message || response.statusText}`);
        }
    };

    const fetchImageData = async () => {
        try {
            if (session?.user?.username) {
                const response = await fetch(`/api/users/${session.user.username}/profile-image`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.image) {
                    setImageData(`data:image/jpeg;base64,${data.image}`); // Add MIME type for Base64 images
                } else {
                    setImageData(null);
                }
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        fetchImageData();
    }, [session?.user?.username]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-4 mb-6">
                <Avatar
                    image={imageData || undefined} // Pass `imageData` directly
                    username={session?.user?.username}
                    className="ring-2 ring-blue-500 w-52 "
                    imgSize="w-[10rem]"
                    areaExpand="10rem"
                    textSize="text-4xl"
                />
                <div>
                    <p className="text-lg font-semibold">{session?.user?.name || "Anonymous"}</p>
                    <p className="text-sm text-gray-600">{session?.user?.email}</p>
                </div>
            </div>

            {/* Image Upload Form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Upload a new profile picture:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block mt-2 text-sm"
                    />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload Image
                </button>
            </form>

            {/* Display uploaded image */}
            {imageData && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Uploaded Image Preview:</h2>
                    <Image
                        src={`data:image/jpeg;base64,${imageData}`}
                        alt="Uploaded"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                    />
                </div>
            )}
        </div>
    );
}
