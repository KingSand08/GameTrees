import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateUserImage, getUserImage } from "@/database/queries/imageQueries";

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ensure we are handling a POST form data submission
    if (req.method !== "POST") {
        return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
    }

    // Parse form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    try {
        // Convert file to binary buffer for database storage
        const imageData = Buffer.from(await file.arrayBuffer());

        // Update the user's image in the database
        await updateUserImage((session.user.id as unknown as number), imageData);

        return NextResponse.json({ message: "File uploaded successfully", status: 201 });
    } catch (error) {
        console.error("Error occurred while uploading file:", error);
        return NextResponse.json({ message: "Failed to upload file", status: 500 });
    }
};