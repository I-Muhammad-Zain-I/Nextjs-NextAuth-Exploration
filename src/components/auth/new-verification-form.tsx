"use client";

import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormError from "./form-error";
import FormSuccess from "./form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    // In "dev mode -> use strict".
    /**
     * useEffect fires twice due which upon successful email verification we will immediately
     * see token does not exists since upon successful verification we are also deleting the token
       below is the additional check for 2nd firing
    */

    if (!token) {
      setError("Missing Token!");
      return;
    }

    try {
      const newVerificationResponse = await newVerification(token);

      //Error is not thrown rather returned as plain-object

      setSuccess(newVerificationResponse.success);
      setError(newVerificationResponse.error);
    } catch (error) {
      // incase something goes wrong
      setError("Something went wrong while verifying");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
