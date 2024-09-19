import React from "react";
import { auth } from "@/auth";

type Props = {};

const SettingPage = async (props: Props) => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default SettingPage;
