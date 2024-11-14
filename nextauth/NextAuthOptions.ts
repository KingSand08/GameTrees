import Credentials from "next-auth/providers/credentials";
import GoogleProivder from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { findUserByEmailAndPassword, findUserByEmail } from "@/database/queries/authQueries";

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
        const user = await findUserByEmailAndPassword(email, password) as { UID: string, Username: string, Email: string, Name: string, image?: string }[];

        if (user && user.length > 0) {
          return {
            id: user[0].UID,
            username: user[0].Username,
            email: user[0].Email,
            name: user[0].Name,
            image: user[0].image || null,
            //add role to session
          };
        } else {
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
    }, async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await findUserByEmail(user.email);

        // If the user exists, proceed with the sign-in process
        if (existingUser.length > 0) {
          user.id = existingUser[0].UID;
          user.username = existingUser[0].Username;
          user.email = existingUser[0].Email;
          user.name = existingUser[0].Name;
          user.image = existingUser[0].image || null;
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/signup",
  },
};
