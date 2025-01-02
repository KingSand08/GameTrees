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
        let username, email, firstname, lastname, password, image;

        if (contentType.includes("application/json")) {
            const body = await req.json();
            username = body.username;
            email = body.email;
            firstname = body.firstname;
            lastname = body.lastname;
            password = body.password;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            username = formData.get("username");
            email = formData.get("email");
            firstname = formData.get("firstname");
            lastname = formData.get("lastname");
            password = formData.get("password");
            image = formData.get("file") as File | null;
        }

        // Ensure only non-empty fields
        if (!username && !email && !firstname && !lastname && !password && !image) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        // Validate and process user data
        if (username) {
            const isUsernameTaken = await checkFieldAlreadyExists("Users", "username", username as string);
            if (isUsernameTaken) {
                return NextResponse.json({ status: "error", message: "Username is already in use by another account" }, { status: 400 });
            }
            if ((username as string).length > 25) {
                return NextResponse.json({ status: "error", message: "Username can only be 25 characters long" }, { status: 400 });
            }
        }

        if (email) {
            const isEmailTaken = await checkFieldAlreadyExists("Users", "email", email as string);
            if (isEmailTaken) {
                return NextResponse.json({ status: "error", message: "Email is already in use by another account" }, { status: 400 });
            }
        }

        if (password && (password as string).length < 8) {
            return NextResponse.json({ status: "error", message: "Password must be more than 8 characters long" }, { status: 400 });
        }

        const updateData: Record<string, unknown> = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (firstname) updateData.firstname = firstname;
        if (lastname) updateData.lastname = lastname;
        if (password) updateData.password = password;

        if (Object.keys(updateData).length > 0) {
            const detailsUpdated = await updateUserDetails(session.user.id as unknown as number, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
            }
        }

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

                // const result = 
                await updateUserAccountImage(session.user.id as unknown as number, compressedImage);

                // console.log(result)

            } catch (error) {
                console.error("Error occurred while uploading file:", error);
                return NextResponse.json({ message: "Failed to upload file", status: 500 });
            }
        }


        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        // console.log(updatedSession)
        if (updatedSession) {
            return NextResponse.json({
                message: "User details updated successfully",
                user: {
                    username: username || session.user.username,
                    email: email || session.user.email,
                    firstname: firstname || session.user.firstname,
                    lastname: lastname || session.user.lastname,
                },
                refresh: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating user details or image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
