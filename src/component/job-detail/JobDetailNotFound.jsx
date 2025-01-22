import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import { useModalStore } from "../../store/modal";

const JobDetailNotFound = ({ isMobile }) => {
  const { closeModal } = useModalStore();
  return (
    <>
      <div className="lg:block font-normal h-screen w-full">
        <div className=" p-10  ">
          <div className="bg-slate-200 px-6 py-6 h-[calc(100vh-222px)] rounded-2xl">
            <div className="flex items-center  gap-3 ">
              <FaArrowLeft
                className="h-7 w-7"
                onClick={isMobile ? () => closeModal() : null}
              />
              <p className="text-2xl">
                {isMobile ? "Back" : "Select a request"}
              </p>
            </div>
            <div className="font px-[2.5rem] mt-2">
              {isMobile ? "Not Found" : "Display detail here"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

JobDetailNotFound.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default JobDetailNotFound;
