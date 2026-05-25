import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
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
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function PropertyViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const [property, admin] = await Promise.all([
    prisma.property.findUnique({ where: { id: resolvedParams.id } }),
    (async () => {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        if (!token) return null;
        const payload = await verifyToken(token);
        if (!payload?.id) return null;
        return prisma.admin.findUnique({
          where: { id: payload.id as string },
          select: { avatar: true },
        });
      } catch {
        return null;
      }
    })(),
  ]);

  if (!property) {
    notFound();
  }

  const allImages = [
    property.imageUrl,
    ...(property.imageUrls || []).filter((url) => url !== property.imageUrl),
  ].filter(Boolean) as string[];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/portal/properties">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
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
                className={
                  property.isPublished
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }
              >
                {property.isPublished ? "Published" : "Draft"}
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

          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Primary image */}
            <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 relative">
              <Image
                src={allImages[0]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Additional images grid */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.slice(1).map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
                  >
                    <Image
                      src={url}
                      alt={`${property.title} — photo ${i + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
                {/* Photos count badge */}
                {allImages.length > 5 && (
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Images className="h-5 w-5 mx-auto mb-1 opacity-80" />
                      <span className="text-xs font-medium">+{allImages.length - 5} more</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {allImages.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 aspect-video bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
                No images uploaded
              </div>
            )}
          </div>

          {/* Details & Description */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1">Price</p>
                <p className="text-3xl font-heading text-blue-900 font-semibold">
                  Rwf {property.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Property Type</p>
                <p className="text-lg font-medium text-slate-900">{property.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Bed size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">{property.bedrooms}</p>
                  <p className="text-xs text-slate-500">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Bath size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">{property.bathrooms}</p>
                  <p className="text-xs text-slate-500">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-full">
                  <Square size={14} />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">{property.sqft}</p>
                  <p className="text-xs text-slate-500">Square Feet</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-heading text-slate-900">Description</h3>
              <p className="text-slate-800 leading-relaxed text-xs whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">

          {/* Owner Info Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-heading text-slate-900">Owner Information</h3>

            <div className="space-y-4">
              {/* Owner */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-slate-200">
                  {(property.ownerPhoto || admin?.avatar) ? (
                    <Image
                      src={(property.ownerPhoto || admin?.avatar) as string}
                      alt={property.ownerName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{property.ownerName}</p>
                  <p className="text-xs text-slate-500">Property Owner</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${property.ownerEmail}`}
                    className="text-slate-800 hover:text-blue-800 truncate"
                  >
                    {property.ownerEmail || "No email provided"}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                  <a href={`tel:${property.ownerPhone}`} className="text-slate-800 hover:text-blue-800">
                    {property.ownerPhone || "No phone provided"}
                  </a>
                </div>
                {property.ownerWhatsapp && (
                  <div className="flex items-center gap-3 text-xs">
                    <MessageCircle className="h-4 w-4 text-slate-400 shrink-0" />
                    <a
                      href={`https://wa.me/${property.ownerWhatsapp.replace(/[^0-9]/g, "")}`}
                      className="text-slate-800 hover:text-emerald-600"
                    >
                      WhatsApp Available
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="text-xs font-medium text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-white">
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
