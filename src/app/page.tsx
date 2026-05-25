import { PropertyList } from "@/components/PropertyList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] min-h-[50vh] flex items-center rounded-3xl border border-slate-100">
          {/* Dashed Top Fade Grid */}
          <div
            className="absolute inset-0 z-0 opacity-10 -top-1"
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

          <div className="w-full relative z-10 px-8 sm:px-12 lg:px-16 py-16">
            <h2 className="text-4xl md:text-5xl font-normal text-blue-800 mb-6 max-w-4xl leading-[1.15]">
              Discover Premium Properties from Exclusive Locations
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl">
              A curated collection of modern homes, apartments, and estates
              tailored for your lifestyle.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="text-2xl font-semibold text-slate-800 text-center mb-1">
          Browse Properties
        </h3>
        <p className="text-center text-slate-500 text-xs mb-8">
          Discover inspiring listings from top locations.
        </p>

        <PropertyList />
      </div>

      <Footer />
    </main>
  );
}
