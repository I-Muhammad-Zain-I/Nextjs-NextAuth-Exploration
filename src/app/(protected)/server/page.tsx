import React from "react";
import { currentUser } from "@/lib/auth";
import UserInfo from "@/components/auth/user-info";

const ServerPage = async () => {
  const user = await currentUser();
  console.log(user);

  return <UserInfo user={user} label="User Info" />;
};

export default ServerPage;
