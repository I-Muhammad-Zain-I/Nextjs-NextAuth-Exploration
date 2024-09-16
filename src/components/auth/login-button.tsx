"use client";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    console.log("LoginButton clicked");
    router.push("/api/auth/login");
  };

  if (mode === "modal") {
    return <div>TODO: IMPLEMENT MODAL</div>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
