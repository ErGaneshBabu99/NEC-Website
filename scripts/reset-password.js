// Resets an employee/admin's login password by email.
// Usage: node scripts/reset-password.js you@email.com newpassword123

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const [, , email, newPassword] = process.argv;
  if (!email || !newPassword) {
    console.error("Usage: node scripts/reset-password.js <email> <newPassword>");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  const employee = await prisma.employee.update({
    where: { email },
    data: { passwordHash },
  });

  console.log(`Password reset for ${employee.email} (${employee.role})`);
}

main()
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
