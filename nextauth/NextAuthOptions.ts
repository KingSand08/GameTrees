import Credentials from "next-auth/providers/credentials";
import GoogleProivder from "next-auth/providers/google";
import GitHubProivder from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import BungieProivder from "next-auth/providers/bungie";
import TwitchProivder from "next-auth/providers/twitch";
import { AuthOptions } from "next-auth";
import { findUserByEmail } from "@/database/queries/findUserByEmail";
import { findUserByEmailAndPassword } from "@/database/queries/findUserByEmailAndPassword";

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
    GitHubProivder({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    RedditProvider({
      clientId: process.env.REDDIT_ID!,
      clientSecret: process.env.REDDIT_SECRET!,
    }),
    BungieProivder({
      clientId: process.env.BUNGIE_ID!,
      clientSecret: process.env.BUNGIE_SECRET!,
    }),
    TwitchProivder({
      clientId: process.env.TWITCH_ID!,
      clientSecret: process.env.TWITCH_SECRET!,
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
      if (account?.provider != "google" && user.email) {
        return true;
      }
      else {
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
    },
  },
  pages: {
    signIn: "/login",
    error: "/signup",
  },
};
