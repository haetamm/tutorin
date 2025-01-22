import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { resumeFormShema } from "../../utils/validation";
import { roles } from "../../utils/constans";
import useUserStore from "../../store/user";
import { useProfileStore } from "../../store/profile";
import { useResumeStore } from "../../store/resume";

const FormUploadResume = () => {
  const { name, resume } = useProfileStore();
  const { updateResume, getResume, loading } = useResumeStore();
  const { role } = useUserStore();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeFormShema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await updateResume(data, setError);
    reset();
  };

  const handleDownloadResume = async (id) => {
    await getResume(id);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const renamedFile = new File([file], `${name}.pdf`, { type: file.type });
      setValue("resume", renamedFile);
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      {role === roles.TUTOR && (
        <div className="mt-10 w-full flex gap-1 xl:gap-2 px-2 md:px-0 xl:px-5">
          <button
            onClick={() => (resume ? handleDownloadResume(resume?.id) : null)}
            disabled={!resume | loading}
            className={` ${
              resume ? "hover:underline" : ""
            } w-[70%] h-[48px] text-start font-normal text-sm md:text-md xl:text-lg text-black p-2 border border-gray-300 rounded `}
          >
            {loading
              ? "Loading"
              : resume
              ? resume.name.substr(13)
              : "Upload your resume"}
          </button>

          <Controller
            name="resume"
            control={control}
            defaultValue={null}
            render={() => (
              <div className="w-[30%]">
                <input
                  id="fileInput"
                  className="hidden"
                  type="file"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => document.getElementById("fileInput").click()}
                  className="w-full h-[48px] bg-blue-500 text-white text-sm md:text-md xl:text-lg p-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-600"
                >
                  {loading ? "Loading" : resume ? "Update" : "Upload"}
                </button>
                {errors.resume && (
                  <small className="font-normal text-red-500 inline-block">
                    {errors.resume.message}
                  </small>
                )}
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default FormUploadResume;
