"use client";
import React, { use } from "react";


export default function CustomerWishlist(props: { params: Promise<{ wishlistId: string }> }) {
    const params = use(props.params);
    return (
        <>
            <h1>Wishlist page for (user :: {params.wishlistId})</h1>
        </>
    );
}
