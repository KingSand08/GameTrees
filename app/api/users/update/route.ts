import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateUserDetails } from "@/database/queries/user/updateUserDetails";
import { updateUserAccountImage } from "@/database/queries/photo/updateUserProfileImage";
import sharp from "sharp";
import { checkFieldAlreadyExists } from "@/database/queries/user/checkFieldAlreadyExists";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let username, email, name, password, image;

        if (contentType.includes("application/json")) {
            // Parse JSON body
            const body = await req.json();
            username = body.username;
            email = body.email;
            name = body.name;
            password = body.password;
        } else if (contentType.includes("multipart/form-data")) {
            // Parse form data
            const formData = await req.formData();
            username = formData.get("username");
            email = formData.get("email");
            name = formData.get("name");
            password = formData.get("password");
            image = formData.get("file") as File | null;
        }
        // Ensure only non-empty fields
        if (!username && !email && !name && !password && !image) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        // Check if username already exists for a different user
        if (username) {
            const isUsernameTaken = await checkFieldAlreadyExists('Users', 'username', username as string);
            if (isUsernameTaken) {
                return NextResponse.json({ status: "error", message: "Username is already in use by another account" }, { status: 400 });
            }

            if ((username as string).length > 25) {
                // Check if username follows username size limiation
                return NextResponse.json({ status: "error", message: "Username can only be 25 characters long" }, { status: 400 });
            }
        }
        // Check if email already exists for a different user
        if (email) {
            const isEmailTaken = await checkFieldAlreadyExists('Users', 'email', email as string);
            if (isEmailTaken) {
                return NextResponse.json({ status: "error", message: "Email is already in use by another account" }, { status: 400 });
            }
        }
        // Check if password follows password size limiation
        if (password) {
            if ((password as string).length < 8) {
                return NextResponse.json({ status: "error", message: "Password must be more then 8 numbers long" }, { status: 400 });
            }
        }

        // Prepare update data for user details
        const updateData: Record<string, unknown> = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (name) updateData.name = name;
        if (password) updateData.password = password;

        // Update user details if any fields were provided
        if (Object.keys(updateData).length > 0) {
            const detailsUpdated = await updateUserDetails(session.user.id as unknown as number, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
            }
        }
        // Handle image upload
        if (image) {
            // Limit file to only image types
            const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedMimeTypes.includes(image.type)) {
                return NextResponse.json(
                    { message: "Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed." },
                    { status: 400 }
                );
            }

            try {
                const imageData = Buffer.from(await image.arrayBuffer());
                const MAX_FILE_SIZE = 1000000; // 100KB
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
                    return NextResponse.json(
                        { message: `Unable to compress image to ${MAX_FILE_SIZE / 1024}KB. Try uploading a smaller file.` },
                        { status: 400 }
                    );
                }

                const result = await updateUserAccountImage(session.user.id as unknown as number, compressedImage);
                console.log(result)

                return NextResponse.json({ message: "File uploaded successfully", status: 201 });
            } catch (error) {
                console.error("Error occurred while uploading file:", error);
                return NextResponse.json({ message: "Failed to upload file", status: 500 });
            }
        }
        // Return success and instruct the client to update the session
        return NextResponse.json({
            message: "User details updated successfully",
            refresh: true,
            user: {
                username: username || session.user.username,
                email: email || session.user.email,
                name: name || session.user.name,
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating user details or image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};