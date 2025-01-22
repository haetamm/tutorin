import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetailNotFound from "./JobDetailNotFound";
import Loader from "../Loader";
import HeaderJobDetail from "./HeaderJobDetail";
import BodyJobDetail from "./BodyJobDetail";
import { useModalStore } from "../../store/modal";
import { useJobStore } from "../../store/job";
import { useMediaQuery } from "react-responsive";

const JobDetail = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const { closeModal } = useModalStore();
  const { job, removeJob, loadingJobDetail } = useJobStore();

  const { id } = useParams();

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

  if (loadingJobDetail) {
    return <Loader />;
  }

  if (!job) {
    return <JobDetailNotFound isMobile={isMobile} />;
  }

  return (
    <>
      <div className="h-screen border-tertiary-ghost-color md:border md:border-t-0 md:rounded-b-lg font-normal">
        <div className="lg:block h-60">
          <div className="hidden lg:block h-[9rem] nav-background"></div>
          <div className="bg-white  md:rounded-b-lg">
            <HeaderJobDetail
              job={job}
              handleBack={closeModal}
              isMobile={isMobile}
            />
            <BodyJobDetail job={job} loading={loadingJobDetail} />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
