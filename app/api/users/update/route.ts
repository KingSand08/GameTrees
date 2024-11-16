import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateUserDetails, updateUserImage } from "@/database/queries/updateUser";
import { signIn } from "next-auth/react";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
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

        // Validate inputs (minimal validation shown here)
        if (!username && !email && !name && !password && !image) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        // Prepare update data for user details
        const updateData: Record<string, any> = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (name) updateData.name = name;
        if (password) {
            // const hashedPassword = await bcrypt.hash(password, 10);
            // updateData.password = hashedPassword;
            updateData.password = password;
        }

        // Update user details if any fields were provided
        if (Object.keys(updateData).length > 0) {
            const detailsUpdated = await updateUserDetails(session.user.id as unknown as number, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
            }
        }
        // Handle image upload
        if (image) {
            try {
                const imageData = Buffer.from(await image.arrayBuffer());
                const imageUpdated = await updateUserImage(session.user.id as unknown as number, imageData);
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
                id: session.user.id, // User ID remains the same
                username: username || session.user.username,
                email: email || session.user.email,
                name: name || session.user.name,
                image: image ? `/path/to/uploaded/image.jpg` : session.user.image, // Use updated image if provided
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating user details or image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};