import Cookies from "js-cookie";
import { create } from "zustand";
import axiosInstance from "../utils/api";
import { handleFormErrors } from "../utils/error-handling";
import { toast } from "sonner";
import { urlPage } from "../utils/constans";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("token");
let decodedToken = {};
let role = "";

if (token) {
  try {
    decodedToken = jwtDecode(token);
    role = decodedToken ? decodedToken.roles[0] : "";
  } catch (e) {
    console.error("Invalid token", e);
  }
}

const useUserStore = create((set) => ({
  role,
  token: token || "",
  username: "",
  tokenAccess: "",
  loading: false,

  logout: (closeModal) => {
    Cookies.remove("token");
    set({
      role: null,
      token: "",
      username: "",
      tokenAccess: "",
    });
    closeModal();
  },

  loginUser: async (data, setError) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post("auth/login", data);
      const { data: user } = response;
      const { token } = user;
      Cookies.set("token", token, { expires: 7 });
      set({ token });
      toast.success("Login successfully");
      window.location.assign(urlPage.STUDENT);
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },

  loginUserWithGoogle: async (code, scope, openModal) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.get("/auth/socialite", {
        params: { code, scope },
      });
      const { data: user } = response;
      const { token, tokenAccess, username } = user;

      if (token) {
        Cookies.set("token", token, { expires: 7 });
        set({ token });
        toast.success("Login successful");
        window.location.assign(urlPage.STUDENT);
      } else {
        set({ tokenAccess, username });
        openModal("Register", "Confirm", "Small");
      }
    } catch (error) {
      toast.error("Failed to login with Google");
    } finally {
      set({ loading: false });
    }
  },

  registerUserWithGoogle: async (data, setError, closeModal, reset) => {
    set({ loading: true, error: null });
    try {
      const { data: response } = await axiosInstance.post(
        "/auth/register/with-google",
        data
      );
      const { data: user } = response;
      const { token } = user;

      Cookies.set("token", token, { expires: 7 });
      set({ token });
      set({ username: "", tokenAccess: "" });
      closeModal();
      reset();
      window.location.assign(urlPage.STUDENT);
      toast.success("Login successful");
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
