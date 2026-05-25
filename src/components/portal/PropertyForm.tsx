"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import useProperty, { propertySchema, PropertyFormData, Property } from "@/app/hooks/useProperty";
import useAuth from "@/app/hooks/useAuth";

interface PropertyFormProps {
  initialData?: Property;
  isEditing?: boolean;
}

export function PropertyForm({
  initialData,
  isEditing = false,
}: PropertyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [useAdminInfo, setUseAdminInfo] = useState(false);
  const { createProperty, updateProperty } = useProperty();
  const { admin } = useAuth();

  const [images, setImages] = useState<string[]>(
    initialData?.imageUrls ||
      (initialData?.imageUrl ? [initialData.imageUrl] : []),
  );

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || "",
      location: initialData?.location || "",
      price: initialData?.price || 0,
      type: initialData?.type || "House",
      bedrooms: initialData?.bedrooms || 0,
      bathrooms: initialData?.bathrooms || 0,
      sqft: initialData?.sqft || 0,
      description: initialData?.description || "",
      ownerName: initialData?.ownerName || "",
      ownerEmail: initialData?.ownerEmail || "",
      ownerPhone: initialData?.ownerPhone || "",
      ownerWhatsapp: initialData?.ownerWhatsapp || "",
    },
  });

  useEffect(() => {
    if (useAdminInfo && admin) {
      setValue("ownerName", admin.name || "", { shouldValidate: true });
      setValue("ownerEmail", admin.email || "", { shouldValidate: true });
      setValue("ownerPhone", admin.phone || "", { shouldValidate: true });
      setValue("ownerWhatsapp", admin.whatsapp || "");
    } else if (!isEditing) {
      setValue("ownerName", "");
      setValue("ownerEmail", "");
      setValue("ownerPhone", "");
      setValue("ownerWhatsapp", "");
    }
  }, [useAdminInfo, isEditing, admin, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFilesArray = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFilesArray]);

    const newImages = newFilesArray.map((file) =>
      URL.createObjectURL(file),
    );
    setImages((prev) => [...prev, ...newImages]);

    // Reset file input so the same files can be selected again if removed
    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    
    // Append actual file objects
    imageFiles.forEach(file => {
      formData.append("images", file);
    });

    if (isEditing && initialData) {
      // Handle array conversion for put if needed, but for now just send JSON
      const success = await updateProperty(initialData.id, data);
      if (success) router.push("/portal/properties");
    } else {
      const success = await createProperty(formData);
      if (success) router.push("/portal/properties");
    }
    
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-heading text-slate-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                placeholder="e.g. Modern Minimalist Villa"
                {...register("title")}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Kigali, Rwanda"
                {...register("location")}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (Rwf)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 3500000"
                {...register("price")}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-heading text-slate-900 mb-4">Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="e.g. 4"
                {...register("bedrooms")}
              />
              {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                step="0.5"
                placeholder="e.g. 2.5"
                {...register("bathrooms")}
              />
              {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                placeholder="e.g. 2500"
                {...register("sqft")}
              />
              {errors.sqft && <p className="text-red-500 text-xs mt-1">{errors.sqft.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            placeholder="Describe the property in detail..."
            {...register("description")}
            className="flex min-h-[120px] w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-3 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <h2 className="text-xl font-heading text-slate-900 mb-4">Media</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Upload Property Images</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                multiple
                className="cursor-pointer file:cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group"
                  >
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white/90 text-slate-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-slate-900">
              Owner Information
            </h2>
            <div className="flex items-center gap-2">
              <Switch
                checked={useAdminInfo}
                onCheckedChange={setUseAdminInfo}
                id="useAdminInfo"
              />
              <Label
                htmlFor="useAdminInfo"
                className="text-xs font-medium text-slate-600 cursor-pointer"
              >
                Use Admin Information
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                placeholder="e.g. Sarah Jenkins"
                {...register("ownerName")}
              />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Email Address</Label>
              <Input
                id="ownerEmail"
                type="email"
                placeholder="e.g. sarah@example.com"
                {...register("ownerEmail")}
              />
              {errors.ownerEmail && <p className="text-red-500 text-xs mt-1">{errors.ownerEmail.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Phone Number</Label>
              <Input
                id="ownerPhone"
                placeholder="e.g. +1 (555) 123-4567"
                {...register("ownerPhone")}
              />
              {errors.ownerPhone && <p className="text-red-500 text-xs mt-1">{errors.ownerPhone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerWhatsapp">WhatsApp Number</Label>
              <Input
                id="ownerWhatsapp"
                placeholder="e.g. +1 (555) 123-4567"
                {...register("ownerWhatsapp")}
              />
              {errors.ownerWhatsapp && <p className="text-red-500 text-xs mt-1">{errors.ownerWhatsapp.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/portal/properties")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} variant="default">
          {isLoading
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Publish Property"}
        </Button>
      </div>
    </form>
  );
}
