import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { removeFromStoreInventory } from "@/database/queries/store/editInventory";

export const DELETE = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { games, storeId } = body;
        
        if (!Array.isArray(games) || games.length === 0) {
            return NextResponse.json({ message: "No games provided" }, { status: 400 });
        }

        await removeFromStoreInventory(storeId, games);

        return NextResponse.json({ message: "Games removed successfully", games }, { status: 200 });
    } catch (error) {
        console.error("Error deleting images:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
