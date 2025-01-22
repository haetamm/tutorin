import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { urlPage } from "../utils/constans";
import { Helmet } from "react-helmet-async";
import { roles } from "../utils/constans";
import Pagination from "../component/home/Pagination";
import ListJob from "../component/home/ListJob";
import useUserStore from "../store/user";

const HomePage = () => {
  const { role } = useUserStore();

  if (role !== roles.TUTOR && role !== roles.ADMIN) {
    return <Navigate to={`${urlPage.STUDENT_PROFILE}`} />;
  }

  return (
    <>
      <Helmet>
        <title>Jobs . Tutorin</title>
        <meta name="description" content="Jobs page" />
      </Helmet>
      <div className="flex overflow-auto h-screen pt-[175px] xs:pt-[130px] md:pt-[142px] flex-1">
        <div className="flex w-full flex-col overflow-auto lg:w-[31%] border-3 border-r-2 border-black">
          <ListJob />
          <div className="flex flex-none justify-center border border-gray-300 bg-white">
            <Pagination />
          </div>
        </div>
        <div className="hidden w-[69%] overflow-auto lg:block">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePage;
