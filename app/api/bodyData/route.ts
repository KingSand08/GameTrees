import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const bodyData = await request.json;
    return NextResponse.json(bodyData, { status: 200 });
};