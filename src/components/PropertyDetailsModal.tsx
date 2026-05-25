"use client";

import { useState, useEffect } from "react";
import { Property } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  X,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetailsModal({
  property,
  isOpen,
  onClose,
}: PropertyDetailsModalProps) {
  const [activeImage, setActiveImage] = useState(property?.imageUrl);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    if (property && isOpen) {
      setActiveImage(property.imageUrl);
    }
  }, [property, isOpen]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!property || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] dark:from-slate-900 dark:to-slate-950 border-none rounded-2xl md:rounded-3xl flex flex-col md:flex-row shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md rounded-full text-slate-700 dark:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Images */}
        <div className="relative w-full md:w-1/2 h-[45%] md:h-full shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800 bg-slate-100/30 z-10">
          <div className="relative flex-1 w-full shrink-0 min-h-0">
            <Image
              src={activeImage || property.imageUrl}
              alt={property.title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1200px) 100vw, 800px"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge
                variant="secondary"
                className="shadow-md bg-white/95 text-slate-800 backdrop-blur-md"
              >
                {property.type}
              </Badge>
              <Badge className="bg-blue-800 hover:bg-blue-700 text-white shadow-md">
                ${property.price.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Thumbnails */}
          {property.imageUrls && property.imageUrls.length > 1 && (
            <div className="h-24 sm:h-28 overflow-x-auto p-3 sm:p-4 shrink-0 flex gap-3 snap-x bg-white/60 backdrop-blur-md border-t border-slate-200/50">
              {property.imageUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(url)}
                  className={`relative h-full w-24 sm:w-28 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer snap-start ${
                    activeImage === url
                      ? "border-blue-600 ring-2 ring-blue-600/20 shadow-sm"
                      : "border-transparent hover:opacity-80"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${property.title} - view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Property Details */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full z-10 flex flex-col relative p-4 md:p-6 lg:p-8 bg-[#f8fafc] dark:bg-slate-950">
          {/* Hero-style Inner Card */}
          <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] rounded-xl">
            {/* Dashed Top Fade Grid */}
            <div
              className="absolute inset-0 z-0 opacity-10 pointer-events-none -top-1"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #94a3b8 1px, transparent 1px),
                  linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
              }}
            />

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 relative z-10 flex flex-col">
              <div className="mb-6 text-left">
                <h2 className="text-2xl font-normal text-slate-900 dark:text-slate-100 pr-4">
                  {property.title}
                </h2>
                <div className="flex items-center text-xs gap-1 text-slate-500 dark:text-slate-400 mt-2">
                  <MapPin size={12} className="shrink-0 text-blue-800" />
                  {property.location}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-400 mb-8 py-5 border-y border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                  <Bed
                    size={18}
                    className="text-blue-800 dark:text-blue-400"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs">
                    <span className="text-slate-900 dark:text-slate-100 font-medium">
                      {property.bedrooms}
                    </span>{" "}
                    Beds
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Bath
                    size={18}
                    className="text-blue-800 dark:text-blue-400"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs">
                    <span className="text-slate-900 dark:text-slate-100 font-medium">
                      {property.bathrooms}
                    </span>{" "}
                    Baths
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Square
                    size={18}
                    className="text-blue-800 dark:text-blue-400"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs">
                    <span className="text-slate-900 dark:text-slate-100 font-medium">
                      {property.sqft.toLocaleString()}
                    </span>{" "}
                    Sqft
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xs font-normal mb-3 text-slate-900 dark:text-slate-100">
                  About this property
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {property.description}
                </p>
              </div>

              {/* Owner Section */}
              <div className="bg-white/80 backdrop-blur-md dark:bg-slate-900/50 rounded-xl p-4 sm:p-5 border border-slate-200/60 dark:border-slate-800 mt-auto mb-4 md:mb-0">
                <h3 className="text-xs font-semibold mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  Contact Owner
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0">
                      <Image
                        src={property.owner.photoUrl}
                        alt={property.owner.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {property.owner.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Property Owner
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden pr-2">
                        <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md shrink-0">
                          <Mail size={16} />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                            Email
                          </p>
                          <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                            {property.owner.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() =>
                            handleCopy(property.owner.email, "email")
                          }
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-500"
                          title="Copy Email"
                        >
                          {copiedField === "email" ? (
                            <Check
                              size={16}
                              className="text-green-600 dark:text-green-400"
                            />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                        <Link
                          href={`mailto:${property.owner.email}`}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-blue-600 dark:text-blue-400"
                          title="Send Email"
                        >
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden pr-2">
                        <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md shrink-0">
                          <Phone size={16} />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                            Phone
                          </p>
                          <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                            {property.owner.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() =>
                            handleCopy(property.owner.phone, "phone")
                          }
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-500"
                          title="Copy Phone"
                        >
                          {copiedField === "phone" ? (
                            <Check
                              size={16}
                              className="text-green-600 dark:text-green-400"
                            />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                        <Link
                          href={`tel:${property.owner.phone}`}
                          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-blue-600 dark:text-blue-400"
                          title="Call Phone"
                        >
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
