import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const records = await prisma.attendance.findMany({
    where: { date: { gte: thirtyDaysAgo } },
    include: { employee: { select: { name: true } } },
  });

  const byStatus: Record<string, number> = {};
  const byEmployee: Record<string, { name: string; late: number; present: number; leave: number }> = {};

  for (const r of records) {
    byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
    if (!byEmployee[r.employeeId]) {
      byEmployee[r.employeeId] = { name: r.employee.name, late: 0, present: 0, leave: 0 };
    }
    if (r.status === "LATE") byEmployee[r.employeeId].late++;
    if (r.status === "PRESENT") byEmployee[r.employeeId].present++;
    if (r.status === "LEAVE") byEmployee[r.employeeId].leave++;
  }

  return NextResponse.json({ byStatus, byEmployee: Object.values(byEmployee) });
}
