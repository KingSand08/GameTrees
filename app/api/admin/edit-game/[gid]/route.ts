import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";
import { editGame } from "@/database/queries/game/editGame";

export async function POST(req: Request, { params }: { params: { gid: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Extract gid from URL params
        const { gid } = params;

        if (!gid) {
            return NextResponse.json(
                { error: "Game ID (gid) is required to edit the game." },
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const description = formData.get("description")?.toString() || "";
        const price = parseFloat(formData.get("price")?.toString() || "");
        const image = formData.get("image") as File;

        if (!description && !isNaN(price) && !image) {
            return NextResponse.json({ error: "You must fill out at least one input before attempting to edit." }, { status: 400 });
        }

        let compressedImage = null;

        if (image) {
            // Validate file type
            const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedMimeTypes.includes(image.type)) {
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
            let quality = 25;
            compressedImage = resizedImage;

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
        }
        // Insert game data into the database
        const result = await editGame(
            gid,
            description,
            price,
            compressedImage,
        );

        if (result.status === "success") {
            revalidatePath(`/game/${gid}`);
            return NextResponse.json({ message: result.message }, { status: 201 });
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        // revalidatePath("/admin/add-game");
        console.error("Error adding game:", error);
        return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
    }
}
