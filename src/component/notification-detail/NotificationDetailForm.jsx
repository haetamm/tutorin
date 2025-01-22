import React from "react";
import { useNotificationStore } from "../../store/notification";

const NotificationDetailForm = () => {
  const { job } = useNotificationStore();
  return (
    <>
      <form className="p-2">
        <div className="p-2 w-full h-[5rem] border-t">
          <textarea
            id="editor"
            className="w-full h-full px-4 py-2 border-2 outline-none"
          />
        </div>
        <div className="p-2 flex text-white gap-1">
          <select
            className={` bg-blue-500 text-black p-1 mb-1 mt-0 w-full sm:w-32 outline-none`}
          >
            <option value="">Select Tutor</option>
            {job.tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.name}>
                {tutor.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 p-1 mb-1 mt-0 w-full sm:w-32 sm:ml-auto"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default NotificationDetailForm;
