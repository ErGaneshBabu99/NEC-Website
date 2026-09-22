import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, phone: true, position: true,
      photoUrl: true, bloodGroup: true, gender: true, birthDate: true,
      joinDate: true, role: true, active: true,
    },
  });
  return NextResponse.json({ employees });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { name, email, phone, position, photoUrl, bloodGroup, gender, birthDate, password, role } = body;

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "name, email, phone and password are required" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const employee = await prisma.employee.create({
    data: {
      name, email, phone, position, photoUrl, bloodGroup,
      gender: gender || undefined,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      passwordHash,
      role: role === "ADMIN" ? "ADMIN" : "EMPLOYEE",
    },
  });

  return NextResponse.json({ employee: { id: employee.id, name: employee.name, email: employee.email } });
}
