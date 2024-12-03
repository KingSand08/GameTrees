"use client";

import React from "react";
import Image from "next/image";
import Game from "@/types/models/Game";
import WishlistRow from "@/types/models/WishlistRow";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
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
                            <WishListButton 
                                uid={uid}
                                game={game}
                                userRole={userRole}
                                myWishlist={wishlist}
                            ></WishListButton>
                        </div>
                    );
                })
            ) : (
                <p className="text-center">No games found!</p>
            )}
        </div>
    );
}
