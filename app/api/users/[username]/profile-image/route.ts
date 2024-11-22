import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const image = await getUserAccountImage(session.user.id);

        return NextResponse.json({ image });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
            { message: "Failed to retrieve image" },
            { status: 500 }
        );
    }
}
