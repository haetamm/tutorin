import React, { useCallback, useEffect } from "react";
import { urlPage } from "../../utils/constans";
import { formatDate, getHumanReadableDiff, isActive } from "../../utils/helper";
import { Link, useLocation } from "react-router-dom";
import { useJobStore } from "../../store/job";
import Load from "../Load";
import { useMediaQuery } from "react-responsive";
import { useModalStore } from "../../store/modal";

const ListJob = () => {
  const { openModal } = useModalStore();
  const { jobs, loading, fetchJob, currentPage, fetchJobById } = useJobStore();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleModal = useCallback(() => {
    if (isMobile) {
      openModal("JobDetail", "JobDetail", "Extra");
    }
  }, [isMobile, openModal]);

  useEffect(() => {
    fetchJob(currentPage);
  }, [fetchJob, currentPage]);

  return (
    <>
      <div className="flex-auto overflow-auto">
        <ul className="flex-1 overflow-hidden">
          {loading ? (
            <Load />
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-500 text-lg p-4">
              No requests available
            </div>
          ) : (
            jobs.map((job, index) => {
              const path = `${urlPage.JOB_DETAIL}/${job.id}`;

              return (
                <Link
                  onClick={() => {
                    handleModal();
                    fetchJobById(job.id);
                  }}
                  to={path}
                  key={index}
                  className="cursor-pointer"
                >
                  <div
                    className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal 
                    ${
                      isActive(pathname, path)
                        ? "border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="mr-2 font-normal">
                      <p className="font-bold text-2xl">{job.title}</p>
                      <p className="text-md">
                        {job.city}, {job.country}
                      </p>
                      <p className="text-sm">{job.salary}</p>
                      <p className="text-sm">
                        Posted about {getHumanReadableDiff(job.createdAt)} ·
                        Apply before {formatDate(job.deadline)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default ListJob;
