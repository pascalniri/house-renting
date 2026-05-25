import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

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

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string || null;
    const whatsapp = formData.get("whatsapp") as string || null;
    let avatarUrl = formData.get("avatar") as string || null;

    const avatarFile = formData.get("avatarFile") as File | null;
    if (avatarFile && avatarFile.size > 0) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      avatarUrl = await uploadImage(buffer, "house-renting/avatars");
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: payload.id as string },
      data: {
        name,
        phone,
        whatsapp,
        avatar: avatarUrl
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
