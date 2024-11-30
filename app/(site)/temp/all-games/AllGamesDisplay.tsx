"use client";

import React from "react";
import Image from "next/image";
import Game from "@/types/models/Game";
import { useRouter } from "next/navigation";
import WishlistRow from "@/types/models/WishlistRow";
// import generatePhotoPid from "@/utils/generatePhotoId";

interface AllGamesDisplayProps {
    games: Game[];
    wishlist: WishlistRow[];
    userRole: string;
    uid: string;
}

export default function AllGamesDisplay({
    games,
    userRole,
    uid,
    wishlist,
}: AllGamesDisplayProps) {
    const router = useRouter();

    // Add game to wishlist
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
        return wishlist.some((game) => game.gid === gid);
    };

    return (
        <div className="space-y-4">
            {games.length > 0 ? (
                games.map((game) => {
                    // const photoPid = generatePhotoPid(
                    //     `${game.gid}-${game.title}-${game.publish_date}`
                    // );

                    return (
                        <div
                            key={game.gid}
                            className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg"
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
                                <p className="text-gray-400">Developer: {game.developer}</p>
                                <div className="mt-2 text-sm">
                                    <span>${game.price}</span>
                                </div>
                                {/* <div className="mt-1 text-xs text-gray-500">
                                    Photo ID: {photoPid}
                                </div> */}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 md:ml-auto space-y-2 md:space-y-0 md:space-x-2">
                                {/* Add to Wishlist Button */}
                                {userRole === "customer" && !isGameInWishlist(game.gid) && (
                                    <button
                                        className="btn bg-blue-500 hover:bg-blue-700 text-white"
                                        onClick={() => handleAddToWishlist(game.gid)}
                                    >
                                        Add to Wishlist
                                    </button>
                                )}

                                {/* Remove from Wishlist Button */}
                                {isGameInWishlist(game.gid) && (
                                    <button
                                        className="btn bg-red-700 hover:bg-red-800 text-white"
                                        onClick={() => handleRemoveFromWishlist(game.gid)}
                                    >
                                        Remove From Wishlist
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center">No games found!</p>
            )}
        </div>
    );
}
