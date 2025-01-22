import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet-async";
import FormGuestPage from "./FormGuestPage";
import Hero from "./Hero";
import { useRegisterStore } from "../../store/register";

const FormRegister = ({
  path,
  title,
  desc,
  heroImg,
  name,
  fields,
  formSchema,
}) => {
  const { registerUser, loading } = useRegisterStore();
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1400 });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    await registerUser(path, data, setError, navigate, reset);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      <section
        className={` ${
          isMobile ? "" : "container mx-auto"
        } flex-grow pt-[80px] lg:pt-[95px] xl:pt-[100px]`}
      >
        <div className="flex flex-col md:flex-row items-center">
          <Hero heroImg={heroImg} name="register" />

          <FormGuestPage
            name={name}
            fields={fields}
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

FormRegister.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  heroImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  formSchema: PropTypes.object.isRequired,
};

export default FormRegister;
