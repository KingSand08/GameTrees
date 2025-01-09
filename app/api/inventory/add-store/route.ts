import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateManagerIdInStores } from "@/database/queries/store/editStore";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let managerId, storeIds;

        if (contentType.includes("application/json")) {
            const body = await req.json();
            storeIds = body.storeIds;
            managerId = body.managerId;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            storeIds = JSON.parse(formData.get("storeIds") as string || "[]");
            managerId = formData.get("managerId") as string;
        }
     
        // Ensure only non-empty fields
        if (storeIds.length === 0 || !managerId) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        if (Object.keys(contentType).length > 0) {
            await updateManagerIdInStores(storeIds, managerId);
        }    

        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        if (updatedSession) {
            return NextResponse.json({
                message: "Inventory added successfully",
                inventory: {
                    storeIds: storeIds || "",
                    managerId: managerId || "",
                },
                refresh: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error adding inventory:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
