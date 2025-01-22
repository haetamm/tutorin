import React from "react";
import { CiWarning } from "react-icons/ci";

const LogoutModalComp = () => {
  return (
    <>
      <div className="sm:flex sm:items-start mb-4 px-3">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 ">
          <CiWarning className="h-6 w-6 text-red-400" />
        </div>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <div
            className="text-base font-semibold leading-6 text-gray-900"
            id="modal-title"
          >
            Log out of Tutorin?
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              You can always log back in any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModalComp;
