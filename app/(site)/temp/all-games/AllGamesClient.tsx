"use client";

import React, { useState } from "react";
import AllGamesDisplay from "./AllGamesDisplay";
import Game from "@/types/models/Game";
import WishlistRow from "@/types/models/WishlistRow";
import AllGamesFilter from "./AllGamesFilter";

interface AllGamesClientProps {
    games: Game[];
    wishlist: WishlistRow[];
    userRole: string;
    uid: string;
}

export default function AllGamesClient({
    games,
    wishlist,
    userRole,
    uid,
}: AllGamesClientProps) {
    const [filteredGames, setFilteredGames] = useState<Game[]>(games);

    const developers = Array.from(
        new Set(games.map((game) => game.developer).filter((dev): dev is string => !!dev))
    );

    const handleSortChange = (sortType: string) => {
        const sortedGames = [...filteredGames];
        switch (sortType) {
            case "alphabetical":
                sortedGames.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "priceLowToHigh":
                sortedGames.sort((a, b) => a.price - b.price);
                break;
            case "priceHighToLow":
                sortedGames.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredGames(sortedGames);
    };

    const handleDeveloperChange = (developer: string | null) => {
        const filtered = games.filter((game) => !developer || game.developer === developer);
        setFilteredGames(filtered);
    };

    return (
        <div className="pb-14">
            {/* Filters (Sort and Developer) */}
            <AllGamesFilter
                onSortChange={handleSortChange}
                onDeveloperChange={handleDeveloperChange}
                developers={developers}
            />

            {/* Display Games */}
            <AllGamesDisplay
                games={filteredGames}
                userRole={userRole}
                uid={uid}
                wishlist={wishlist}
            />
        </div>
    );
}
