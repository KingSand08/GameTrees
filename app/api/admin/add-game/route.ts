import { NextResponse } from "next/server";
import sharp from "sharp";
import addGame from "@/database/queries/game/addGame";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString() || "";
        const price = parseFloat(formData.get("price")?.toString() || "0");
        const publishDate = formData.get("publishDate")?.toString() || "";
        const devId = parseInt(formData.get("devId")?.toString() || "0", 10);
        const image = formData.get("image") as File;

        // Validate input
        if (!title || !description || isNaN(price) || isNaN(devId) || !publishDate || !image) {
            return NextResponse.json({ error: "Invalid input data." }, { status: 400 });
        }

        // Process the image
        const imageData = Buffer.from(await image.arrayBuffer());
        const MAX_FILE_SIZE = 3000000; // 3MB
        const MIN_QUALITY = 10;
        const RESIZE_DIMENSIONS = 300;

        // Resize image
        const resizedImage = await sharp(imageData)
            .resize({ width: RESIZE_DIMENSIONS, height: RESIZE_DIMENSIONS, fit: "inside" })
            .toBuffer();

        // Compress image
        let quality = 50;
        let compressedImage = resizedImage;

        while (compressedImage.length > MAX_FILE_SIZE && quality > MIN_QUALITY) {
            compressedImage = await sharp(resizedImage)
                .jpeg({ quality })
                .toBuffer();
            quality -= 10;
        }

        if (compressedImage.length > MAX_FILE_SIZE) {
            return NextResponse.json(
                { message: `Unable to compress image to ${MAX_FILE_SIZE / 1024}KB. Try uploading a smaller file.` },
                { status: 400 }
            );
        }

        // Insert game into the database
        const result = await addGame({
            title,
            description,
            price,
            publishDate,
            did: devId,
            photo: resizedImage,
        });

        if (result.status === "success") {
            return NextResponse.json({ message: result.message }, { status: 201 });
        } else {
            return NextResponse.json({ error: result.message }, { status: 500 });
        }
    } catch (error) {
        console.error("Error adding game:", error);
        return NextResponse.json({ error: "Failed to add game." }, { status: 500 });
    }
}
