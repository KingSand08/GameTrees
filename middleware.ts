import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request: NextRequest) => {
    // Check if the user is authenticated
    const token = await getToken({ req: request });

    // If the user is authenticated and trying to access login or signup, redirect to home
    if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If no token is found and the route requires authentication, redirect to the login page
    if (!token && (request.nextUrl.pathname.startsWith("/account-settings") || request.nextUrl.pathname.startsWith("/users"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow the request to continue if the user is authenticated or on a public page
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/account-settings:path*",
        "/users/:path*",
        "/login",
        "/signup",
    ],
};

export { default } from "next-auth/middleware";
