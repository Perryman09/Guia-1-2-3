import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const hashedPassword = await bcrypt.hash('123456', 10);

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tech Solutions Inc.',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin User',
      password: hashedPassword,
      telephone: '12345678',
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  console.log({ tenant, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });