import { NextRequest, NextResponse } from "next/server";
import getUserWishlist from "@/database/queries/wishlist/getWishlist";


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
