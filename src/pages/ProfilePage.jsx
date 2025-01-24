import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { profileFormSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/pages/profile.scss";
import FormSecurity from "../component/profile/FormSecurity";
import FormUploadResume from "../component/profile/FormUploadResume";
import { useModalStore } from "../store/modal";
import { useProfileStore } from "../store/profile";
import FormProfile from "../component/profile/FormProfile";
import TabProfile from "../component/profile/TabProfile";

const ProfilePage = () => {
  const { openModal } = useModalStore();
  const [activeTab, setActiveTab] = useState(1);
  const {
    name,
    username,
    email,
    phone,
    address,
    city,
    country,
    postcode,
    image,
    updateProfile,
    loading,
  } = useProfileStore();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", name);
    setValue("username", username);
    setValue("email", email);
    setValue("phone", phone);
    setValue("address", address);
    setValue("city", city);
    setValue("country", country);
    setValue("postcode", postcode);
  }, [
    name,
    username,
    email,
    phone,
    address,
    city,
    country,
    postcode,
    setValue,
  ]);

  const handleUpdate = async (data) => {
    updateProfile(data, setError);
  };

  const handleImage = () => {
    openModal("Image", "Upload", "Big");
  };

  const tabs = [
    {
      id: 1,
      label: "Profile",
      component: (
        <FormProfile
          control={control}
          errors={errors}
          loading={loading}
          handleSubmit={handleSubmit}
          onSubmit={handleUpdate}
          setValue={setValue}
        />
      ),
    },
    {
      id: 2,
      label: "Security",
      component: <FormSecurity />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${name}`}</title>
        <meta name="description" content="Profile page" />
      </Helmet>
      <div className="ml-16 lg:ml-[210px] h-screen xl:px-3">
        <div className=" bg-white mt-0 pb-5 lg:mb-0 px-1 xl:px-3 lg:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-[35%,30%,30%] xl:grid-cols-3 gap-0 md:gap-3 xl:gap-[2rem] md:h-screen">
            <div className="flex flex-col items-center text-center  md:px-3 xl:px-0 border-r-none md:border-r-2 border-black md:pt-12">
              <img
                onClick={handleImage}
                className="rounded-full mt-5 w-56 h-56 xl:w-72 xl:h-72 cursor-pointer"
                src={`${image}?timestamp=${new Date().getTime()}`}
                alt="Profile"
              />
              <FormUploadResume />
            </div>
            <div className="md:col-span-2 px-2 md:px-0 mt-4">
              <TabProfile setActiveTab={setActiveTab} activeTab={activeTab} />
              <div className="tabs">
                {tabs.map((tab) => (
                  <div key={tab.id} className="tab">
                    <input
                      type="radio"
                      name="tabs"
                      id={`tab${tab.id}`}
                      checked={activeTab === tab.id}
                      onChange={() => setActiveTab(tab.id)}
                    />
                    <div className="note-height">
                      <div className="note-wrap">{tab.component}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
