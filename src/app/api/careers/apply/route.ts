import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

// Handles three flows from the Careers page:
//   kind: "vacancy"       -> applying to an open, named vacancy
//   kind: "open-cv"       -> no vacancy open, general "send your CV" form
//   kind: "intern"        -> one of the 3 internship types
// All three notify the two dedicated hiring-inbox addresses.

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { kind, name, age, phone, email, collegeName, collegeStatus, cvUrl, internshipType, vacancyTitle } = body;

  if (!name || !Number.isFinite(age) || age <= 0 || !phone || !email || !collegeName || !collegeStatus || !cvUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const alertEmails = [process.env.HIRING_ALERT_EMAIL_1, process.env.HIRING_ALERT_EMAIL_2].filter(
    Boolean
  ) as string[];

  if (kind === "intern") {
    await prisma.internApplication.create({
      data: { name, age, phone, email, collegeName, collegeStatus, type: internshipType, cvUrl },
    });
    if (alertEmails.length) {
      const typeLabel = internshipType.replace("_", " ").toLowerCase(); // "self paid" | "skill" | "paid"
      await sendEmail(
        alertEmails,
        `${name} sent CV for ${typeLabel} internship`,
        `<p>${name} sent a CV for the <b>${typeLabel} internship</b> (${phone}). ` +
          `From ${collegeName}, age ${age}, ${collegeStatus === "STUDYING" ? "currently studying" : "passed out"}.</p>` +
          `<p><a href="${cvUrl}">View CV</a></p>`
      );
    }
  } else {
    await prisma.jobApplication.create({
      data: { name, age, phone, email, collegeName, collegeStatus, cvUrl },
    });
    if (alertEmails.length) {
      const roleLabel = kind === "vacancy" ? vacancyTitle : "a future opening";
      await sendEmail(
        alertEmails,
        kind === "vacancy" ? `${name} applied for ${vacancyTitle}` : `${name} sent CV (no open vacancy)`,
        `<p>${name} sent a CV for <b>${roleLabel}</b> (${phone}). ` +
          `From ${collegeName}, age ${age}, ${collegeStatus === "STUDYING" ? "currently studying" : "passed out"}.</p>` +
          `<p><a href="${cvUrl}">View CV</a></p>`
      );
    }
  }

  return NextResponse.json({ ok: true });
}
