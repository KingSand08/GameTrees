import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const formData = await request.formData();
    const email = formData.get("email");
    return NextResponse.json({ email }, { status: 200 })
}