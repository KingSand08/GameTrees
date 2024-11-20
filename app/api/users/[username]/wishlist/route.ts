import { NextRequest, NextResponse } from "next/server";
import { WishlistEdition } from "@/database/queries/wishlist/updateWishlist";

const wishlistEdition = new WishlistEdition();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { searchParams } = new URL(request.url);
    const gid = searchParams.get("gid");
    const username = params.username;
    console.log("gid: ", gid)
    console.log("username: ", username)

    if (!gid || !username) {
        return NextResponse.json({ error: "Missing gid or username" }, { status: 400 });
    }

    try {
        await wishlistEdition.removeByGid(gid, username);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error removing item:", error);
        return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
    }
    
}
