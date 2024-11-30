import { NextRequest, NextResponse } from "next/server";
import { SeparateStoresRep } from "@/database/queries/store/SeparateStores";

const separateStoresRep = new SeparateStoresRep();

export async function GET(request: NextRequest) {
    try {
        const bayAreaStores = await separateStoresRep.getBayAreaStores();
        const nonBayAreaStores = await separateStoresRep.getNonBayAreaStores();
        return NextResponse.json({ bayAreaStores, nonBayAreaStores });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
    }
}
