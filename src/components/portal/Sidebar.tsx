"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, PlusCircle, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useAuth from "@/app/hooks/useAuth";

const navItems = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Properties", href: "/portal/properties", icon: Building2 },
  { name: "Settings", href: "/portal/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
 const {logout} = useAuth();
  const NavLinks = () => (
    <div className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md text-xs font-medium transition-colors",
              isActive 
                ? "bg-blue-50 text-blue-800" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive ? "text-blue-800" : "text-slate-400")} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Header & Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <Link href="/portal" className="text-blue-800 font-bold text-lg font-heading">
          Estates Portal
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out flex flex-col",
        isOpen ? "translate-x-0 mt-14 md:mt-0" : "-translate-x-full md:translate-x-0",
        "md:flex"
      )}>
        <div className="p-6 hidden md:block">
          <Link href="/portal" className="text-blue-800 font-bold text-xl font-heading">
            Estates Portal
          </Link>
        </div>

        <div className="flex-1 px-4 py-4 overflow-y-auto">
          <nav>
            <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Menu
            </h2>
            <NavLinks />
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
            <Button onClick={logout} variant="ghost" className="w-full justify-start text-slate-600 hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
        </div>
      </aside>
    </>
  );
}
