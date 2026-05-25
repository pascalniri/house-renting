"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { admin, loading, logout } = useAuth();
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

        <div className="flex items-center gap-4">
          {!loading ? (
            admin ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={admin.avatar || undefined}
                      alt={admin.name || "Admin"}
                    />
                    <AvatarFallback className="bg-blue-600 text-white font-medium">
                      {(admin.name || "A").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 align-end rounded-xl border-blue-100  bg-white p-2"
                  sideOffset={8}
                >
                  <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white rounded-xl mb-1 p-3 border border-slate-50">
                    <div
                      className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, #000 1px, transparent 1px),
                          linear-gradient(to bottom, #000 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                        maskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)`,
                      }}
                    />
                    <DropdownMenuGroup className="relative z-10">
                      <DropdownMenuLabel className="font-normal p-0">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold text-blue-900 leading-none">
                            {admin.name || "Admin"}
                          </p>
                          <p className="text-xs font-medium leading-none text-slate-500">
                            {admin.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem className="bg-white">
                    <Button
                      variant="default"
                      onClick={() => router.push("/portal")}
                      className="flex items-center w-full"
                    >
                      <LayoutDashboard />
                      Dashboard
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem
                    onClick={() => logout()}
                  >
                    <Button
                      variant="destructive"
                      onClick={() => logout()}
                      className="flex items-center w-full"
                    >
                      <LogOut />
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push("/auth")}>Admin Portal</Button>
            )
          ) : (
            <div className="h-10 w-10 bg-slate-100 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
    </header>
  );
}
