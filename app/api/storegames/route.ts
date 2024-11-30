import { NextRequest, NextResponse } from "next/server";
import { StoreGamesRep } from "@/database/queries/game/StoreGames";

const storeGamesRep = new StoreGamesRep();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const data = await storeGamesRep.getGameStores(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching game stores:", error);
        return NextResponse.json(
            { error: "Failed to fetch data for the game." },
            { status: 500 }
        );
    }
}
