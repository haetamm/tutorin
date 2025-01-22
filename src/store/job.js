import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";

export const useJobStore = create((set) => ({
  currentPage: parseInt(sessionStorage.getItem("currentPage")) || 1,
  loading: false,
  loadingJobDetail: false,
  error: null,
  jobs: [],
  job: null,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
  totalElements: 0,
  size: 0,

  fetchJob: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const currentPage =
        page || parseInt(sessionStorage.getItem("currentPage")) || 1;
      const { data: response } = await axiosInstance.get(
        `/jobs?page=${currentPage}`
      );
      const { data: jobs, paginationResponse } = response;
      set({
        jobs,
        totalPages: paginationResponse.totalPages,
        hasNext: paginationResponse.hasNext,
        hasPrevious: paginationResponse.hasPrevious,
        totalElements: paginationResponse.totalElements,
        size: paginationResponse.size,
        currentPage: paginationResponse.page,
      });
      sessionStorage.setItem("currentPage", paginationResponse.page);
    } catch (error) {
      handleFormErrors(error, null);
    } finally {
      set({ loading: false });
    }
  },

  fetchJobById: async (id) => {
    if (id) {
      set({ loadingJobDetail: true, error: null });
      try {
        const { data: response } = await axiosInstance.get(`/jobs/${id}`);
        console.log(response);
        const { data: job } = response;
        set({ job: job });
      } catch (error) {
        handleFormErrors(error, null);
      } finally {
        set({ loadingJobDetail: false });
      }
    }
  },

  applyJobById: async (jobId) => {
    if (jobId) {
      set({ loadingJobDetail: true, error: null });
      try {
        const { data: response } = await axiosInstance.post(`/applications`, {
          jobId,
        });
        const { data: job } = response;
        set({ job: job });
      } catch (error) {
        handleFormErrors(error, null);
      } finally {
        set({ loadingJobDetail: false });
      }
    }
  },

  removeJob: () => {
    set({ job: null });
  },
}));
