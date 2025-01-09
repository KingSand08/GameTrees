import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import deleteHours from "@/database/queries/store/deleteHours";

export const DELETE = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { days, storeId } = body;
        
        if (!Array.isArray(days) || days.length === 0) {
            return NextResponse.json({ message: "No days provided" }, { status: 400 });
        }

        await deleteHours(days, storeId);

        return NextResponse.json({ message: "Hours deleted successfully", days }, { status: 200 });
    } catch (error) {
        console.error("Error deleting images:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
