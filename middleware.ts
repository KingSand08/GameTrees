import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request: NextRequest) => {
    // Check if the user is authenticated
    const token = await getToken({ req: request });

    const referer = request.headers.get("referer");

    // If the user is authenticated and trying to access login or signup, redirect to home
    if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If no token is found and the route requires authentication, redirect to the login page
    if (!token && (request.nextUrl.pathname.startsWith("/account-settings") || request.nextUrl.pathname.startsWith("/users"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // NOW BEGINS ROLE MANAGEMENT
    if (token?.role === "admin" && request.nextUrl.pathname.startsWith("/users")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token?.role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
        const fallbackUrl = "/";
        const lastUrl = referer || request.cookies.get("last-visited-page")?.value || fallbackUrl;

        console.log("Redirecting non-admin user back to:", lastUrl);

        // Redirect non-admin user to last visited page or fallback URL
        return NextResponse.redirect(new URL(lastUrl, request.url));
    }

    // Save the current page as the last visited page for non-admin users
    if (!request.nextUrl.pathname.startsWith("/admin")) {
        const response = NextResponse.next();
        response.cookies.set("last-visited-page", request.url, {
            httpOnly: true,
            path: "/",
        });
        return response;
    }

    // Allow the request to continue if all conditions pass
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/account-settings:path*",
        "/users/:path*",
        "/login",
        "/signup",
        "/admin/:path*",
    ],
};

export { default } from "next-auth/middleware";
