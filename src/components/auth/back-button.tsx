"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type BackButtonType = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: BackButtonType) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
