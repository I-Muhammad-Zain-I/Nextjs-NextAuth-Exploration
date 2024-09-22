import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export { LoginSchema, RegisterSchema, ResetSchema, NewPasswordSchema };
