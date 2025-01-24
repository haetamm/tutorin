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
      <div className="w-full flex justify-center">
        <div className="kontener flex overflow-auto h-screen pt-[175px] xs:pt-[123px] md:pt-[126px] flex-1">
          <div className="flex w-full flex-col overflow-auto lg:w-[31%] border-3 xl:border-l-[1px] lg:border-r-[1px] border-black">
            <ListJob />
            <div className="flex flex-none justify-center border border-gray-300 bg-white">
              <Pagination />
            </div>
          </div>
          <div className="hidden w-[69%] overflow-auto no-scrollbar lg:block border-gray-300 border-r-[1px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
