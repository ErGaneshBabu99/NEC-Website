import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, birthdayWishHtml, workAnniversaryHtml } from "@/lib/email";

// Wire this route up in vercel.json as a daily cron (see README), e.g.
// running once each morning covers the T-2, T-1 and same-day cases below.
// For the "10am on the birthday" requirement specifically, schedule a
// second cron entry for 04:15 UTC (~10:00 Asia/Kathmandu) hitting this
// same route with ?slot=morning.

function daysUntil(birthDate: Date, today: Date) {
  const b = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const diff = Math.round((b.getTime() - today.setHours(0, 0, 0, 0)) / 86400000);
  return diff < -1 ? diff + 365 : diff; // wrap year-end
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const settings = await prisma.attendanceSettings.findUnique({ where: { id: "singleton" } });
  const alertEmails = [settings?.lateAlertEmail1, settings?.lateAlertEmail2].filter(Boolean) as string[];

  const employees = await prisma.employee.findMany({ where: { active: true, birthDate: { not: null } } });
  const today = new Date();
  const sent: string[] = [];

  for (const emp of employees) {
    if (!emp.birthDate) continue;
    const d = daysUntil(new Date(emp.birthDate), new Date(today));

    if (d === 2 && alertEmails.length) {
      await sendEmail(
        alertEmails,
        `Heads up: ${emp.name}'s birthday is in 2 days`,
        `<p>${emp.name} (${emp.position ?? "employee"}) has a birthday coming up on ${new Date(
          emp.birthDate
        ).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}.</p>`
      );
      sent.push(`${emp.email}: T-2 admin heads-up`);
    }

    if (d === 1) {
      await sendEmail(emp.email, "Happy (almost) birthday!", birthdayWishHtml(emp.name, emp.gender));
      sent.push(`${emp.email}: T-1 wish`);
    }

    if (d === 0) {
      await sendEmail(emp.email, "Happy Birthday from NEC!", birthdayWishHtml(emp.name, emp.gender));
      sent.push(`${emp.email}: birthday-morning wish`);

      const years = today.getFullYear() - new Date(emp.joinDate).getFullYear();
      const joinAnniversary =
        today.getMonth() === new Date(emp.joinDate).getMonth() &&
        today.getDate() === new Date(emp.joinDate).getDate();
      if (joinAnniversary && years > 0) {
        await sendEmail(emp.email, "Happy work anniversary!", workAnniversaryHtml(emp.name, years));
        sent.push(`${emp.email}: work anniversary`);
      }
    }
  }

  return NextResponse.json({ ok: true, sent });
}
