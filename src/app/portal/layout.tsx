import { Sidebar } from "@/components/portal/Sidebar";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 w-full md:w-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
