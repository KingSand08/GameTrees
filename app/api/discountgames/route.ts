import { NextRequest, NextResponse } from "next/server";
import { DiscountGamesRep } from "@/database/queries/game/DiscountGames";

const discountGamesRep = new DiscountGamesRep();

export async function GET(request: NextRequest) {
    try {
        const data = await discountGamesRep.getDiscountedGames();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching discounted games:", error);
        return NextResponse.json(
            { error: "Failed to fetch discounted games." },
            { status: 500 }
        );
    }
}
