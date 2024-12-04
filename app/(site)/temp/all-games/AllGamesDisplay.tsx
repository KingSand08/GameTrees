"use client";

import React from "react";
import Image from "next/image";
import Game from "@/types/models/Game";
import WishlistRow from "@/types/models/WishlistRow";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import Link from "next/link";
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
        <div className="flex justify-start items-start p-6">
            <div className="flex flex-wrap gap-6 justify-start">
                {games.length > 0 ? (
                    games.map((game) => (
                        // const photoPid = generatePhotoPid(
                        //  `${game.gid}-${game.title}-${game.publish_date}`
                        // );
                        <div
                            key={game.gid}
                            className="card bg-base-100 shadow-xl rounded-box w-72 mx-auto"
                        >
                            {/* Game Image */}
                            <figure className="relative h-80 overflow-hidden rounded-t-box bg-neutral">
                                {game.image ? (
                                    <Image
                                        src={game.image}
                                        alt={`${game.title} cover`}
                                        className="w-full h-full object-cover"
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-700">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                                {/* <div className="mt-1 text-xs text-gray-500">
                                    Photo ID: {photoPid}
                                </div> */}
                            </figure>

                            {/* Game Content */}
                            <div className="card-body bg-neutral text-neutral-content p-4">
                                <Link
                                    href={`/game/${game.gid}`}
                                    className="card-title hover:text-secondary transition-colors duration-300"
                                >
                                    {game.title}
                                </Link>
                                <p className="text-sm">Developer: {game.developer}</p>
                                <div className="text-lg font-semibold">${game.price}</div>
                                <div className="card-actions justify-end mt-4">
                                    <WishListButton
                                        uid={uid}
                                        game={game}
                                        userRole={userRole}
                                        myWishlist={wishlist}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">No games found!</p>
                )}
            </div>
        </div>
    );
}
