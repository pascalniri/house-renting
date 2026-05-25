import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function test() {
  console.log("TEST PRISMA URL:", process.env.DATABASE_URL);
  try {
    const admins = await prisma.admin.findMany();
    console.log("Admins:", admins);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
