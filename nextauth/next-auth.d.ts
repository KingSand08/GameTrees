// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            name: string;
            image: string | null;
        };
    }

    interface User {
        id: string;
        username: string;
        email: string;
        name: string;
        image?: string | null;
    }

    interface JWT {
        id: string;
        username: string;
        email: string;
        name: string;
        image?: string | null;
    }
}
