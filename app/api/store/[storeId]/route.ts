import { NextRequest, NextResponse } from "next/server";
import { StoreRepository } from "@/database/queries/store/StoreRepository";
import { StoreDetailRep } from "@/database/queries/store/StoreDetails";
import { StoreHoursRep } from "@/database/queries/store/StoreHoursRep";

const storeRepository = new StoreRepository();
const storeDetailRep = new StoreDetailRep();
const storeHoursRep = new StoreHoursRep();

export async function GET(request: NextRequest, { params }: { params: { storeId: string } }) {
    const { storeId } = params;

    try {
        // Fetch games and store details concurrently
        const [games, storeDetails, storeHours] = await Promise.all([
            storeRepository.getGamesByStoreId(storeId),
            storeDetailRep.getStoreDetails(storeId),
            storeHoursRep.getStoreHours(storeId),
        ]);

        // Return both games and store details in a single response object
        return NextResponse.json({ games, storeDetails, storeHours });
    } catch (error) {
        console.error("Error fetching store data:", error);
        return NextResponse.json({ error: "Failed to fetch store data" }, { status: 500 });
    }
}
