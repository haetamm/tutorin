import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import FormGuestPage from "../component/guest/FormGuestPage";
import { resetPasswordFields } from "../utils/fields-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordFormSchema } from "../utils/validation";
import { useLocation } from "react-router-dom";
import { usePasswordStore } from "../store/password";

const ResetPasswordPage = () => {
  const { loading, resetPassword } = usePasswordStore();
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1400 });
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");

  const onSubmit = async (data) => {
    await resetPassword(data, setError, token, reset);
  };

  return (
    <>
      <Helmet>
        <title>Reset password . Tutorin</title>
        <meta name="description" content="Reset password page" />
      </Helmet>
      <section
        className={` ${
          isMobile ? "" : "container mx-auto"
        } flex-grow pt-[90px] lg:pt-[95px] xl:pt-[120px]`}
      >
        <div className="flex flex-col md:flex-row">
          <FormGuestPage
            name="Reset Password"
            fields={resetPasswordFields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            loading={loading}
            control={control}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;
