import { properties } from "@/data/properties";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Bed,
  Bath,
  Square,
  User,
  Mail,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function PropertyViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const property = properties.find((p) => p.id === resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/portal/properties">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-heading text-slate-900 font-medium">
                {property.title}
              </h1>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                Published
              </Badge>
            </div>
            <div className="flex items-center text-slate-500 text-xs">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {property.location}
            </div>
          </div>
        </div>
        <Link href={`/portal/properties/${property.id}/edit`}>
          <Button variant="default">
            <Edit className="mr-2 h-4 w-4" />
            Edit Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details & Description */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1">Price</p>
                <p className="text-3xl font-heading text-blue-900 font-semibold">
                  ${property.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Property Type</p>
                <p className="text-lg font-medium text-slate-900">
                  {property.type}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Bed size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    {property.bedrooms}
                  </p>
                  <p className="text-xs text-slate-500">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Bath size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    {property.bathrooms}
                  </p>
                  <p className="text-xs text-slate-500">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Square size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    {property.sqft}
                  </p>
                  <p className="text-xs text-slate-500">Square Feet</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-heading text-slate-900">
                Description
              </h3>
              <p className="text-slate-800 leading-relaxed text-xs whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Owner Info Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-heading text-slate-900">
              Owner Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900">
                    {property.owner.name}
                  </p>
                  <p className="text-xs text-slate-500">Property Owner</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${property.owner.email}`}
                    className="text-slate-800 hover:text-blue-800 truncate"
                  >
                    {property.owner.email || "No email provided"}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                  <a
                    href={`tel:${property.owner.phone}`}
                    className="text-slate-800 hover:text-blue-800"
                  >
                    {property.owner.phone || "No phone provided"}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <MessageCircle className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="text-slate-800">WhatsApp Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="text-xs font-medium text-slate-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                View on Public Site
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 bg-white border-slate-200"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
