import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { urlPage } from "../utils/constans.js";
import useUserStore from "../store/user.js";

const GuestLayout = () => {
  const { token } = useUserStore();

  if (token) {
    return <Navigate to={`${urlPage.STUDENT}`} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestLayout;
