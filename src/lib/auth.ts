import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  console.log("Await current user", session?.user);
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  console.log("Await current role", session?.user.role);
  return session?.user.role;
};
