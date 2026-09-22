import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { status } = await req.json(); // "APPROVED" | "REJECTED"
  const request = await prisma.correctionRequest.update({ where: { id: params.id }, data: { status } });

  if (status === "APPROVED") {
    await prisma.attendance.update({
      where: { employeeId_date: { employeeId: request.employeeId, date: request.date } },
      data: { timeOut: request.requestedTimeOut },
    });
  }

  return NextResponse.json({ request });
}
