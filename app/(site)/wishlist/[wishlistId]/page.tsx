"use client";
import React from "react";


export default function CustomerWishlist({ params }: { params: { wishlistId: string } }) {
    return (
        <>
            <h1>Wishlist page for (user :: {params.wishlistId})</h1>
        </>
    );
}
