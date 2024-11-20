"use client";

import React from "react";
import Image from "next/image";
import WishlistRow from "@/types/models/WishlistRow";
import { useParams } from "next/navigation";

interface WishlistDisplayProps {
    wishlist: WishlistRow[];
}



export default function WishlistDisplay({ wishlist }: WishlistDisplayProps) {
    const { username } = useParams();
    
    const handleRemove = async (gid: string) => {    
        try {
            const response = await fetch(`/api/users/${username}/wishlist?gid=${gid}`, {
                method: "GET",
            });
            
            if (!response.ok) {
                throw new Error("Failed to remove item");
            }
    
            alert("Item removed successfully!");
            window.location.reload();
    
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert("Failed to remove the item. Please try again.");
        }
    };

    return (
        <div className="space-y-4">
            {wishlist.length > 0 ? (
                wishlist.map((game, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
                    >
                        {/* Game Image */}
                        <div
                            className="flex-shrink-0 w-60 h-56 overflow-hidden rounded-lg bg-gray-700"
                            style={{ flexBasis: "22rem" }}
                        >
                            {game.Image ? (
                                <Image
                                    src={game.Image}
                                    alt={`${game.Title} cover`}
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
                            <h2 className="text-xl font-bold">{game.Title}</h2>
                            <p className="text-gray-400">Developer: {game.Name}</p>
                            <div className="mt-2 text-sm">
                                <span>${game.Price.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 md:ml-auto space-y-2 md:space-y-0 md:space-x-2">
                            <button className="btn bg-blue-500 hover:bg-blue-700 text-white">
                                Add to Wishlist
                            </button>
                            <button className="btn bg-red-700 hover:bg-red-800 text-white"
                                    onClick={() => handleRemove(game.gid)}
                                >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Your wishlist is empty!</p>
            )}
        </div>
    );
}
