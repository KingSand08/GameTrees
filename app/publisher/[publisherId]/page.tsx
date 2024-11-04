"use client";
import React from "react";

export default function Publisher({ params }: { params: { publisherId: string } }) {
    return (
        <>
            <h1>Publisher page for (publisher :: {params.publisherId})</h1>
        </>
    );
}
