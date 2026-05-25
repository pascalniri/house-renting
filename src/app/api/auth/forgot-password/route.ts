import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      // Return success even if not found to prevent email enumeration
      return NextResponse.json({ success: true, message: "If that email exists, a reset link was sent." });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Mock sending email
    console.log("=========================================");
    console.log(`MOCK EMAIL SENT TO: ${admin.email}`);
    console.log(`Password Reset Link: ${resetLink}`);
    console.log("=========================================");

    return NextResponse.json({ success: true, message: "If that email exists, a reset link was sent." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
