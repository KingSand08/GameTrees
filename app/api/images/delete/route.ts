import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { deleteImages } from "@/database/queries/photo/deleteImages";

export const DELETE = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { imageIds } = body;

        if (!Array.isArray(imageIds) || imageIds.length === 0) {
            return NextResponse.json({ message: "No image IDs provided" }, { status: 400 });
        }

        await deleteImages(imageIds);

        return NextResponse.json({ message: "Images deleted successfully", imageIds }, { status: 200 });
    } catch (error) {
        console.error("Error deleting images:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
