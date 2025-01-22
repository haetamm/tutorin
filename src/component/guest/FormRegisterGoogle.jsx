import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormWithGoogleSchema } from "../../utils/validation";
import SelectInput from "../create-job/SelectInput";
import FormInput from "../create-job/FormInput";
import useUserStore from "../../store/user";
import { useModalStore } from "../../store/modal";
import { roleOptions } from "../../utils/select-options";

const FormRegisterGoogle = () => {
  const { username, tokenAccess, loading, registerUserWithGoogle } =
    useUserStore();
  const { closeModal } = useModalStore();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerFormWithGoogleSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    registerUserWithGoogle(
      {
        ...data,
        tokenAccess,
      },
      setError,
      closeModal,
      reset
    );
  };

  const fetchUserSet = useCallback(() => {
    reset({
      username: username || "",
    });
  }, [username, reset]);

  useEffect(() => {
    fetchUserSet();
  }, [fetchUserSet]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="text-2xl font-semibold leading-6 text-gray-900"
          id="modal-title"
        >
          Create Account
        </div>
        <div className="my-2">
          <FormInput
            name="username"
            control={control}
            placeholder="Username"
            errors={errors}
          />
        </div>
        <div className="my-1"></div>
        <SelectInput
          name="role"
          control={control}
          options={roleOptions}
          placeholder="Select Role"
          errors={errors}
        />
        <button
          type="submit"
          className="w-full block disabled:cursor-not-allowed bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 text-white font-semibold rounded-lg px-4 py-3 mt-1"
          disabled={loading || !isValid}
        >
          {loading ? "Loading..." : "Confirm"}
        </button>
      </form>
    </>
  );
};

export default FormRegisterGoogle;
