import React from "react";
import PropTypes from "prop-types";
import FormControllerInput from "../FormControllerInput";
import { Link } from "react-router-dom";
import { urlPage } from "../../utils/constans";
import ButtonGoogle from "./ButtonGoogle";
import ButtonForgotPassword from "./ButtonForgotPassword";
import { scrollTop } from "../../utils/helper";

const FormGuestPage = ({
  name,
  fields,
  handleSubmit,
  onSubmit,
  loading,
  showPassword,
  control,
  toggleShowPassword,
  isValid,
  isSubmitting,
}) => {
  return (
    <>
      <div className="bg-transparent w-full md:max-w-md mt-0 lg:max-w-full md:mx-auto md:w-[50%] tab:w-[30%] xl:w-[27%] px-6 sm:px-24 md:px-7 tab:px-4 lg:px-5 xl:px-7 flex items-center justify-center">
        <div className="w-full h-100 ">
          <h1 className="text-2xl font-bold leading-tight text-center mb-2">
            {name}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div key={index} className="m-0">
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
                  placeholder={field.placeholder}
                  icon={field.icon}
                  isPasswordInput={field.isPasswordInput}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full block disabled:cursor-not-allowed bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 text-white font-semibold rounded-lg px-4 py-3 mt-1"
              disabled={!isValid || isSubmitting || loading}
            >
              {loading
                ? "Loading"
                : name === "Forgot Password"
                ? "Send Request"
                : name}
            </button>
            {name === "Login" && <ButtonForgotPassword />}
          </form>
          {name !== "Forgot Password" && name !== "Reset Password" && (
            <>
              <hr className="my-6 border-gray-300 w-full" />
              <ButtonGoogle />
              {name !== "Login" && (
                <p className="mt-4">
                  Have an account already?{" "}
                  <Link
                    to={urlPage.LOGIN}
                    onClick={scrollTop}
                    className="text-white hover:text-red-400 font-semibold"
                  >
                    Login
                  </Link>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

FormGuestPage.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool,
  control: PropTypes.object.isRequired,
  toggleShowPassword: PropTypes.func,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default FormGuestPage;
