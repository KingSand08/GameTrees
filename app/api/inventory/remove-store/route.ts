import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { removeManagerIdInStores } from "@/database/queries/store/editStore";

export const DELETE = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { storeIds, managerId } = body;

        if (!Array.isArray(storeIds) || storeIds.length === 0) {
            return NextResponse.json({ message: "No stores provided" }, { status: 400 });
        }
        
        await removeManagerIdInStores(storeIds, managerId);

        return NextResponse.json({ message: "Stores removed successfully", storeIds }, { status: 200 });
    } catch (error) {
        console.error("Error removing manager:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
