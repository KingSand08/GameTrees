import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import executeQuery from "@/database/mysqldb";

// Disable body parsing for this route
export const config = {
    api: {
        bodyParser: false,
    },
};

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
        // Prepare the SQL query to update the user image in the database
        const query = "UPDATE Users SET Image = ? WHERE UID = ?";
        const values = [imageData, session.user.id];
        await executeQuery(query, values);
        return NextResponse.json({ message: "File uploaded successfully", status: 201 });
    } catch (error) {
        console.error("Error occurred while uploading file:", error);
        return NextResponse.json({ message: "Failed to upload file", status: 500 });
    }
};

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const query = "SELECT Image FROM Users WHERE UID = ?";
    const values = [session.user.id];

    try {
        // Cast `result` to an array of objects with an optional `Image` property
        const result = (await executeQuery(query, values)) as { Image?: Buffer }[];

        if (result.length > 0 && result[0].Image) {
            const image = result[0].Image.toString("base64");
            return NextResponse.json({ image });
        } else {
            return NextResponse.json({ image: null });
        }
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ message: "Failed to retrieve image" }, { status: 500 });
    }
}
