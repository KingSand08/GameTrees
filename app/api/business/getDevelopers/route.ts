import geDevelopers from "@/database/queries/business/getDevelopers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const developers = await geDevelopers();

        // Return the businesses as JSON
        return NextResponse.json(developers);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return NextResponse.json(
            { error: "Failed to fetch businesses." },
            { status: 500 }
        );
    }
}
