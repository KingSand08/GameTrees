"use client";
import React, { use } from "react";

export default function GameListing(props: { params: Promise<{ gameId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Game Listing page for (game :: {params.gameId})</h1>
        </>
    );
}
