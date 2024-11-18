import { NextResponse } from "next/server";
import executeQuery from "@/database/mysqldb";
import sharp from "sharp";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
import { insertGame } from "@/database/queries/game/insertGame";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const title = formData.get("title")?.toString();
        const price = parseFloat(formData.get("price")?.toString() || "");
        const devId = formData.get("devId")?.toString();
        const image = formData.get("image") as File;

        if (!title || isNaN(price) || !devId || !image) {
            revalidatePath("/admin/add-game");
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Limit file to only image types
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedMimeTypes.includes(image.type)) {
            revalidatePath("/admin/add-game");
            return NextResponse.json(
                { message: "Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed." },
                { status: 400 }
            );
        }

        const imageData = Buffer.from(await image.arrayBuffer());
        const MAX_FILE_SIZE = 3000000; // 300KB
        const MIN_QUALITY = 10;
        const RESIZE_DIMENSIONS = 300;

        // Resize image before compressing
        const resizedImage = await sharp(imageData)
            .resize({ width: RESIZE_DIMENSIONS, height: RESIZE_DIMENSIONS, fit: "inside" })
            .toBuffer();

        // Compress the resized image
        let quality = 50;
        let compressedImage = resizedImage;

        while (compressedImage.length > MAX_FILE_SIZE && quality > MIN_QUALITY) {
            compressedImage = await sharp(resizedImage)
                .jpeg({ quality })
                .toBuffer();
            quality -= 10;
        }

        if (compressedImage.length > MAX_FILE_SIZE) {
            revalidatePath("/admin/add-game");
            return NextResponse.json(
                { message: `Unable to compress image to ${MAX_FILE_SIZE / 1024}KB. Try uploading a smaller file.` },
                { status: 400 }
            );
        }

        await insertGame({
            title,
            price: price as number,
            devId,
            imageBuffer: compressedImage,
        });

        return NextResponse.json({ message: "Game added successfully" }, { status: 201 });
    } catch (error) {
        revalidatePath("/admin/add-game");
        console.error("Error adding game:", error);
        return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
    }
}
