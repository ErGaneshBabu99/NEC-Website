import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos = await prisma.galleryPhoto.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ photos });
}
