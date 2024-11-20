"use client";

import React from "react";
import Image from "next/image";
import WishlistRow from "@/types/models/WishlistRow";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface WishlistDisplayProps {
    wishlist: WishlistRow[];
}

export default function WishlistDisplay({ wishlist }: WishlistDisplayProps) {
    const { username } = useParams();
    const { data: session, update: updateSession } = useSession();

    const handleAddWishlist = async (gid: string) => {
        try {
            const response = await fetch(`/api/users/${session?.user?.username}/wishlist?gid=${gid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gid }),
            });
            console.log("fetch username: ", username);


            if (!response.ok) {
                throw new Error("Failed to add item");
            }

            alert("Game added successfully!");

        } catch (error) {
            console.error("Failed to add game:", error);
            alert("Failed to add into the wishlist. Please try again.");
        }
    };
    
    const handleRemove = async (gid: string) => {    
        try {
            const response = await fetch(`/api/users/${username}/wishlist?gid=${gid}`, {
                method: "GET",
            });
            
            if (!response.ok) {
                throw new Error("Failed to remove game");
            }
    
            alert("Game removed successfully!");
            window.location.reload();
    
        } catch (error) {
            console.error("Failed to remove game:", error);
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
                            {game.img? (
                                <Image
                                    src={game.img}
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
                                <span>${game.Price}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 md:ml-auto space-y-2 md:space-y-0 md:space-x-2">
                            {username !== session?.user?.username ? (
                                <button className="btn bg-blue-500 hover:bg-blue-700 text-white"
                                    onClick={() => handleAddWishlist(game.gid)}
                                    >
                                    Add to Wishlist
                                </button>
                            ): null }
                            {username === session?.user?.username ? (
                                <button className="btn bg-red-700 hover:bg-red-800 text-white"
                                        onClick={() => handleRemove(game.gid)}
                                    >
                                    Remove
                                </button>
                            ): null}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Your wishlist is empty!</p>
            )}
        </div>
    );
}
