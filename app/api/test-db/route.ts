import executeQuery from "@/database/mysqldb";
import { NextResponse } from "next/server";

export async function GET() {
    // console.log("DB_HOST:", process.env.DB_HOST);
    // console.log("DB_PORT:", process.env.DB_PORT);
    // console.log("DB_NAME:", process.env.DB_NAME);
    // console.log("DB_USER:", process.env.DB_USER);

    try {
        const result = await executeQuery("SELECT 1 AS result", []);
        return NextResponse.json({ success: true, data: result });
    } catch (error: unknown) {
        console.error("Database test error:", error);

        // Safely handle the error
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
