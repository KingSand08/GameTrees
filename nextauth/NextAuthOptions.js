import Credentials from "next-auth/providers/credentials";
import GoolgeProivder from "next-auth/providers/google";
import executeQuery from "@/database/mysqldb";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 Days
  },
  providers: [
    GoolgeProivder({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
        const { email, password } = credentials;
        const query = `SELECT * FROM Test WHERE email = ? AND password = ?`;
        const data = [email, password];
        const user = await executeQuery(query, data);

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
      // Persist the user object on the JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties to the session
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Your custom sign-in page
    // signOut: "/auth/signout", // Your custom sign-out page
  },
};
