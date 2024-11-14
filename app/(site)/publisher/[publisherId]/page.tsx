"use client";
import React, { use } from "react";

export default function Publisher(props: { params: Promise<{ publisherId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Publisher page for (publisher :: {params.publisherId})</h1>
        </>
    );
}
