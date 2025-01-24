import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CardApplication from "../component/application/CardApplication";
import { useProfileStore } from "../store/profile";
import { useApplicationStore } from "../store/applications";
import Load from "../component/Load";

const ApplicationPage = () => {
  const { fetchApplication, loading, applications } = useApplicationStore();
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
      <div className="ml-16 lg:ml-[210px] mb-5 xl:px-3 ">
        <div className=" h-full mx-auto px-0  flex flex-col">
          <h1 className="p-4 bg-white text-2xl font-bold">Application</h1>
          <div className="flex flex-grow overflow-hidden ">
            <div className="flex flex-col gap-4 p-2 w-full font-normal">
              {loading ? (
                <Load />
              ) : applications.length === 0 ? (
                <div className="bg-slate-200 px-6 py-6 h-[calc(100vh-100px)] md:h-[calc(100vh-160px)] rounded-2xl flex justify-center items-center">
                  <div className="text-center text-3xl md:text-4xl px-2 font-bold">
                    Application Not Found
                  </div>
                </div>
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
