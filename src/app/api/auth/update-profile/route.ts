import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const data = await request.json();
    const { name, phone, whatsapp, avatar } = data;

    // We do not allow changing email through this endpoint for security reasons, 
    // unless you want to add email verification flow later.
    const updatedAdmin = await prisma.admin.update({
      where: { id: payload.id as string },
      data: {
        name,
        phone,
        whatsapp,
        avatar
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        whatsapp: true,
        avatar: true,
      }
    });

    return NextResponse.json({ success: true, admin: updatedAdmin, message: "Profile updated successfully" });
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
