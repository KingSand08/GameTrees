import { NextRequest, NextResponse } from "next/server";
import { removeFromUserWishlist } from "@/database/queries/wishlist/modifyWishlist";

export async function DELETE(req: NextRequest) {
    try {
        // Parse the request body as JSON
        const body = await req.json();
        const { uid, gid } = body;

        if (!uid || !gid) {
            return NextResponse.json(
                { message: "Missing required parameters: uid or gid" },
                { status: 400 }
            );
        }
        // Call the query function to remove the game
        await removeFromUserWishlist(uid, gid);

        return NextResponse.json(
            { message: "Game removed from wishlist successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error removing game from wishlist:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
