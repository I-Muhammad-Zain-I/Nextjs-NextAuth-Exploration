import Credentials, {
  CredentialInput,
  CredentialsConfig,
} from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas/validation";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authorize = async (
  credentials: Partial<CredentialsConfig<Record<string, CredentialInput>>>
) => {
  // Zod Validation
  const validatedFields = LoginSchema.safeParse(credentials);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    /**
     * 1. Check if the user exists in the database
     * 2. If the user exists, check if they have a password
     * 3. If they DON'T have password then it means they have logged in using google or github etc
     */
    const user = await getUserByEmail(email);
    console.log("user", user);
    if (!user || !user.password) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("passwordMatch", passwordMatch);
    if (passwordMatch) return user;
  }
  return null;
};

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({ authorize }),
  ],
} satisfies NextAuthConfig;
