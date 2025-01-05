import { NextRequest, NextResponse } from "next/server";
import { addToStoreInventory } from "@/database/queries/store/editInventory";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body as JSON
        const body = await req.json();
        const { sid, gid } = body;

        if (!sid || !gid) {
            return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
        }

        // Call the query function to add the game
        await addToStoreInventory(sid, gid);

        return NextResponse.json({ message: "Game added to inventory successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding game to wishlist:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
