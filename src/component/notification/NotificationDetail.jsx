import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import JobDetailNotFound from "../job-detail/JobDetailNotFound";
import Loader from "../Loader";
import NotificationDetailCard from "../notification-detail/NotificationDetailCard";
import NotificationDetailHeader from "../notification-detail/NotificationDetailHeader";
import NotificationDetailForm from "../notification-detail/NotificationDetailForm";
import { useNotificationStore } from "../../store/notification";
import NotFoundApplication from "./NotFoundApplication";
import { useModalStore } from "../../store/modal";

const NotificationDetail = () => {
  const { closeModal } = useModalStore();
  const { id } = useParams();
  const { job, removeJob, loading, tutors } = useNotificationStore();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    if (id === "list") {
      closeModal();
    }
  }, [closeModal, id]);

  useEffect(() => {
    return () => {
      removeJob();
    };
  }, [removeJob]);

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return <JobDetailNotFound isMobile={isMobile} />;
  }

  return (
    <div className={`h-screen lg:block w-full`}>
      <div className="flex flex-col w-full max-h-full">
        <NotificationDetailHeader
          job={job}
          handleBack={closeModal}
          isMobile={isMobile}
        />
        <hr />
        <div className="inline-block lg:flex lg:flex-grow overflow-hidden">
          <div className={`k-flex flex-col lg:w-full lg:flex`}>
            <div
              className={`overflow-y-auto w-full ${
                isMobile ? "h-[calc(100vh-13rem)]" : ""
              }`}
            >
              <div className="h-full overflow-y-auto flex flex-col-reverse px-1">
                <div className="text-center py-2 text-caption"></div>
                <div className="px-4 py-5 w-full format-rich-text ml-auto">
                  {tutors?.length === 0 ? (
                    <div className="w-full mb-4">
                      <NotFoundApplication />
                    </div>
                  ) : (
                    <NotificationDetailCard jobId={job?.jobId} />
                  )}
                </div>
              </div>
            </div>
            <NotificationDetailForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
