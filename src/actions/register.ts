"use server";
import { RegisterSchema } from "@/schemas/validation";
import { z } from "zod";

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  return {
    success: "Email Sent!",
  };
};

export { register };
