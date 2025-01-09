import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateStoreDetails } from "@/database/queries/store/updateStoreDetails";
import { updateStoreImage } from "@/database/queries/photo/updateStoreImage";
import sharp from "sharp";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let storeId, name, street, city, state, zipCode, country, modality, image;

        if (contentType.includes("application/json")) {
            const body = await req.json();
            storeId = body.storeId;
            name = body.name;
            street = body.street;
            city = body.city;
            state = body.state;
            zipCode = body.zipCode;
            country = body.country;
            modality = body.modality;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            storeId = formData.get("storeId");
            name = formData.get("name");
            street = formData.get("street");
            city = formData.get("city");
            state = formData.get("state");
            zipCode = formData.get("zipCode");
            country = formData.get("country");
            modality = formData.get("modality");
            image = formData.get("file") as File | null;
        }
     
        // Ensure only non-empty fields
        if (!name && !street && !city && !state && !zipCode && !country && !modality && !image) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        const updateData: Record<string, unknown> = {};
        if (name) updateData.name = name;
        if (street) updateData.street = street;
        if (city) updateData.city = city;
        if (state) updateData.state = state;
        if (zipCode) updateData.zipCode = zipCode;
        if (country) updateData.country = country;
        if (modality) updateData.modality = modality;

        if (Object.keys(updateData).length > 0) {
            const detailsUpdated = await updateStoreDetails(storeId, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update store details" }, { status: 500 });
            }
        }

        if (image) {
            const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedMimeTypes.includes(image.type)) {
                return NextResponse.json(
                    { message: "Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed." },
                    { status: 400 }
                );
            }

            try {
                const imageData = Buffer.from(await image.arrayBuffer());
                const MAX_FILE_SIZE = 3145728; // 3MB
                const MIN_QUALITY = 100;
                const RESIZE_W_DIMENSIONS = 1920;
                const RESIZE_H_DIMENSIONS = 1080;

                // Resize image before compressing
                const resizedImage = await sharp(imageData)
                    .resize({ width: RESIZE_W_DIMENSIONS, height: RESIZE_H_DIMENSIONS, fit: "cover" })
                    .toBuffer();

                // Compress the resized image
                let quality = 100;
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

                await updateStoreImage(storeId as unknown as number, compressedImage);
            
            } catch (error) {
                console.error("Error occurred while uploading file:", error);
                return NextResponse.json({ message: "Failed to upload file", status: 500 });
            }
        }

        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        if (updatedSession) {
            return NextResponse.json({
                message: "Store details updated successfully",
                store: {
                    name: name || "",
                    street: street || "",
                    city: city || "",
                    state: state || "",
                    zipCode: zipCode || "",
                    country: country || "",
                    modality: modality || "",
                },
                refresh: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating store details or image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
