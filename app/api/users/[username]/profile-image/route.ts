import { getUserImage } from "@/database/queries/photo/imageQueries";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Get the user's image from the database
        const imageBuffer = await getUserImage(session.user.id as unknown as number);

        if (imageBuffer) {
            const image = imageBuffer.toString("base64");
            return NextResponse.json({ image });
        } else {
            return NextResponse.json({ image: null });
        }
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ message: "Failed to retrieve image" }, { status: 500 });
    }
}
