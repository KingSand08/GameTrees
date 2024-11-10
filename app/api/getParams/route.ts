import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const people = await fetch(`https://api.github.com/users/${id}`);
    const data = await people.json();
    return NextResponse.json(data, { status: 200 });
};
