import React from "react";
import { Link } from "react-router-dom";
import { urlPage } from "../utils/constans";
import dashBoardImg from "../assets/dashboard-student.webp";
import ButtonCustom from "../component/guest/ButtonCustom";
import { Helmet } from "react-helmet-async";
import { scrollTop } from "../utils/helper";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Tutorin</title>
        <meta name="description" content="Landing page tutorin" />
      </Helmet>
      <div className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full pt-[50px] md:pt-[100px] lg:pt-[130px] w-full gap-4 kontener mx-auto">
          <div className=" justify-center items-center order-2 hidden md:flex mt-0 md:mt-11 lg:mt-0">
            <div className="text-md font-normal px-6 lg:px-10">
              <img
                src={dashBoardImg}
                alt=""
                className="w-[360px] rounded-lg shadow-lg h-[160px] md:w-[766px] md:h-[360px]"
              />
            </div>
          </div>
          <div className=" flex justify-center items-center mt-10 sm:mt-4 md:mt-0 order-1">
            <div className="text-md font-normal px-6 lg:px-10">
              <div className="text-7xl font-bold">
                Tutorin is where the future works
              </div>
              <div>
                Transform the way you work with one place for everyone and
                everything you need to get stuff done
              </div>
              <div className="flex gap-3 mt-3 items-center">
                <Link onClick={scrollTop} to={urlPage.REGISTER_STUDENT}>
                  <ButtonCustom>Student</ButtonCustom>
                </Link>
                <Link onClick={scrollTop} to={urlPage.REGISTER_TUTOR}>
                  <ButtonCustom>Teacher</ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
