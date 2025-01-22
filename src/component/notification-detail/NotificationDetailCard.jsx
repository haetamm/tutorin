import React from "react";
import PropTypes from "prop-types";
import { useNotificationStore } from "../../store/notification";

const NotificationDetailCard = ({ jobId }) => {
  const { loadingResume, getResume, loadingStatus, tutors, updateStatusJob } =
    useNotificationStore();

  const handleDownloadResume = (id, tutorId, jobId) => {
    getResume(id, tutorId, jobId);
  };

  const updateStatus = async (newStatus, tutorId) => {
    updateStatusJob(jobId, newStatus, tutorId);
  };

  return (
    <>
      {tutors.map((tutor, index) => (
        <div key={index} className="flex w-full mb-2">
          <div className="w-full mb-5">
            <div className="ml-auto bg-white border-blue-200 border-2 rounded p-1">
              <div className="flex p-2 gap-2 items-center">
                <div className="w-[20%] justify-center items-center text-center">
                  <img
                    className="rounded-full w-36"
                    src={tutor.imageUrl}
                    alt="Profile"
                  />
                </div>
                <div className="k-w-4/5 text-start">
                  <p>{tutor.name}</p>
                  <p>Ulasan: 0</p>
                  <p>Rating: No ratings</p>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    handleDownloadResume(tutor?.resume?.id, tutor.id, jobId);
                  }}
                  className=" p-1 w-full capitalize bg-black text-white"
                >
                  {loadingResume ? "Loading" : "View Resume"}
                </button>
              </div>
              <div className="p-2 pt-1 flex gap-3">
                <button
                  onClick={
                    tutor.status === "REJECTED"
                      ? null
                      : () => updateStatus("REJECTED", tutor.id)
                  }
                  className=" p-1 w-full capitalize bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-300"
                  disabled={tutor.status === "REJECTED" || loadingStatus}
                >
                  Reject
                </button>
                <button
                  onClick={
                    tutor.status === "ACCEPTED"
                      ? null
                      : () => updateStatus("ACCEPTED", tutor.id)
                  }
                  className=" p-1 w-full capitalize bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-blue-300"
                  disabled={tutor.status === "ACCEPTED" || loadingStatus}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

NotificationDetailCard.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default NotificationDetailCard;
