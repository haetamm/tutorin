import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";

export const usePasswordStore = create((set) => ({
  loading: false,
  error: null,

  updatePassword: async (data, setError, reset) => {
    set({ loading: true, error: null });
    try {
      const { data: responese } = await axiosInstance.post(
        "/user/secure",
        data
      );
      toast.success(responese.data);
      reset();
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (data, setError, token, reset) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post(
        `/auth/reset-password?token=${token}`,
        data
      );
      const { data: result } = response;
      toast.success(result);
      reset();
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  forgotPassword: async (data, setError, reset) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post(
        "/auth/forgot-password",
        data
      );
      const { data: result } = response;
      toast.success(result);
      reset();
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },
}));
