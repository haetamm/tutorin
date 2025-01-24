import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobFormSchema } from "../utils/validation.js";
import "../styles/pages/create-job.scss";
import { Helmet } from "react-helmet-async";
import FormCreateJob from "../component/create-job/FormCreateJob.jsx";
import { useProfileStore } from "../store/profile.js";
import { useNotificationStore } from "../store/notification.js";

const CreateJobPage = () => {
  const { loading, createJob } = useNotificationStore();
  const { name } = useProfileStore();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(createJobFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      subject: "",
      gender: "",
      education: "",
      deadline: "",
      address: "",
      city: "",
      country: "",
      description: "",
      currency: "",
      amount: "",
      frequency: "",
    },
  });

  const onSubmit = async (data) => {
    await createJob(data, setError, reset);
  };

  return (
    <>
      <Helmet>
        <title>Create Request tutor | {name}</title>
        <meta name="description" content="Request tutor page" />
      </Helmet>
      <div className="ml-16 lg:ml-[210px] p-3 pt-[20px]">
        <div className="work-form w-full">
          <div className="header h-[48px] flex items-center">
            <div className="mr-2 header-title">Create Request Tutor</div>
          </div>
          <FormCreateJob
            control={control}
            errors={errors}
            loading={loading}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  );
};

export default CreateJobPage;
