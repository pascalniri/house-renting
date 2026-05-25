"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Property } from "@/data/properties";
import { X } from "lucide-react";

interface PropertyFormProps {
  initialData?: Property;
  isEditing?: boolean;
}

const ADMIN_INFO = {
  name: "Admin User",
  email: "admin@estates.com",
  phone: "+250 788 000 000",
  whatsapp: "+250 788 000 000",
};

export function PropertyForm({
  initialData,
  isEditing = false,
}: PropertyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [useAdminInfo, setUseAdminInfo] = useState(false);

  const [ownerName, setOwnerName] = useState(initialData?.owner?.name || "");
  const [ownerEmail, setOwnerEmail] = useState(initialData?.owner?.email || "");
  const [ownerPhone, setOwnerPhone] = useState(initialData?.owner?.phone || "");
  const [ownerWhatsapp, setOwnerWhatsapp] = useState("");

  const [images, setImages] = useState<string[]>(
    initialData?.imageUrls ||
      (initialData?.imageUrl ? [initialData.imageUrl] : []),
  );

  useEffect(() => {
    if (useAdminInfo) {
      setOwnerName(ADMIN_INFO.name);
      setOwnerEmail(ADMIN_INFO.email);
      setOwnerPhone(ADMIN_INFO.phone);
      setOwnerWhatsapp(ADMIN_INFO.whatsapp);
    } else if (!isEditing) {
      setOwnerName("");
      setOwnerEmail("");
      setOwnerPhone("");
      setOwnerWhatsapp("");
    }
  }, [useAdminInfo, isEditing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setImages((prev) => [...prev, ...newImages]);

    // Reset file input so the same files can be selected again if removed
    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/portal/properties");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
                defaultValue={initialData?.title}
                placeholder="e.g. Modern Minimalist Villa"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                defaultValue={initialData?.location}
                placeholder="e.g. Kigali, Rwanda"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (Rwf)</Label>
              <Input
                id="price"
                type="number"
                defaultValue={initialData?.price}
                placeholder="e.g. 3500000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select defaultValue={initialData?.type || "House"}>
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
                defaultValue={initialData?.bedrooms}
                placeholder="e.g. 4"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                step="0.5"
                defaultValue={initialData?.bathrooms}
                placeholder="e.g. 2.5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                defaultValue={initialData?.sqft}
                placeholder="e.g. 2500"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            required
            defaultValue={initialData?.description}
            placeholder="Describe the property in detail..."
            className="flex min-h-[120px] w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-3 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
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
                required={!isEditing && images.length === 0}
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
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Email Address</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="e.g. sarah@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Phone Number</Label>
              <Input
                id="ownerPhone"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerWhatsapp">WhatsApp Number</Label>
              <Input
                id="ownerWhatsapp"
                value={ownerWhatsapp}
                onChange={(e) => setOwnerWhatsapp(e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
              />
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
