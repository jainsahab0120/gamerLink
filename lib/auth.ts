import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
          select: {
            email: true,
            password: true,
            id: true,
            username: true,
          },
        });

        if (
          user &&
          user.password &&
          (await compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      // Always return the token
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
