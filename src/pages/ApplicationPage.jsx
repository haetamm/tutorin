import React, { useEffect } from "react";
import Loader from "../component/Loader";
import { Helmet } from "react-helmet-async";
import CardApplication from "../component/application/CardApplication";
import { useProfileStore } from "../store/profile";
import { useApplicationStore } from "../store/applications";

const ApplicationPage = () => {
  const { loading, fetchApplication, applications } = useApplicationStore();
  const { name } = useProfileStore();

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return (
    <>
      <Helmet>
        <title>Applications | {name}</title>
        <meta name="description" content="Applications page" />
      </Helmet>
      <div className="ml-16 lg:ml-[210px] mb-5">
        <div className="container h-full mx-auto px-0  flex flex-col">
          <h1 className="p-4 bg-white text-2xl font-bold">Application</h1>
          <div className="flex flex-grow overflow-hidden">
            <div className="flex flex-col gap-4 p-2 w-full font-normal">
              {applications.length === 0 ? (
                loading ? (
                  <Loader />
                ) : (
                  <div className="text-center text-xl p-4 font-bold">
                    Application not found
                  </div>
                )
              ) : (
                applications.map((job, index) => (
                  <CardApplication key={index} job={job} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
