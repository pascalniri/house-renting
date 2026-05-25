import { PropertyForm } from "@/components/portal/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading text-blue-900 font-medium mb-2">
          Add New Property
        </h1>
        <p className="text-slate-500 text-xs">
          Fill in the details below to publish a new real estate listing.
        </p>
      </div>

      <PropertyForm />
    </div>
  );
}
