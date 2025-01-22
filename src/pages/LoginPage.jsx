import React, { useEffect, useState } from "react";
import heroImg from "../assets/login-img.webp";
import { loginFormSchema } from "../utils/validation.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "react-responsive";
import Hero from "../component/guest/Hero.jsx";
import FormGuestPage from "../component/guest/FormGuestPage.jsx";
import { Helmet } from "react-helmet-async";
import { loginFields } from "../utils/fields-input.js";
import useUserStore from "../store/user.js";
import { useModalStore } from "../store/modal.js";

const LoginPage = () => {
  const { loginUser, loginUserWithGoogle, loading } = useUserStore();
  const { openModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1400 });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    loginUser(data, setError);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const scope = searchParams.get("scope");

    if (code) {
      loginUserWithGoogle(code, scope, openModal);
    }
  }, [openModal, loginUserWithGoogle]);

  return (
    <>
      <Helmet>
        <title>Login . Tutorin</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <section
        className={` ${
          isMobile ? "" : "container mx-auto"
        } flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}
      >
        <div className="flex flex-col md:flex-row">
          <Hero heroImg={heroImg} name="login" />

          <FormGuestPage
            name="Login"
            fields={loginFields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            loading={loading}
            showPassword={showPassword}
            control={control}
            toggleShowPassword={toggleShowPassword}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
