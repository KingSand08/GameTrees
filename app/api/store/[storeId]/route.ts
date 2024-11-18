import { NextRequest, NextResponse } from "next/server";
import { StoreRepository } from "@/database/queries/store/StoreRepository";
import { StoreDetailRep } from "@/database/queries/store/StoreDetailRep";

const storeRepository = new StoreRepository();
const storeDetailRep = new StoreDetailRep();

export async function GET(request: NextRequest, { params }: { params: { storeId: string } }) {
    const { storeId } = params;

    try {
        // Fetch games and store details concurrently
        const [games, storeDetails] = await Promise.all([
            storeRepository.getGamesByStoreId(storeId),
            storeDetailRep.getStoreDetails(storeId)
        ]);

        // Return both games and store details in a single response object
        return NextResponse.json({ games, storeDetails });
    } catch (error) {
        console.error("Error fetching store data:", error);
        return NextResponse.json({ error: "Failed to fetch store data" }, { status: 500 });
    }
}
