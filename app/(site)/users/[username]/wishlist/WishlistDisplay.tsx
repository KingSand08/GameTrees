"use client";

import React from "react";
import Image from "next/image";
import WishlistRow from "@/types/models/WishlistRow";
import WishListButton from "@/app/ui/components/buttons/WishListButton";
import Link from "next/link";

interface WishlistDisplayProps {
    uid: string | "";
    wishlist: WishlistRow[];
    myWishlist: WishlistRow[];
    userRole: string | "";
}

export default function WishlistDisplay({ uid, wishlist, myWishlist, userRole }: WishlistDisplayProps) {

    return (
        <div className="space-y-4">
            {wishlist.length > 0 ? (
                wishlist.map((game, index) => (
                    <div
                        key={index}
                        className="flex flex-col min-[1110px]:flex-row items-center rounded-lg shadow-lg bg-gray-900" //! change bg later but just use for now until theme issues are resolved
                    >
                        {/* Game Image */}
                        <div
                            className="flex-shrink-0 w-60 h-56 m-0 min-[1110px]:m-4 overflow-hidden rounded-lg bg-gray-800" //! change bg later but just use for now until theme issues are resolved
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
                            <Link href={`/game/${game.gid}`}>
                                <h2 className="max-[1200px]:pt-8 text-xl font-bold hover:underline">{game.title}</h2>
                            </Link>
                            <p className="max-[1200px]:pt-2 text-gray-400">Developer: {game.developer}</p>
                            <div className="max-[1200px]:pt-2 mt-2 text-sm">
                                <span>${game.price}</span>
                            </div>
                        </div>
                        <div className="mr-8">
                            {/* Action Buttons */}
                            <WishListButton
                                uid={uid}
                                game={game}
                                userRole={userRole}
                                myWishlist={myWishlist}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Your wishlist is empty!</p>
            )}
        </div>
    );
}
