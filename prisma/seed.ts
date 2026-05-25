const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {
  const passwordHash = await bcrypt.hash('Test@123', 10);
  
  await prisma.admin.upsert({
    where: { email: 'pascalniri@gmail.com' },
    update: { passwordHash },
    create: {
      email: 'pascalniri@gmail.com',
      name: 'Pascal Niri',
      passwordHash,
    },
  });
  console.log('Admin user configured: pascalniri@gmail.com / Test@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
