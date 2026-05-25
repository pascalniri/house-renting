import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 w-full">
        <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] min-h-[50vh] flex items-center rounded-3xl border border-slate-100 mb-12">
          {/* Dashed Top Fade Grid */}
          <div
            className="absolute inset-0 z-0 opacity-10 -top-1 pointer-events-none"
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
            <div className="flex flex-col md:flex-row md:items-start gap-12">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-normal text-blue-800 mb-6 max-w-4xl leading-[1.15]">
                  About Us
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed mb-6">
                  We are dedicated to providing a curated collection of modern
                  homes, apartments, and estates tailored for your lifestyle.
                  Our mission is to connect people with premium properties in
                  exclusive locations, ensuring a seamless and exceptional
                  experience.
                </p>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  With a focus on quality and customer satisfaction, we
                  carefully select each property to meet the highest standards
                  of living. Whether you are looking for a temporary rental or a
                  permanent home, our expert team is here to guide you every
                  step of the way.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 min-w-[280px]">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-800 rounded-lg">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                        Email
                      </p>
                      <a
                        href="mailto:hello@estates.com"
                        className="text-xs font-medium text-slate-900 hover:text-blue-800 transition-colors"
                      >
                        hello@estates.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-800 rounded-lg">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                        Phone
                      </p>
                      <a
                        href="tel:+250788123456"
                        className="text-xs font-medium text-slate-900 hover:text-blue-800 transition-colors"
                      >
                        +250 788 123 456
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-800 rounded-lg">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                        Location
                      </p>
                      <p className="text-xs font-medium text-slate-900">
                        Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
