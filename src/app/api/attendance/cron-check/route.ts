import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { subDays } from "date-fns";

// Run this once per day (after work hours) via Vercel Cron — see README.
// Flags anyone who has been late (or left early) on every one of the last
// N days, where N = AttendanceSettings.consecutiveLateDaysForAlert.

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const settings = await prisma.attendanceSettings.findUnique({ where: { id: "singleton" } });
  const alertEmails = [settings?.lateAlertEmail1, settings?.lateAlertEmail2].filter(Boolean) as string[];
  const windowDays = settings?.consecutiveLateDaysForAlert ?? 3;

  if (!alertEmails.length) {
    return NextResponse.json({ ok: false, reason: "no alert emails configured" });
  }

  const employees = await prisma.employee.findMany({ where: { active: true } });
  const since = subDays(new Date(), windowDays);
  const flagged: { name: string; lateDays: number; earlyDays: number }[] = [];

  for (const emp of employees) {
    const records = await prisma.attendance.findMany({
      where: { employeeId: emp.id, date: { gte: since } },
      orderBy: { date: "desc" },
      take: windowDays,
    });
    if (records.length < windowDays) continue;

    const allLate = records.every((r) => r.status === "LATE");
    const allEarly = records.every((r) => r.earlyMinutes > 0);
    if (allLate || allEarly) {
      flagged.push({
        name: emp.name,
        lateDays: records.filter((r) => r.status === "LATE").length,
        earlyDays: records.filter((r) => r.earlyMinutes > 0).length,
      });
    }
  }

  if (flagged.length) {
    const rows = flagged
      .map((f) => `<tr><td>${f.name}</td><td>${f.lateDays}</td><td>${f.earlyDays}</td></tr>`)
      .join("");
    await sendEmail(
      alertEmails,
      `Attendance alert: ${flagged.length} employee(s) consistently late/early`,
      `<table border="1" cellpadding="6"><tr><th>Name</th><th>Late days</th><th>Early-leave days</th></tr>${rows}</table>`
    );
  }

  return NextResponse.json({ ok: true, flagged });
}
