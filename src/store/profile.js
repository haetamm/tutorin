import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";
import { dataURLtoBlob } from "../utils/helper";

export const useProfileStore = create((set) => ({
  name: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postcode: "",
  image: null,
  resume: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get("profile");
      const { data: user } = response;
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
        resume,
      } = user;
      set({
        name,
        username,
        email,
        phone,
        address,
        city,
        country,
        postcode,
        image: image
          ? `${import.meta.env.VITE_API_BASE_URL}user/${image.id}/images`
          : `https://ui-avatars.com/api/?name=${name}&background=random`,
        resume,
      });
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data, setError) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.put("/profile", data);
      const { data: updatedProfile } = response;

      const { name, username, email, phone, address, city, country, postcode } =
        updatedProfile;

      set({
        name,
        username,
        email,
        phone,
        address,
        city,
        country,
        postcode,
      });
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  updateImage: async (cropData, closeModal) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      if (cropData) {
        const blob = dataURLtoBlob(cropData);
        formData.append("image", blob, "profile.png");
      }

      const { data: response } = await axiosInstance.post(
        "/user/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data: updatedImage } = response;

      set({
        image: `${import.meta.env.VITE_API_BASE_URL}user/${
          updatedImage.id
        }/images`,
      });

      toast.success("Foto profil berhasil diunggah.");
      closeModal();
    } catch (error) {
      handleFormErrors(error);
    } finally {
      set({ loading: false });
    }
  },

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
