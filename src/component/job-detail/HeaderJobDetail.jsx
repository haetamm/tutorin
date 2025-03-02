import React from "react";
import PropTypes from "prop-types";
import { getHumanReadableDiff, formatDate } from "../../utils/helper";
import { MdClose } from "react-icons/md";

const HeaderJobDetail = ({ job, handleBack, isMobile }) => {
  return (
    <>
      <div className="inline-block lg:flex md:justify-between w-full ">
        <div className="mb-0 flex items-center justify-between fixed lg:relative w-full bg-white p-3 lg:px-6 lg:py-0 shadow-sm lg:shadow-none">
          <span className="flex items-end">
            <div className="text-current visited:text-inherit hover:text-current">
              <h1 className="text-title inline-flex items-center md:text-primary-head md:flex lg:mt-16 text-2xl lg:text-4xl font-bold">
                {job.title}
              </h1>
            </div>
          </span>
          {isMobile && (
            <div className="flex items-center mb-0 lg:hidden">
              <MdClose onClick={handleBack} className="h-8 w-8 mr-2" />
            </div>
          )}
        </div>
        <div className=" lg:text-right mt-20 lg:mt-0 px-3 lg:px-6 lg:py-1">
          <p>
            Posted about {getHumanReadableDiff(job.createdAt)} and deadline of
            application is on {formatDate(job.deadline)}
          </p>
        </div>
      </div>
    </>
  );
};

HeaderJobDetail.propTypes = {
  job: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default HeaderJobDetail;
