import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request: NextRequest) => {
    // Check if the user is authenticated
    const token = await getToken({ req: request });

    // If no token is found, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow the request to continue if the user is authenticated
    return NextResponse.next();
};


export const config = {
    matcher: [
        "/account-settings:path*",
        "/user/:path*",
    ],
}


export { default } from "next-auth/middleware"