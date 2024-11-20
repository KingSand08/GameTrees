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
    
// Handle adding a game (POST method)
export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;
    const body = await request.json(); // Expecting `gid` in the request body
    const { gid } = body;

    console.log("render gid: ", gid);
    console.log("username: ", username);

    if (!gid || !username) {
        return NextResponse.json({ error: "Missing gid or username" }, { status: 400 });
    }

    try {
        await wishlistEdition.addByGid(username, gid); 
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error adding item:", error);
        return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
    }
}
