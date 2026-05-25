"use client";

import { useState, useMemo, useEffect } from "react";
import { Property } from "@/app/hooks/useProperty";
import useProperty from "@/app/hooks/useProperty";
import { PropertyCard } from "./PropertyCard";
import { PropertyDetailsModal } from "./PropertyDetailsModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";

export function PropertyList() {
  const { properties, loading, fetchProperties } = useProperty();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "All" || property.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [properties, searchQuery, typeFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters Section */}
      <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] rounded-3xl border border-slate-100 mb-10 p-6 md:p-8">
        {/* Dashed Top Fade Grid */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start bg-white/80 backdrop-blur-md border border-slate-300/60  p-6 rounded-2xl">
          <div className="w-full md:flex-1 space-y-2">
            <Label
              htmlFor="search"
              className="text-slate-800 dark:text-slate-400 font-medium text-xs"
            >
              Search Location or Title
            </Label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="search"
                placeholder="e.g. Beverly Hills, CA"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <Label
              htmlFor="type"
              className="text-slate-800 dark:text-slate-400 font-medium text-xs"
            >
              Property Type
            </Label>
            <Select
              value={typeFilter}
              onValueChange={(val) => setTypeFilter(val || "All")}
            >
              <SelectTrigger id="type">
                <div className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="All Types" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="flex flex-col">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={setSelectedProperty}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
          <h3 className="text-xl font-normal text-blue-800 dark:text-slate-100 mb-2">
            No properties found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      )}

      {/* Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
