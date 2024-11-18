"use client";

import React, { useEffect, useState } from "react";
import GameRow from "@/types/models/GameRow";
import StoreDetails from "@/types/models/StoreDetail";

interface StorePageProps {
    params: { storeId: string };
}

export default function StorePage({ params }: StorePageProps) {
    const [games, setGames] = useState<GameRow[]>([]);
    const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/store/${params.storeId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch store data");
                }
                const data = await response.json();
                // console.log("Fetched data:", data); // Debug log for data inspection

                // Set both store details and games from the single response
                setStoreDetails(data.storeDetails);
                setGames(data.games);
            } catch (err) {
                setError("Error loading store data");
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, [params.storeId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Store Page for Store ID: {params.storeId}</h1>

            {storeDetails && (
                <div>
                    <h2>Store Information</h2>
                    <p><strong>Address:</strong> {storeDetails.address}</p>
                    <p><strong>Hours of Operation:</strong> {storeDetails.opsHour}</p>
                </div>
            )}

            <h2>Games Available</h2>
            <ul>
                {games.map((game, index) => (
                    <li key={index}>
                        <strong>Title:</strong> {game.title},
                        <strong>Price:</strong> ${game.price.toFixed(2)},
                        <strong>Platforms:</strong> {game.platforms || "No platforms available"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
