import React, { useEffect } from "react";
import { useModalStore } from "../store/modal";
import FormRegisterGoogle from "./guest/FormRegisterGoogle";
import LogoutModalComp from "./LogoutModalComp";
import CropImage from "./profile/CropImage";
import "cropperjs/dist/cropper.css";
import useUserStore from "../store/user";
import NotificationDetail from "./notification/NotificationDetail";
import { useMediaQuery } from "react-responsive";
import JobDetail from "./job-detail/JobDetail";

const Modal = () => {
  const { isOpen, content, confirmLabel, type, closeModal } = useModalStore();
  const { logout } = useUserStore();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const confirmHandle = () => {
    logout(closeModal);
  };

  useEffect(() => {
    if (content === "NotifDetail" && !isMobile) {
      closeModal();
    }
    if (content === "JobDetail" && !isMobile) {
      closeModal();
    }
  }, [closeModal, content, isMobile]);

  return (
    <>
      {isOpen && (
        <div
          className={`
            ${
              type === "Small"
                ? "xs:pt-0"
                : type === "Big"
                ? "xs:pt-36"
                : "pt-0"
            } 
            fixed inset-0 z-10 pt-0  lg:pt-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto
          `}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`${
              type === "Small"
                ? "sm:max-w-lg md:w-full mx-4 my-8 mt-16 rounded-lg"
                : type === "Big"
                ? "w-full lg:w-[80%] xl:w-[900px] mx-4 my-8 mt-16 rounded-lg"
                : "w-full"
            } 
              relative bg-white  shadow-xl `}
          >
            <div
              className={` ${
                content !== "NotifDetail" && content !== "JobDetail"
                  ? "pt-3 sm:p-6 sm:pb-4 "
                  : ""
              }bg-white md:pb-0 rounded-lg`}
            >
              {content === "Logout" && <LogoutModalComp />}
              {content === "Register" && <FormRegisterGoogle />}
              {content === "Image" && <CropImage />}
              {content === "NotifDetail" && <NotificationDetail />}
              {content === "JobDetail" && <JobDetail />}
            </div>
            {content !== "NotifDetail" && content !== "JobDetail" && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-lg">
                {content === "Logout" && (
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={confirmHandle}
                  >
                    {confirmLabel || "Confirm"}
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
