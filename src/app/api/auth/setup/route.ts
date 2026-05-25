import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const passwordHash = await bcrypt.hash('Test@123', 10);
  
  await prisma.admin.upsert({
    where: { email: 'pascalniri@gmail.com' },
    update: { passwordHash },
    create: {
      email: 'pascalniri@gmail.com',
      name: 'Pascal Niringiyimana',
      passwordHash,
    },
  });
  
  return NextResponse.json({ success: true, message: 'Admin updated' });
}
