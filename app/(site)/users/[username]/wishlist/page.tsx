"use client";

import React, { useEffect, useState } from "react";
import WishlistRow from "@/types/models/WishlistRow";
import Image from "next/image";

interface WishlistPageProps {
    params: { username: string };
}

export default function WishlistPage({ params }: WishlistPageProps) {
    const [wishlistGames, setWishlistGames] = useState<WishlistRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`/api/users/${params.username}/wishlist`);
                if (!response.ok) {
                    throw new Error("Failed to fetch wishlist data");
                }
                const data = await response.json();
                setWishlistGames(data.wishlist);
            } catch (err) {
                setError("Error loading wishlist data");
                console.error("Fetch error:", err);
            }
        };

        fetchWishlist();
    }, [params.username]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Wishlist for User ID: {params.username}</h1>
            <h2>Wishlist Games</h2>
            <ul>
                {wishlistGames.map((game, index) => (
                    <li key={index}>
                        {game.image && (
                            <Image src={game.image} alt={`${game.Game_Title} cover`} width={100} height={100} /> // Display the image of the game
                        )}
                        <strong>Title:</strong> {game.Game_Title},
                        <strong>Developer:</strong> {game.Name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
