import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateDiscounts } from "@/database/queries/store/editInventory";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let discount, storeId, gameIds;

        if (contentType.includes("application/json")) {
            const body = await req.json();
            storeId = body.storeId;
            discount = body.discount;
            gameIds = body.gameIds;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            storeId = formData.get("storeId") as string;
            discount = parseFloat(formData.get("discount") as string);
            gameIds = JSON.parse(formData.get("gameIds") as string || "[]");
        }
        
        if (Object.keys(contentType).length > 0) {
            await updateDiscounts(storeId, discount, gameIds);
        }

        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        if (updatedSession) {
            return NextResponse.json({
                message: "Discounts updated successfully",
                store: {
                    discount: discount || "",
                    storeId: storeId || "",
                    gameIds: gameIds || "",
                },
                refresh: true,
            }, { status: 200 });
        } 
        else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } 
    catch (error) {
        console.error("Error updating discounts:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
