"use client";

import React, { useEffect, useState } from "react";
import Game from "@/types/models/Game";
import Image from "next/image";
import Link from "next/link";
// import WishListButton from "@/app/ui/components/buttons/WishListButton";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const query = searchParams.query;
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/games?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch games.");
                }

                const results = await response.json();
                setGames(results);
                setError(null);
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Failed to fetch games.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [query]);

    return (
        <>
            <h1 className="text-xl font-bold mb-6">Search Results</h1>
            <div className="space-y-4">
                {query ? <p>Search Query: {query}</p> : <p>No search query provided.</p>}

                {loading ? (
                    <p>Loading games...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : games.length > 0 ? (
                    <div className="space-y-4">
                        {games.map((game, index) => (
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
                                    <h2 className="max-[1200px]:pt-8 text-xl font-bold">
                                        <Link href={`/game/${game.gid}`} className="text-blue-500 hover:underline">
                                            {game.title}
                                        </Link>
                                    </h2>
                                    <p className="max-[1200px]:pt-2 text-gray-400">Developer: {game.developer}</p>
                                    <div className="max-[1200px]:pt-2 mt-2 text-sm">
                                        <span>${game.price}</span>
                                    </div>
                                </div>

                                {/* Action Buttons
                                <WishListButton
                                    uid={uid} // Replace with the user's UID
                                    game={game}
                                    userRole={} // Replace with the user's role
                                    myWishlist={[]} // Replace with the user's wishlist
                                /> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No games found for your query.</p>
                )}
            </div>
        </>
    );
}
