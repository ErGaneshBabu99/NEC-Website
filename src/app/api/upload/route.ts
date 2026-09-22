import { NextRequest, NextResponse } from "next/server";
import { uploadToGithub } from "@/lib/github-storage";

const MAX_SIZE = 900 * 1024; // ~900KB — GitHub Contents API single-request limit is ~1MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "uploads"; // "cvs" | "photos"

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is larger than 900KB — please compress it and try again" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF, DOC/DOCX, JPG, PNG or WEBP files are allowed" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;

  try {
    const url = await uploadToGithub(path, bytes, `Upload ${path}`);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("GitHub upload error:", err);
    return NextResponse.json({ error: "Upload failed — check GITHUB_TOKEN/GITHUB_REPO in .env" }, { status: 500 });
  }
}
