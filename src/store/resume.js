import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";

export const useResumeStore = create((set) => ({
  loading: false,

  updateResume: async (data, setError) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/user/resume", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Your resume successfully updated");
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  getResume: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/user/${id}/resume`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      handleFormErrors(error);
      console.error("Error fetching resume:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
