"use client";

import React from "react";
import Image from "next/image";
import Game from "@/types/models/Game";
import WishlistRow from "@/types/models/WishlistRow";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import Link from "next/link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {games.length > 0 ? (
                games.map((game) => (
                    <div
                        key={game.gid}
                        className="card w-full bg-base-100 shadow-xl flex flex-col"
                    >
                        {/* Game Image */}
                        <figure className="relative h-64 overflow-hidden rounded-t-box">
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
                        </figure>

                        {/* Game Content */}
                        <div className="card-body bg-neutral">
                            <Link
                                href={`/game/${game.gid}`}
                                className="card-title hover:text-secondary transition-colors duration-300"
                            >
                                {game.title}
                            </Link>
                            <p className="text-gray-400">Developer: {game.developer}</p>
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
    );
}
