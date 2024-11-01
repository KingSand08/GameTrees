"use client";
import React from "react";

export default function Store({ params }: { params: { developerId: string } }) {
    return (
        <>
            <h1>Developer page for (developer :: {params.developerId})</h1>
        </>
    );
}
