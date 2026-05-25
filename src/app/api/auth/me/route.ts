import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.log("/me: No token found in cookies");
      return NextResponse.json({ success: false, admin: null });
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      console.log("/me: Invalid token payload", payload);
      return NextResponse.json({ success: false, admin: null });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        whatsapp: true,
        avatar: true,
      }
    });

    if (!admin) {
      console.log("/me: Admin not found in db for id:", payload.id);
      return NextResponse.json({ success: false, admin: null });
    }

    console.log("/me: Successfully found admin:", admin.email);
    return NextResponse.json({ success: true, admin });
  } catch (error) {
    console.error("/me: Caught error:", error);
    return NextResponse.json({ success: false, admin: null });
  }
}
