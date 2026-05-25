import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().optional(),
  whatsapp: yup.string().optional(),
  avatar: yup.string().optional(),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;

export interface Admin {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  whatsapp: string | null;
  avatar: string | null;
}

export default function useAuth() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        
        if (res.data.success && res.data.admin) {
          setAdmin(res.data.admin);
        } else {
          setAdmin(null);
        }
      } catch (error) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAdmin(null);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const login = async (data: LoginFormData) => {
    setIsLoggingIn(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.success) {
        setAdmin(res.data.data);
        toast.success("Logged in successfully");
        router.push("/portal");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const updateProfile = async (data: ProfileFormData) => {
    try {
      const res = await axiosInstance.post("/auth/update-profile", data);
      if (res.data.success) {
        setAdmin(res.data.admin);
        toast.success("Profile updated successfully");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Profile update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
      return false;
    }
  };

  return { admin, loading, isLoggingIn, login, logout, updateProfile, setAdmin };
}