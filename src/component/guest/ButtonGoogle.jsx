import React from "react";
import { generateGoogleAuthUrl } from "../../utils/helper";
import { FcGoogle } from "react-icons/fc";
import useUserStore from "../../store/user";

const ButtonGoogle = () => {
  const { loading } = useUserStore();
  const handleGoogleLogin = () => {
    const googleAuthUrl = generateGoogleAuthUrl();
    window.location.href = googleAuthUrl;
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
      >
        <div className="flex items-center justify-center">
          <FcGoogle className="w-6 h-6" />
          <span className="ml-4">
            {loading ? "Loading" : "Log in with Google"}
          </span>
        </div>
      </button>
    </>
  );
};

export default ButtonGoogle;
