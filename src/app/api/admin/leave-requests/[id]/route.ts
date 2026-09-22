import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { status } = await req.json(); // "APPROVED" | "REJECTED"
  const request = await prisma.leaveRequest.update({ where: { id: params.id }, data: { status } });

  if (status === "APPROVED") {
    const days: Date[] = [];
    for (let d = new Date(request.startDate); d <= request.endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    for (const date of days) {
      await prisma.attendance.upsert({
        where: { employeeId_date: { employeeId: request.employeeId, date } },
        update: { status: "LEAVE" },
        create: { employeeId: request.employeeId, date, status: "LEAVE" },
      });
    }
  }

  return NextResponse.json({ request });
}
