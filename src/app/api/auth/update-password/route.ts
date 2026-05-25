import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || !payload.id) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { id: payload.id as string } });
    if (!admin) return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect current password" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Update password error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
