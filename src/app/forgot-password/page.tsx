"use client";

import { useState } from "react";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
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
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader className="space-y-2 items-center pb-6 pt-8">
                   
                    <CardTitle className="text-xl font-normal text-blue-900 tracking-tight text-center">
                      Forgot Password?
                    </CardTitle>
                    <CardDescription className="text-center text-xs text-slate-500">
                      Enter your admin email and we'll send you a reset link.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-5 px-8">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
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
                  </CardContent>

                  <div className="pt-4 pb-8 px-8 flex flex-col gap-4">
                    <Button variant="default" className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending link...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                    <Button variant={"outline"} className="w-full" 
                      onClick={() => router.push("/auth")}
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Back to sign in
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center text-center px-8 py-12 gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-normal text-slate-900">Check your inbox</h2>
                  <p className="text-xs text-slate-500 max-w-xs">
                    If an account exists for that email, a password reset link has been sent. It will expire in 1 hour.
                  </p>
                  <Link href="/auth">
                    <Button variant="outline" className="mt-4">
                      <ArrowLeft />
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
