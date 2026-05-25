"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, MapPin } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { useRouter } from "next/navigation";

export default function PortalDashboard() {
  const router = useRouter();
  const totalProperties = properties.length;
  const houses = properties.filter((p) => p.type === "House").length;
  const apartments = properties.filter((p) => p.type === "Apartment").length;
  const otherTypes = totalProperties - houses - apartments;

  // Let's take the first 3 properties as the latest published ones
  const latestProperties = properties.slice(0, 3);

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading text-blue-900 font-normal mb-2">Dashboard</h1>
        <p className="text-slate-500 text-xs">Welcome back to the admin portal. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className=" border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-blue-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{totalProperties}</div>
          </CardContent>
        </Card>

        <Card className=" border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">Houses</CardTitle>
            <Home className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{houses}</div>
          </CardContent>
        </Card>

        <Card className=" border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">Other Properties</CardTitle>
            <MapPin className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-slate-900">{otherTypes}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-heading text-slate-900 mb-6">Latest Published Properties</h2>
        <div className="space-y-6">
          {latestProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={(p) => router.push(`/portal/properties/${p.id}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}