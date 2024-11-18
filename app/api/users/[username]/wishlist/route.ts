import { NextRequest, NextResponse } from "next/server";
import { WishlistRepository } from "@/database/queries/wishlist/getWishlist";

const wishlistRepository = new WishlistRepository();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    try {
        const [wishlist] = await Promise.all([
            wishlistRepository.getGameByUsername(username)
        ]);
        return NextResponse.json({ wishlist });
    } catch (error) {
        console.error("Error fetching store data:", error);
        return NextResponse.json({ error: "Failed to fetch store data" }, { status: 500 });
    }
}