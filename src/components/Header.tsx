"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-6 inset-x-0 z-50 mx-auto max-w-5xl px-4 w-full">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.05)] h-16 flex items-center justify-between px-6 transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-800 tracking-tight">
            Estates
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs font-medium text-slate-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="text-xs font-medium text-slate-900 transition-colors"
          >
            Properties
          </Link>
        
          <Link
            href="/about"
            className="text-xs font-medium text-slate-900 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center">
          <Button onClick={() => router.push("/auth")}>Admin Portal</Button>
        </div>
      </div>
    </header>
  );
}
