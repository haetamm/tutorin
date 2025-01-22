import React from "react";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import FormGuestPage from "../component/guest/FormGuestPage";
import { forgotPasswordFields } from "../utils/fields-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordFormSchema } from "../utils/validation";
import { usePasswordStore } from "../store/password";

const ForgotPasswordPage = () => {
  const { loading, forgotPassword } = usePasswordStore();
  const isMobile = useMediaQuery({ maxWidth: 1400 });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await forgotPassword(data, setError, reset);
  };

  return (
    <>
      <Helmet>
        <title>Forgot password . Tutorin</title>
        <meta name="description" content="Forgot password page" />
      </Helmet>
      <section
        className={` ${
          isMobile ? "" : "container mx-auto"
        } flex-grow pt-[120px] lg:pt-[120px] xl:pt-[150px]`}
      >
        <div className="flex flex-col md:flex-row">
          <FormGuestPage
            name="Forgot Password"
            fields={forgotPasswordFields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
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

export default ForgotPasswordPage;
