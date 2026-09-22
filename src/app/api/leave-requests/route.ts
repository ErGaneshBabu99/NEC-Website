import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const employeeId = (session.user as any).id as string;

  const requests = await prisma.leaveRequest.findMany({
    where: { employeeId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const employeeId = (session.user as any).id as string;

  const { startDate, endDate, reason } = await req.json();
  if (!startDate || !endDate || !reason) {
    return NextResponse.json({ error: "startDate, endDate and reason are required" }, { status: 400 });
  }

  const request = await prisma.leaveRequest.create({
    data: { employeeId, startDate: new Date(startDate), endDate: new Date(endDate), reason },
  });
  return NextResponse.json({ request });
}
