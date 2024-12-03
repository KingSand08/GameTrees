// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            name: string;
            lastname: string;
            role: string;
        };
    }

    interface User {
        id: string;
        username: string;
        email: string;
        name: string;
        lastname: string;
        role: string;
    }

    interface JWT {
        id: string;
        username: string;
        email: string;
        name: string;
        lastname: string;
        role: string;
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        email: string;
        name: string;
        lastname: string;
        role: string;
    }
}
