"use client";
import React from "react";

export default function GameListing({ params }: { params: { gameId: string } }) {
    return (
        <>
            <h1>Game Listing page for (game :: {params.gameId})</h1>
        </>
    );
}
