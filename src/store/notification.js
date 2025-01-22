import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";
import { formatNumber } from "../utils/helper";

export const useNotificationStore = create((set) => ({
  loading: false,
  error: null,
  jobs: [],
  job: null,
  loadingResume: false,
  tutors: [],
  loadingStatus: false,

  createJob: async (data, setError, reset) => {
    set({ loading: true, error: null });
    try {
      const formattedAmount = formatNumber(Number(data.amount));
      const salary = `${data.currency} ${formattedAmount} ${data.frequency}`;
      const formData = {
        ...data,
        salary,
      };
      await axiosInstance.post("/jobs", formData);
      toast.success("Tutor request successful");
      reset();
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  fetchJob: async () => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get("/notifications");
      const { data: jobs } = response;
      set({ jobs: jobs });
    } catch (error) {
      handleFormErrors(error, null);
    } finally {
      set({ loading: false });
    }
  },

  fetchJobById: async (id) => {
    if (id) {
      set({ loading: true, error: null });
      try {
        const { data: response } = await axiosInstance.get(
          `/notifications/${id}`
        );
        const { data: job } = response;

        const tutors = job.tutors.map((tutor) => {
          const timestamp = new Date().getTime();
          const imageUrl = tutor.image
            ? `${import.meta.env.VITE_API_BASE_URL}user/${
                tutor.image.id
              }/images?timestamp=${timestamp}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                tutor.name
              )}&background=random`;

          return {
            ...tutor,
            imageUrl,
          };
        });

        set({ job: job, tutors: tutors });
      } catch (error) {
        handleFormErrors(error, null);
      } finally {
        set({ loading: false });
      }
    }
  },

  updateStatusJob: async (id, newStatus, tutorId) => {
    set({ loadingStatus: true, error: null });
    try {
      const updateData = {
        jobId: id,
        tutorId,
        status: newStatus,
      };

      const { data: response } = await axiosInstance.put(
        `/applications`,
        updateData
      );
      const { data: result } = response;
      set((state) => ({
        tutors: state.tutors.map((tutor) =>
          tutor.id === result.tutorId ? { ...tutor, status: newStatus } : tutor
        ),
      }));
      toast.success(`Process ${newStatus} successfully.`);
    } catch (error) {
      handleFormErrors(error, null);
    } finally {
      set({ loadingStatus: false });
    }
  },

  getResume: async (id, tutorId, jobId) => {
    set({ loadingResume: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/user/${id}/resume?jobId=${jobId}&tutorId=${tutorId}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      handleFormErrors(error, null);
    } finally {
      set({ loadingResume: false });
    }
  },

  removeJob: () => {
    set({ job: null });
  },
}));
