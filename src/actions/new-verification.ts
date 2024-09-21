"use server";

import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  // Check if token exists -> someone may try to change the URL on new-verification page
  if (!existingToken) {
    return { error: "Token does not exists" };
  }

  // if token exists then check if it is expired

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  // If token is valid and un-expired check if user exits
  const existingUser = await getUserByEmail(existingToken.email);

  // one case is that user may have changed their email
  if (!existingUser) {
    return { error: "Email does not exists" };
  }

  // If user exists and token is valid then update verification status
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),

      /**
       * when user wants to change email in /settings page then
       * they would provide email to which a mail would be send which they can verify
       */
      email: existingToken.email,
    },
  });

  // after emailVerified field updated delete the token
  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: "email Verified!" };
};
