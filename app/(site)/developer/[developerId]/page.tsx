"use client";
import React, { use } from "react";

export default function Store(props: { params: Promise<{ developerId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Developer page for (developer :: {params.developerId})</h1>
        </>
    );
}
