"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth, { loginSchema, LoginFormData } from "@/app/hooks/useAuth";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <main className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 w-full">
        <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-[#f8fafc] min-h-[60vh] flex items-center justify-center rounded-3xl border border-slate-100 py-12">
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

          <div className="relative z-10 w-full max-w-md px-4">
            <Card className="bg-white/80 backdrop-blur-md border-white/60 shadow-xl overflow-visible">
              <form onSubmit={handleSubmit(login)}>
                <CardHeader className="space-y-2 items-center pb-6 pt-8">
                  <CardTitle className="text-2xl font-normal text-blue-900 tracking-tight text-center">
                    Admin Access
                  </CardTitle>
                  <CardDescription className="text-center text-xs text-slate-500">
                    Enter your credentials to manage the portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">
                        Password
                      </Label>
                      <Link href="/forgot-password" className="text-xs text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 pb-8 px-8 border-t-0 bg-transparent flex flex-col gap-4">
                  <Button variant="default" className="w-full" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <div className="text-center text-xs text-slate-500">
                    Secure admin portal access only
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}