// import { NextResponse, NextRequest } from "next/server"

// export const middleware = async (request: NextRequest) => {
//     return NextResponse.redirect(new URL("/login", request.url));
// };

export const config = {
    matcher: [
        "/account-settings:path*",
        "/wishlist/:path*",
    ],
}


export { default } from "next-auth/middleware"