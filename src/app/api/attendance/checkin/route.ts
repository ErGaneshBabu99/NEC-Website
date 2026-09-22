import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function todayDateOnly() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function minutesSinceMidnight(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}

function parseHHmm(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isFromOfficeNetwork(req: NextRequest) {
  const allowed = (process.env.OFFICE_ALLOWED_IPS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (allowed.length === 0) return true; // not configured — don't block anyone
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "";
  return allowed.includes(ip);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  if (!isFromOfficeNetwork(req)) {
    return NextResponse.json(
      { error: "Check-in only works from the office network. Please connect to office WiFi and try again." },
      { status: 403 }
    );
  }

  const employeeId = (session.user as any).id as string;
  const { action } = await req.json(); // "in" | "out"

  const settings =
    (await prisma.attendanceSettings.findUnique({ where: { id: "singleton" } })) ??
    (await prisma.attendanceSettings.create({ data: { id: "singleton" } }));

  const date = todayDateOnly();
  const now = new Date();

  const isHoliday = !!(await prisma.holiday.findUnique({ where: { date } }));

  const existing = await prisma.attendance.findUnique({
    where: { employeeId_date: { employeeId, date } },
  });

  if (action === "in") {
    if (existing?.timeIn) {
      return NextResponse.json({ error: "Already checked in today" }, { status: 400 });
    }
    const startMin = parseHHmm(settings.workStartTime);
    const nowMin = minutesSinceMidnight(now);
    const lateMinutes = isHoliday ? 0 : Math.max(0, nowMin - startMin);
    const status = isHoliday ? "PRESENT" : lateMinutes > 0 ? "LATE" : "PRESENT";

    const record = await prisma.attendance.upsert({
      where: { employeeId_date: { employeeId, date } },
      update: { timeIn: now, status, lateMinutes },
      create: { employeeId, date, timeIn: now, status, lateMinutes },
    });
    return NextResponse.json({ record });
  }

  if (action === "out") {
    if (!existing?.timeIn) {
      return NextResponse.json({ error: "Check in first" }, { status: 400 });
    }
    const endMin = parseHHmm(settings.workEndTime);
    const nowMin = minutesSinceMidnight(now);
    const earlyMinutes = Math.max(0, endMin - nowMin);

    const record = await prisma.attendance.update({
      where: { employeeId_date: { employeeId, date } },
      data: { timeOut: now, earlyMinutes },
    });
    return NextResponse.json({ record });
  }

  return NextResponse.json({ error: "action must be 'in' or 'out'" }, { status: 400 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const employeeId = (session.user as any).id as string;
  const date = todayDateOnly();

  const today = await prisma.attendance.findUnique({ where: { employeeId_date: { employeeId, date } } });
  const history = await prisma.attendance.findMany({
    where: { employeeId },
    orderBy: { date: "desc" },
    take: 14,
  });

  return NextResponse.json({ today, history });
}
