import React from "react";
import { Link } from "react-router-dom";
import { urlPage } from "../../utils/constans";
import { scrollTop } from "../../utils/helper";

const ButtonForgotPassword = () => {
  return (
    <>
      <div className="flex justify-end">
        <Link
          onClick={scrollTop}
          to={urlPage.FORGOT_PASSWORD}
          className="text-black hover:text-red-400 font-semibold mt-1"
        >
          <small>Forgot password?</small>
        </Link>
      </div>
    </>
  );
};

export default ButtonForgotPassword;
