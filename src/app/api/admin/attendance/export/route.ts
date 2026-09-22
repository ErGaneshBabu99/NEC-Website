import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const month = req.nextUrl.searchParams.get("month"); // "YYYY-MM"
  if (!month) return new Response("month=YYYY-MM query param required", { status: 400 });

  const [year, mon] = month.split("-").map(Number);
  const start = new Date(year, mon - 1, 1);
  const end = new Date(year, mon, 0);

  const records = await prisma.attendance.findMany({
    where: { date: { gte: start, lte: end } },
    include: { employee: { select: { name: true, email: true } } },
    orderBy: [{ employeeId: "asc" }, { date: "asc" }],
  });

  const header = "Employee,Email,Date,Time In,Time Out,Status,Late Minutes,Early Minutes\n";
  const rows = records
    .map((r) =>
      [
        r.employee.name,
        r.employee.email,
        r.date.toISOString().slice(0, 10),
        r.timeIn ? r.timeIn.toTimeString().slice(0, 5) : "",
        r.timeOut ? r.timeOut.toTimeString().slice(0, 5) : "",
        r.status,
        r.lateMinutes,
        r.earlyMinutes,
      ]
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="attendance-${month}.csv"`,
    },
  });
}
