import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ListNotfication from "../component/notification/ListNotification";
import { useProfileStore } from "../store/profile";

const NotificationPage = () => {
  const { name } = useProfileStore();

  return (
    <>
      <Helmet>
        <title>Notifications | {name}</title>
        <meta name="description" content="Notifications page" />
      </Helmet>
      <div className="h-screen">
        <div className="ml-16 lg:ml-[210px]">
          <div className="flex">
            <div className="w-full lg:w-[30%] overflow-auto">
              <div className="flex-1 overflow-auto border-black border-r-2">
                <div className="flex flex-col h-screen w-full">
                  <h1 className="p-4 bg-white text-2xl font-bold">
                    Notifications
                  </h1>
                  <div className="bg-white p-4 mb-2 shadow-md">
                    <input
                      type="text"
                      placeholder="Search request"
                      className="text-input-box text-input-box-filled border-2 w-full h-10 px-3"
                    />
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <ListNotfication />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-[70%] font-normal">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
