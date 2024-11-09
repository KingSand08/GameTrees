import Credentials from "next-auth/providers/credentials";
import GoolgeProivder from "next-auth/providers/google";
import executeQuery from "@/database/mysqldb";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 Days
  },
  providers: [
    GoolgeProivder({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          label: "E-Mail",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        console.log("Email:", email); console.log("Password:", password);
        const query = `SELECT * FROM Test WHERE email = ? AND password = ?`;
        const data = [email, password];
        const user = await executeQuery(query, data) as { id: string, username: string, email: string, name: string, image?: string }[];
        console.log("Database Response:", user);

        if (user && user.length > 0) {
          console.log("Login Successfully");
          return {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            name: user[0].name,
            image: user[0].image || null,
          };
        } else {
          console.log("Login Error Failure");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: (token.username as string) || token.name as string,
        email: (token.email as string) || "",
        name: (token.name as string) || "Anonymous",
        image: (token.image as string | null) ?? null,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
