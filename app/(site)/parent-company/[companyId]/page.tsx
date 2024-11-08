"use client";
import React from "react";

export default function Company({ params }: { params: { companyId: string } }) {
    return (
        <>
            <h1>Parent Company page for (business :: {params.companyId})</h1>
        </>
    );
}
