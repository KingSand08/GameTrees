"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AccountSettingsPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);

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
            window.location.reload();
        } else {
            const data = await response.json();
            alert(`Failed to upload image: ${data.message || response.statusText}`);
        }
    };

    const fetchImageData = async () => {
        try {
            const response = await fetch("/api/upload-image-db");
            const data = await response.json();
            if (data.image) {
                setImageData(data.image);
            } else {
                setImageData(null);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        // Wait for the page to fully reload before fetching the image data
        const handlePageLoad = () => {
            fetchImageData();
        };

        // Listen for the `load` event
        window.addEventListener("load", handlePageLoad);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("load", handlePageLoad);
        };
    }, []);

    return (
        <div>
            <h1>Account Settings</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Upload Image
                </button>
            </form>
            {imageData ? (
                <Image
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt="Uploaded"
                    width={100}
                    height={100}
                    quality={100}
                    style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }}
                />
            ) : (
                <p>No image uploaded</p>
            )}
        </div>
    );
}
