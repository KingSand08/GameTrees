"use client";

import React, { useEffect, useState } from "react";
import WishlistRow from "@/types/models/WishlistRow";


interface WishlistPageProps {
    params: { username: string };
}

export default function WishlistPage({ params }: WishlistPageProps) {
    const [wishlistGames, setWishlistGames] = useState<WishlistRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`/api/wishlist/${params.username}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch wishlist data");
                }
                const data = await response.json();
                console.log("Fetched wishlist data:", data); // Debug log for data inspection

                setWishlistGames(data);
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
                            <img src={game.image} alt={`${game.title} cover`} width={100} height={100} />
                        )}
                        <strong>Title:</strong> {game.title}, 
                        <strong>Developer:</strong> {game.developer}
                    </li>
                ))}
            </ul>
        </div>
    );
}
