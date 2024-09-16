"use server";
import { LoginSchema } from "@/schemas/validation";
import { z } from "zod";

const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  return {
    success: "Email Sent!",
  };
  console.log(values);
};

export { login };
