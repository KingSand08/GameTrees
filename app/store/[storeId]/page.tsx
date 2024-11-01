"use client";
import React from "react";

export default function Store({ params }: { params: { storeId: string } }) {
    return (
        <>
            <h1>Store page for (store :: {params.storeId})</h1>
        </>
    );
}
