"use client";

import React from "react";
import Image from "next/image";
import WishlistRow from "@/types/models/WishlistRow";
import { useRouter } from "next/navigation";


interface WishlistDisplayProps {
    uid: string | "";
    wishlist: WishlistRow[];
    myWishlist: WishlistRow[];
    userRole: string | "";
}

export default function WishlistDisplay({ uid, wishlist, myWishlist, userRole }: WishlistDisplayProps) {
    const router = useRouter();

    const handleAddToWishlist = async (gid: number) => {
        try {
            await fetch("/api/wishlist/addTo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gid }),
            });

            router.refresh();
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    // Remove game from wishlist
    const handleRemoveFromWishlist = async (gid: number) => {
        try {
            await fetch("/api/wishlist/removeFrom", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gid }),
            });

            router.refresh();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const isGameInWishlist = (gid: number): boolean => {
        return myWishlist.some((game) => game.gid === gid);
    };



    return (
        <div className="space-y-4">
            {wishlist.length > 0 ? (
                wishlist.map((game, index) => (
                    <div
                        key={index}
                        className="flex flex-col min-[1110px]:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
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
                            <h2 className="max-[1200px]:pt-8 text-xl font-bold">{game.title}</h2>
                            <p className="max-[1200px]:pt-2 text-gray-400">Developer: {game.developer}</p>
                            <div className="max-[1200px]:pt-2 mt-2 text-sm">
                                <span>${game.price.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col min-[1110px]:flex-row items-center max-[1200px]:pt-4 max-[1200px]:pb-4 mt-4 md:mr-8 min-[1110px]:ml-auto space-y-2 md:space-y-0 md:space-x-2">
                            {userRole === "customer" && (
                                <>
                                    {isGameInWishlist(game.gid) ? (
                                        <button
                                            className="w-full md:w-auto px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg"
                                            onClick={() => handleRemoveFromWishlist(game.gid)}
                                        >
                                            Remove game
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full md:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                                            onClick={() => handleAddToWishlist(game.gid)}
                                        >
                                            Add game
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Your wishlist is empty!</p>
            )}
        </div>
    );
}
