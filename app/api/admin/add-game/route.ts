import { NextResponse } from "next/server";
import sharp from "sharp";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
import insertGame from "@/database/queries/game/insertGame";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString() || "";
        const price = parseFloat(formData.get("price")?.toString() || "");
        const did = parseInt(formData.get("devId")?.toString() || "", 10);
        const publishDate = formData.get("publishDate")?.toString() || "";
        const image = formData.get("image") as File;

        if (!title || isNaN(price) || !did || !publishDate || !image) {
            revalidatePath("/admin/add-game");
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Validate file type
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedMimeTypes.includes(image.type)) {
            revalidatePath("/admin/add-game");
            return NextResponse.json(
                { message: "Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed." },
                { status: 400 }
            );
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
            revalidatePath("/admin/add-game");
            return NextResponse.json(
                { message: `Unable to compress image to ${MAX_FILE_SIZE / 1024}KB. Try uploading a smaller file.` },
                { status: 400 }
            );
        }

        // Insert game data into the database
        const result = await insertGame({
            title,
            description,
            did,
            price,
            publishDate,
            photo: compressedImage,
        });

        if (result.status === "success") {
            return NextResponse.json({ message: result.message }, { status: 201 });
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        revalidatePath("/admin/add-game");
        console.error("Error adding game:", error);
        return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
    }
}
