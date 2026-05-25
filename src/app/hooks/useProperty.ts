import { useState, useCallback } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import * as yup from "yup";

export const propertySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  type: yup.string().required("Property type is required"),
  bedrooms: yup.number().min(0).required("Bedrooms are required"),
  bathrooms: yup.number().min(0).required("Bathrooms are required"),
  sqft: yup.number().positive("Square footage must be positive").required("Square footage is required"),
  description: yup.string().required("Description is required"),
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup.string().email("Invalid email").required("Owner email is required"),
  ownerPhone: yup.string().required("Owner phone is required"),
  ownerWhatsapp: yup.string().optional(),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  description: string;
  imageUrl: string;
  imageUrls: string[];
  ownerName: string;
  ownerPhone: string | null;
  ownerEmail: string | null;
  ownerPhoto: string | null;
  ownerWhatsapp: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function useProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProperties = useCallback(async (type?: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/properties", {
        params: type ? { type } : undefined
      });
      if (res.data.success) {
        setProperties(res.data.data);
        return res.data.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch properties:", error);
      toast.error(error.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProperty = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/properties/${id}`);
      if (res.data.success) {
        setProperty(res.data.data);
        return res.data.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch property:", error);
      toast.error(error.response?.data?.message || "Failed to fetch property");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = async (formData: FormData) => {
    setLoading(true);
    try {
      // POST requires multipart/form-data for image uploads
      const res = await axiosInstance.post("/properties", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        toast.success("Property created successfully!");
        await fetchProperties(); // Refresh the list
        return res.data.data;
      }
    } catch (error: any) {
      console.error("Failed to create property:", error);
      toast.error(error.response?.data?.message || "Failed to create property");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id: string, data: Partial<Property> | FormData) => {
    // Optimistic update for immediate UI feedback (only if it's a simple JSON object)
    if (!(data instanceof FormData)) {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    }
    
    setLoading(true);
    try {
      const isFormData = data instanceof FormData;
      const res = await axiosInstance.put(`/properties/${id}`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
      });
      if (res.data.success) {
        toast.success("Property updated successfully!");
        setProperty(res.data.data);
        // Sync exact server response
        setProperties(prev => prev.map(p => p.id === id ? { ...p, ...res.data.data } : p));
        return res.data.data;
      }
    } catch (error: any) {
      console.error("Failed to update property:", error);
      toast.error(error.response?.data?.message || "Failed to update property");
      // Revert optimistic update by refetching
      fetchProperties();
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/properties/${id}`);
      if (res.data.success) {
        toast.success("Property deleted successfully!");
        setProperties(prev => prev.filter(p => p.id !== id));
        return true;
      }
    } catch (error: any) {
      console.error("Failed to delete property:", error);
      toast.error(error.response?.data?.message || "Failed to delete property");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    property,
    loading,
    fetchProperties,
    fetchProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    setProperties,
    setProperty
  };
}