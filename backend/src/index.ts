// testing file for adding to database since signup doesnt work yet

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaClient();
  const saltRounds = 10;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('pass', saltRounds);
    
    // Create test user
    const newUser = await prisma.user.create({
      data: {
        username: "user2",
        email: "user@test2.com",
        password: hashedPassword,
        provider: "local"
      }
    });

    console.log("New User Created:", newUser);

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