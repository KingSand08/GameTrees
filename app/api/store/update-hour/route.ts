import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { updateHours } from "@/database/queries/store/updateHours";
import { convertTo24Hour } from "@/utils/convertTo24Hour";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let storeId, day, start_time, end_time;

        if (contentType.includes("application/json")) {
            const body = await req.json();
            storeId = body.storeId;
            day = body.day;
            start_time = body.start_time;
            end_time = body.end_time;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            storeId = formData.get("storeId");
            day = formData.get("day");
            start_time = formData.get("start_time");
            end_time = formData.get("end_time");
        }
        
        // Ensure only non-empty fields
        if (!day && !start_time && !end_time) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        const updateData: Record<string, unknown> = {};
        if (start_time) updateData.start_time = convertTo24Hour(start_time);
        if (end_time) updateData.end_time = convertTo24Hour(end_time);
   
        if (Object.keys(contentType).length > 0) {
            const detailsUpdated = await updateHours(storeId, day, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update store hours" }, { status: 500 });
            }
        }

        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        if (updatedSession) {
            return NextResponse.json({
                message: "Operation hours updated successfully",
                store: {
                    day: day || "",
                    start_time: start_time || "",
                    end_time: end_time || "",
                },
                refresh: true,
            }, { status: 200 });
        } 
        else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating store hours:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
