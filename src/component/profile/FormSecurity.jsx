import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { securityFormSchema } from "../../utils/validation";
import { fieldsSecurityProfilePage } from "../../utils/fields-input";
import FormControllerInput from "../FormControllerInput";
import { usePasswordStore } from "../../store/password";
import ButtonForgotPassword from "../guest/ButtonForgotPassword";

const FormSecurity = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { updatePassword, loading } = usePasswordStore();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(securityFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    updatePassword(data, setError, reset);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 my-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 xs:gap-x-2 lg:gap-x-4">
          {fieldsSecurityProfilePage.map((field, index) => (
            <div key={index} className="m-0">
              <label className="block font-bold text-sm lg:text-base">
                {field.placeholder}
              </label>
              <FormControllerInput
                name={field.name}
                control={control}
                type={
                  field.isPasswordInput
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                icon={field.icon}
                isPasswordInput={field.isPasswordInput}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
            </div>
          ))}
          <div className="flex-col mt-0 xs:mt-6">
            <button
              type="submit"
              disabled={!isValid || isSubmitting || loading}
              className=" disabled:cursor-not-allowed bg-blue-700 disabled:bg-blue-300 hover:bg-blue-800 w-full h-[49px] mt-1 px-4 py-3 border border-gray-300 rounded"
            >
              {loading ? "Loading..." : "Save"}
            </button>

            <ButtonForgotPassword />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormSecurity;
