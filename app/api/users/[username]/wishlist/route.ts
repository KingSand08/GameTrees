import { NextRequest, NextResponse } from "next/server";
import getUserWishlist from "@/database/queries/wishlist/getWishlist";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    try {
        // Fetch the wishlist for the provided username
        const wishlist = await getUserWishlist(username);

        // Return the wishlist as a JSON response
        return NextResponse.json({ wishlist });
    } catch (error) {
        console.error("Error fetching wishlist:", error);

        // Handle errors gracefully with an appropriate response
        return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
    }
}
