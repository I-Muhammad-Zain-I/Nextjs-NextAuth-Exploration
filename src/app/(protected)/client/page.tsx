"use client";
import React from "react";

import UserInfo from "@/components/auth/user-info";
import useCurrentUser from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser();
  console.log(user);

  return <UserInfo user={user} label="User Info (Client)" />;
};

export default ClientPage;
