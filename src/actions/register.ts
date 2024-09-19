"use server";
import { RegisterSchema } from "@/schemas/validation";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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

  // TODO: Sent Verification Email

  return {
    success: "User Created",
  };
};

export { register };
