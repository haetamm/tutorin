import React from "react";
import { roles, urlPage } from "../utils/constans";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import useUserStore from "../store/user";

const TutorLayout = () => {
  const { role } = useUserStore();

  if (role !== roles.TUTOR) {
    return <Navigate to={`${urlPage.HOME}`} />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default TutorLayout;
