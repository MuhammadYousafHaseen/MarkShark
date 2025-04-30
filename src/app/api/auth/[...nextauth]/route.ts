import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

// Use the User type from NextAuth (or define a custom one that matches NextAuth's expectations)
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        if (!credentials) return null;

        await dbConnect();
        try {
          const email = credentials.email.trim().toLowerCase();
          const user = await User.findOne({ email: email }).lean().exec();

          if (!user) {
            throw new Error("User not found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.error("Error in authorizing user", error);
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const userInDb = await User.findOne({ email: session.user.email });

      if (userInDb) {
        session.user.id = userInDb._id?.toString();
        session.user.isAdmin = userInDb.isAdmin;
        session.user.name = userInDb.name;
        session.user.email = userInDb.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
