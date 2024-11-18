import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";


export const POST = async (req: Request) => {
    // Ensure we are handling a form data submission
    if (req.method !== "POST") {
        return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
    }

    // Parse form data from the request
    const formData = await req.formData();

    // Retrieve the uploaded file from the form data
    const file = formData.get("file") as File | null;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Construct the file name and path
    const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }

    try {
        // Write the file to the uploads directory
        await writeFile(filePath, buffer);

        return NextResponse.json({ message: "File uploaded successfully", status: 201 });
    } catch (error) {
        console.error("Error occurred while writing the file:", error);
        return NextResponse.json({ message: "Failed to upload file", status: 500 });
    }
};
