import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const employeeId = (session.user as any).id as string;

  const requests = await prisma.correctionRequest.findMany({
    where: { employeeId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const employeeId = (session.user as any).id as string;

  const { date, requestedTimeOut, reason } = await req.json();
  if (!date || !requestedTimeOut || !reason) {
    return NextResponse.json({ error: "date, requestedTimeOut and reason are required" }, { status: 400 });
  }

  const request = await prisma.correctionRequest.create({
    data: {
      employeeId,
      date: new Date(date),
      requestedTimeOut: new Date(`${date}T${requestedTimeOut}`),
      reason,
    },
  });
  return NextResponse.json({ request });
}
