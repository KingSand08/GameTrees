"use client";
import React, { useState } from "react";

export default function AccountSettingsPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        formData.append("file", selectedFile);  // Make sure the key matches what the server expects

        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
            } else {
                const data = await response.json();
                alert(`Failed to upload image: ${data.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred while uploading the image.");
        }
    };

    return (
        <div>
            <h1>Account Settings</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Upload Image
                </button>
            </form>
        </div>
    );
}
