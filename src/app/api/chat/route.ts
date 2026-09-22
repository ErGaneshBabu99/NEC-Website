import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { sessionId, messages } = await req.json();

  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "sessionId and messages are required" }, { status: 400 });
  }

  const reply = await getChatReply(messages);

  try {
    const lastUserMessage = messages[messages.length - 1];
    await prisma.chatMessage.createMany({
      data: [
        { sessionId, role: "user", content: lastUserMessage.content },
        { sessionId, role: "assistant", content: reply },
      ],
    });
  } catch {
    // Logging is best-effort — don't fail the reply if the DB write fails.
  }

  return NextResponse.json({ reply });
}
