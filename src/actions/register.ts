"use server";
import { RegisterSchema } from "@/schemas/validation";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { email, password, name } = validatedFields.data;

  // Check if Email is Taken
  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { error: "Email is already in use" };
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation Email Sent",
  };
};

export { register };
