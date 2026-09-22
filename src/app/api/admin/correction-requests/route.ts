import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const requests = await prisma.correctionRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { employee: { select: { name: true, email: true } } },
  });
  return NextResponse.json({ requests });
}
