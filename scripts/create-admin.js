// One-time script to create the first admin account.
// Run: node scripts/create-admin.js
// Edit the values below first, then delete this file (or just don't run it again).

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("changeme123", 10); // <-- change this password

  const admin = await prisma.employee.upsert({
    where: { email: "admin@necnepal.com" }, // <-- change this email
    update: {},
    create: {
      name: "Admin",
      email: "admin@necnepal.com", // <-- change this email
      phone: "9800000000",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin account ready:", admin.email);
}

main().finally(() => prisma.$disconnect());
