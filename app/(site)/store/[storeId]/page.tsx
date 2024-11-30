"use client";

import React, { useEffect, useState } from "react";
import GameTable from "@/app/ui/components/stores/StoreGameTable";
import StoreDetails from "@/types/models/StoreDetail";
import GameRow from "@/types/models/GameRow";

interface StorePageProps {
    params: { storeId: string };
}


export default function StorePage({ params }: StorePageProps) {
    const [games, setGames] = useState<GameRow[]>([]);
    const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/store/${params.storeId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch store data");
                }
                const data = await response.json();

                setStoreDetails(data.storeDetails);
                setGames(data.games);
            } catch (err) {
                setError("Error loading store data");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.storeId]);

    if (loading) {
        return <div className="p-6">Loading store details...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
                <button
                    onClick={() => window.location.reload()}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-base-100">
            {/* Store Details Section */}
            {storeDetails && (
                <div className="bg-base-300 text-base-content">
                    <p><strong>Address:</strong> {storeDetails.address}</p>
                    <p><strong>Operating Days:</strong> {storeDetails.ops_days}</p>
                    <p><strong>Operating Hours:</strong> {storeDetails.ops_hours}</p>
                </div>
            )}

            {/* Games Table Section */}
            <h2 className="text-2xl font-bold mb-4">Games Available</h2>
            <GameTable games={games} />
        </div>
    );
}
