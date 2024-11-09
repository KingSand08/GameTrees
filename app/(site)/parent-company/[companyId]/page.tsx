"use client";
import React, { use } from "react";

export default function Company(props: { params: Promise<{ companyId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Parent Company page for (business :: {params.companyId})</h1>
        </>
    );
}
