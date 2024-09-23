import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}

/**
 * This might change in future as per doc-string in "@auth/core/jwt"
 */
declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      /**
       * next-auth provides events that are triggered on certain actions
       * Only the credentials provider will have email verification since for github and google
       * the email is already verified thus we pre populate the emailVerified field when user links their account
       */
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sigin if email is not verified
      if (!existingUser?.emailVerified) return false;

      // Checking if 2FA is enabled
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        console.log({ twoFactorConfirmation });
        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next time ->  So user would need to do 2FA again
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      /**
       * If email is not verified then user cannot sign in
       */
      return true;
    },
    async session({ token, session }) {
      /**
       * extending session which in turn extends the token and
       * allows us to add more data to the token
       * -> "sub" is alias for id
       */
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      /**
       * We are extending token here because
       * the token is available in MIDDLEWARE also which can be useful for RBAC
       */

      // no token -> userLoggedOut
      if (!token) return token;

      const existingUser = await getUserById(token.sub!);

      // the user is non-existent
      if (!existingUser) return token;

      // user exists -> extending token
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
