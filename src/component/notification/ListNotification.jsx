import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { roles, urlPage } from "../../utils/constans";
import { getHumanReadableDiff, isActive } from "../../utils/helper";
import useUserStore from "../../store/user";
import { useNotificationStore } from "../../store/notification";

import { useMediaQuery } from "react-responsive";
import { useModalStore } from "../../store/modal";
import Load from "../Load";

const ListNotification = () => {
  const { pathname } = useLocation();
  const { role } = useUserStore();
  const { loading, jobs, fetchJob, fetchJobById } = useNotificationStore();
  const { openModal } = useModalStore();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleModal = useCallback(() => {
    if (isMobile) {
      openModal("NotifDetail", "NotifDetail", "Extra");
    }
  }, [isMobile, openModal]);

  useEffect(() => {
    fetchJob();
    handleModal();
  }, [fetchJob, handleModal]);

  const getMessagePath = (id) => {
    if (role === roles.STUDENT) {
      return `${urlPage.STUDENT_NOTIFICATION}/${id}`;
    } else if (role === roles.TUTOR) {
      return `${urlPage.TUTOR_NOTIFICATION}/${id}`;
    }
    return "#";
  };

  return (
    <>
      {jobs.length === 0 ? (
        loading ? (
          <Load />
        ) : (
          <div className="text-center text-gray-500 text-lg p-4">
            No requests available
          </div>
        )
      ) : (
        jobs.map((job) => {
          const path = getMessagePath(job.jobId);
          return (
            <Link
              to={path}
              key={job.jobId}
              onClick={() => {
                handleModal();
                fetchJobById(job.jobId);
              }}
              className={`flex items-start  bg-white px-3 py-2 text-normal ${
                isActive(pathname, path) ? "border-l-4 border-blue-500" : ""
              }`}
              aria-selected={isActive(pathname, path)}
            >
              <div className="flex border-b w-full py-2 px-4 gap-0 shadow-custome h-[87px]">
                <div className="whitespace-nowrap flex-grow overflow-hidden text-left">
                  <div className="truncate font-bold text-lg">
                    {job.title.toUpperCase()}
                  </div>
                  <div className="overflow-ellipsis overflow-hidden text-sm">
                    {job.tutors.length
                      ? `${job.tutors.map((u) => u.name)} applied for ${
                          job.title
                        }`
                      : "No one has applied yet"}
                  </div>
                  <p className="float-right text-sm">
                    {job.tutors.length
                      ? getHumanReadableDiff(
                          job.tutors[job.tutors.length - 1].createdAt
                        )
                      : ""}
                  </p>
                </div>
                <p className="float-right text-sm">{job.tutors.length}</p>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};

export default ListNotification;
