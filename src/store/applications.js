import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";

export const useApplicationStore = create((set) => ({
  applications: [],
  loading: false,

  fetchApplication: async () => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get("/applications");
      const { data: jobs } = response;
      set({ applications: jobs });
    } catch (error) {
      handleFormErrors(error, null);
    } finally {
      set({ loading: false });
    }
  },
}));
