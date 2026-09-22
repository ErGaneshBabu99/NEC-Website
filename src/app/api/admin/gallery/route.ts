import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const photos = await prisma.galleryPhoto.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { url, caption, category, isPhotoOfTheWeek } = await req.json();
  if (!url || !caption || !category) {
    return NextResponse.json({ error: "url, caption and category are required" }, { status: 400 });
  }

  // Only one photo can be "Photo of the Week" at a time.
  if (isPhotoOfTheWeek) {
    await prisma.galleryPhoto.updateMany({ where: { isPhotoOfTheWeek: true }, data: { isPhotoOfTheWeek: false } });
  }

  const photo = await prisma.galleryPhoto.create({
    data: { url, caption, category, isPhotoOfTheWeek: !!isPhotoOfTheWeek },
  });
  return NextResponse.json({ photo });
}
