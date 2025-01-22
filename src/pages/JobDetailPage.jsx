import React from "react";
import JobDetail from "../component/job-detail/JobDetail";
import { Helmet } from "react-helmet-async";

const JobDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Tutorin . Jobs</title>
        <meta name="description" content="Tutorin jobs page" />
      </Helmet>
      <JobDetail />
    </>
  );
};

export default JobDetailPage;
