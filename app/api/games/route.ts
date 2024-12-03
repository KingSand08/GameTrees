import { NextResponse } from "next/server";
import { getAllGames } from "@/database/queries/search/searchGame";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required." }, { status: 400 });
    }

    try {
        const games = await getAllGames(query);
        return NextResponse.json(games);
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
