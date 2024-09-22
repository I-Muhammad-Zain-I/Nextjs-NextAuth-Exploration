"use server";

import { z } from "zod";
import { ResetSchema } from "@/schemas/validation";
import { getUserByEmail } from "@/data/user";
import { passwordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email while resetting" };
  }

  const { email } = values;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await passwordResetEmail(passwordResetToken.email, passwordResetToken.token);

  // generate token and send email
  return { success: "Reset email sent" };
};

export default reset;
