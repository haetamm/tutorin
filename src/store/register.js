import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";
import { urlPage } from "../utils/constans";

export const useRegisterStore = create((set) => ({
  loading: false,

  registerUser: async (path, data, setError, navigate, reset) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post(
        `/auth/register/${path}`,
        data
      );
      const { data: user } = response;
      toast.success(
        `Registration process successful, please log in, ${user.name}`
      );
      reset();
      navigate(urlPage.LOGIN);
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },
}));
