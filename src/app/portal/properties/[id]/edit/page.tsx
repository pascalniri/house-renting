import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyForm } from "@/components/portal/PropertyForm";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const property = await prisma.property.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!property) {
    notFound();
  }

  // Need to map dates to strings if passing to Client Component if required, 
  // but Property type from useProperty expects strings for dates. 
  const serializedProperty = {
    ...property,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  };

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

      <PropertyForm initialData={serializedProperty} isEditing />
    </div>
  );
}
