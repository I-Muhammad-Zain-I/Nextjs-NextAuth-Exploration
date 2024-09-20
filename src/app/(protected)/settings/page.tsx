import React from "react";
import { auth, signOut } from "@/auth";

type Props = {};

const SettingPage = async (props: Props) => {
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          const signOutRes = await signOut({
            redirect: true,
            redirectTo: "/auth/login",
          });
          console.log("signOutRes", signOutRes);
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingPage;
