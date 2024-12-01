"use client";

import React, { useState } from "react";
import Image from "next/image";
import GameRow from "@/types/models/GameRow";
import StoreDetails from "@/types/models/StoreDetail";
import StoreHours from "@/types/models/StoreHours";
import { useRouter } from "next/navigation";

interface StoreDisplayProps {
    uid: number | null;
    storeDetails: StoreDetails | null;
    games: GameRow[];
    storeHours: StoreHours[];
    userRole: string;
}

const StoreDisplay = ({ uid, storeDetails, games, storeHours }: StoreDisplayProps) => {
    const router = useRouter();

    // State for success message
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddToWishlist = async (gid: number) => {
        if (!uid) {
        // Redirect to login page if the user is not logged in
        router.push("/login");
        return;
        }

    try {
        const response = await fetch("/api/wishlist/addTo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, gid }),
        });

        if (response.ok) {
            setSuccessMessage(`Added to wishlist successfully!`);
            router.refresh();
            setTimeout(() => setSuccessMessage(null), 3000);
        } else {
            const data = await response.json();
            console.error("Failed to add game:", data.message);
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }
};

return (
    <div>
        <h1>Store Page</h1>

        {/* Success Message */}
        {successMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {successMessage}
            </div>
        )}

        {/* Store Information */}
        {storeDetails && (
            <div className="flex justify-between items-start bg-gray-900 text-white p-4 rounded-lg shadow-md">
                <div>
                    <h2 className="text-lg font-bold mb-2">Store Information</h2>
                    <p><strong>Store name:</strong> {storeDetails.name}</p>
                    <p><strong>Modality:</strong> {storeDetails.modality}</p>
                    <p><strong>Address:</strong> {storeDetails.address}</p>
                </div>

                {/* Operating Hours */}
                <div>
                    <h2 className="text-lg font-bold mb-2">Operating Hours</h2>
                    {storeHours.length === 0 ? (
                        <p>No operating hours available.</p>
                    ) : (
                        <table className="text-sm">
                            <tbody>
                                {storeHours.map((hour, index) => (
                                    <tr key={index}>
                                        <td className="pr-4 font-semibold">{hour.day}:</td>
                                        <td className="pr-4">Open: {hour.start_time}</td>
                                        <td>Close: {hour.end_time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )}

        {/* Games Section */}
        <h2 className="text-xl font-bold mt-8">Games Available</h2>
        <div className="space-y-4">
            {games.map((game) => (
                <div
                    key={game.gid}
                    className="flex flex-col lg:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
                >
                    {/* Game Image */}
                    <div
                    className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                    style={{ flexBasis: "22rem" }}
                    >
                        {game.image ? (
                            <Image
                            src={game.image}
                            alt={`${game.title} cover`}
                            className="w-full h-full object-contain"
                            width={1000}
                            height={1000}
                            quality={100}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Game Details */}
                    <div className="ml-4 flex-grow">
                        <h2 className="text-xl font-bold">{game.title}</h2>
                        <p className="text-gray-400">Price: ${game.price}</p>
                        <p className="text-gray-400">Platforms: {game.platforms || "No platforms available"}</p>
                    </div>

                    {/* Add to Wishlist Button */}
                    <div className="ml-auto">
                        <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        onClick={() => handleAddToWishlist(game.gid)}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default StoreDisplay;
