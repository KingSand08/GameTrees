import Credentials from "next-auth/providers/credentials";
import GoogleProivder from "next-auth/providers/google";
import executeQuery from "@/database/mysqldb";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 Days
  },
  providers: [
    GoogleProivder({
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
        const query = `SELECT * FROM Users U WHERE U.Email = ? AND U.Password = ? AND EXISTS (SELECT * FROM Customers C WHERE U.UID = C.UID);`;
        const data = [email, password];
        const user = await executeQuery(query, data) as { id: string, username: string, email: string, full_name: string, image?: string }[];
        console.log("Database Response:", user);

        if (user && user.length > 0) {
          console.log("Login Successfully");
          return {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            name: user[0].full_name,
            image: user[0].image || null,
            //add role to session
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
        // add role to cookie
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
        // add role to session object
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
