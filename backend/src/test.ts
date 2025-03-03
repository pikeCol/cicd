
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaClient();

  try {

    // Verify creation
    const users = await prisma.user.findMany();
    console.log("All Users:", users);
  } catch (error) {
    console.error("Error during database operation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();