"use client";
import React, { use } from "react";

export default function Store(props: { params: Promise<{ storeId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Store page for (store :: {params.storeId})</h1>
        </>
    );
}
