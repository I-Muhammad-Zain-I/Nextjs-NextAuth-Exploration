import prisma from "@/lib/db";

const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token: token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email: email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export { getPasswordResetTokenByToken, getPasswordResetTokenByEmail };
