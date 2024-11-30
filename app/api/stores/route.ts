import { NextRequest, NextResponse } from "next/server";
import { AllStoresRep } from "@/database/queries/store/AllStores";

const allStoresRep = new AllStoresRep();

export async function GET(request: NextRequest) {
    try {
        const stores = await allStoresRep.getAllStores();
        return NextResponse.json(stores);
    } catch (error) {
        console.error("Error fetching all stores:", error);
        return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
    }
}
