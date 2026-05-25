import { Property } from "@/app/hooks/useProperty";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
  postedBy?: { name: string | null; avatar: string | null };
}

export function PropertyCard({ property, onClick, postedBy }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-[1.25rem] border border-slate-100/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 mb-6 flex flex-col md:flex-row gap-8 transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]">
      {/* Left side: Owner & Property Details */}
      <div className="w-full md:w-5/12 flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-full overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200 flex items-center justify-center">
            {(postedBy?.avatar || property.ownerPhoto) ? (
              <Image
                src={(postedBy?.avatar || property.ownerPhoto) as string}
                alt={postedBy?.name || property.ownerName}
                fill
                className="object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
              {postedBy?.name || property.ownerName}
            </h4>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide">
              {postedBy ? "Posted by Admin" : "Property Owner"}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-normal text-slate-800 mb-2 leading-snug">
          {property.title}
        </h3>

        <p className="text-[13px] text-slate-500 mb-5 line-clamp-3 leading-relaxed">
          {property.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          <Badge variant="default">
            <Bed size={12} /> {property.bedrooms} Beds
          </Badge>
          <Badge variant="secondary">
            <Bath size={12} /> {property.bathrooms} Baths
          </Badge>
          <Badge variant="secondary">
            <Square size={12} /> {property.sqft} sqft
          </Badge>
        </div>

        <div>
          <Button variant="outline" onClick={() => onClick(property)}>
            View Property <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Right side: Image Showcase */}
      <div className="w-full md:w-7/12 flex flex-col min-h-[220px]">
        <h4 className="text-xs font-semibold text-slate-800 mb-3 uppercase tracking-wider">
          Showcases
        </h4>
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div
            className="relative h-56 sm:h-auto flex-1 rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => onClick(property)}
          >
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-white font-semibold text-xs drop-shadow-md leading-tight">
                {property.location}
              </span>
              <span className="text-white/90 text-xs flex items-center mt-1.5 font-medium">
                <span className="bg-white/80 h-3 w-3 rounded flex items-center justify-center mr-2 text-[8px] text-blue-800">
                  <Square className="w-2 h-2 fill-current" />
                </span>
                {property.price.toLocaleString()} Rwf
              </span>
            </div>
          </div>

          <div
            className="hidden sm:flex flex-1 rounded-2xl bg-slate-50/80 border border-slate-100 items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => onClick(property)}
          >
            <span className="text-xs font-semibold text-slate-800 flex items-center uppercase tracking-wide">
              View More <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
