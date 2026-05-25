"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, User } from "lucide-react";
import useAuth, { profileSchema, ProfileFormData } from "@/app/hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { admin, updateProfile } = useAuth();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      avatar: ""
    }
  });

  const currentAvatar = watch("avatar");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Auto-populate form when admin data loads
  useEffect(() => {
    if (admin) {
      reset({
        name: admin.name || "",
        phone: admin.phone || "",
        whatsapp: admin.whatsapp || "",
        avatar: admin.avatar || "",
      });
    }
  }, [admin, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setValue("avatar", URL.createObjectURL(file), { shouldDirty: true });
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.whatsapp) formData.append("whatsapp", data.whatsapp);
    
    if (avatarFile) {
      formData.append("avatarFile", avatarFile);
    } else if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    await updateProfile(formData);
    setIsLoading(false);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading text-blue-900 font-medium mb-2">Account Settings</h1>
        <p className="text-slate-500 text-xs">Manage your admin profile and contact information.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 space-y-8">
        
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
          <div className="relative group cursor-pointer">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm bg-slate-100 flex items-center justify-center">
              {currentAvatar ? (
                <img src={currentAvatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-slate-400" />
              )}
            </div>
            <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="h-6 w-6 text-white" />
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-normal text-slate-900">Profile Picture</h3>
            <p className="text-xs text-slate-500 mt-1">Upload a new avatar. Recommended size is 256x256px.</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-slate-900">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name
              </Label>
              <Input 
                id="name" 
                placeholder="e.g. John Doe" 
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address
              </Label>
              <Input 
                id="email" 
                type="email"
                value={admin?.email || ""} 
                placeholder="e.g. admin@example.com" 
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number
              </Label>
              <Input 
                id="phone" 
                placeholder="e.g. +1 (555) 000-0000" 
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">
                WhatsApp Number
              </Label>
              <Input 
                id="whatsapp" 
                placeholder="e.g. +250 ***-***-****" 
                {...register("whatsapp")}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
          <Button type="submit" disabled={isLoading} variant="default">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
