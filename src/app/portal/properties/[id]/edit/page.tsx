import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import { PropertyForm } from "@/components/portal/PropertyForm";

export default async function EditPropertyPage({
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
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading text-blue-900 font-medium mb-2">
          Edit Property
        </h1>
        <p className="text-slate-500 text-xs">
          Update the details for {property.title}.
        </p>
      </div>

      <PropertyForm initialData={property} isEditing />
    </div>
  );
}
