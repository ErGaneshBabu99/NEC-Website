import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { name, email, phone, position, photoUrl, bloodGroup, gender, birthDate, password, active } = body;

  const data: any = {
    name, email, phone, position, photoUrl, bloodGroup,
    gender: gender || undefined,
    birthDate: birthDate ? new Date(birthDate) : undefined,
    active,
  };
  if (password) data.passwordHash = await bcrypt.hash(password, 10);

  const employee = await prisma.employee.update({ where: { id: params.id }, data });
  return NextResponse.json({ employee });
}

// Employees with attendance history can't be hard-deleted without breaking
// those records, so "delete" here deactivates the account instead — it
// disappears from active use (can't log in) but past records stay intact.
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const employee = await prisma.employee.update({
    where: { id: params.id },
    data: { active: false },
  });
  return NextResponse.json({ employee });
}
