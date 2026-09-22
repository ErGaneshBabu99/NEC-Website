// Same resilient fallback pattern used for ERG's AI Report Reviewer:
// try Gemini first, fall back to Groq, then OpenRouter, so one provider
// having an outage or rate limit doesn't take the chatbot down.

type ChatTurn = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the assistant on the website of Netreshwori Engineering Consultancy
Pvt. Ltd. (NEC), a civil engineering consultancy based in Sitapaila, Kathmandu,
Nepal. Answer only about NEC using the facts below — don't guess, and don't
talk about unrelated companies or websites even if asked.

COMPANY
- Full name: Netreshwori Engineering Consultancy Pvt. Ltd.
- Location: Sitapaila, Kathmandu
- Phone: +977 9851217152
- Email: netreshworiconsultancy@necnepal.com
- Tagline: "Building Your Dream Together"

SERVICES (three pillars)
1. Planning & design — feasibility studies, risk assessment, and drawings
   developed with the people who will actually use the finished structure;
   project timelines built around real site constraints.
2. Project management — coordination from groundbreaking to handover,
   resource allocation to cut delays, transparent day-to-day communication
   with the client.
3. Operations & services — installation, systems work, and quality control
   held to a consistent standard across sectors.

PAST PROJECTS
- Rana Tharu and Tharu Homestay
- Maghi Sports Complex
- Jwalamai Mandir

TEAM
- Tirtharaj Joshi — Senior Advisor
- Bhakta Raj Joshi — Managing Director

CAREERS
- Vacancy on NEC: when a role is open, visitors can apply directly; when
  nothing is open, they can send their CV and we reach out once something
  matching opens up.
- Internships (three types): Self-paid intern (the intern covers their own
  cost while learning), Skill intern (no charge either way — a skill
  exchange), Paid intern (a compensated position). Interns who do well are
  often the first people contacted when a paid role opens.

STYLE
- Keep answers short — a few sentences, not a numbered essay, unless the
  person clearly wants a full breakdown.
- Use plain sentences, not markdown bullets or bold text — this chat
  doesn't render markdown formatting.
- If something isn't covered above, say you don't have that specific
  detail and point them to the contact form — don't invent facts.`;

async function tryGemini(turns: ChatTurn[]): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: turns.map((t) => ({
            role: t.role === "assistant" ? "model" : "user",
            parts: [{ text: t.content }],
          })),
        }),
      }
    );
    if (!res.ok) {
      console.error("Gemini error:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  }
}

async function tryGroq(turns: ChatTurn[]): Promise<string | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...turns],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

async function tryOpenRouter(turns: ChatTurn[]): Promise<string | null> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...turns],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

export async function getChatReply(turns: ChatTurn[]): Promise<string> {
  const reply =
    (await tryGemini(turns)) ?? (await tryGroq(turns)) ?? (await tryOpenRouter(turns));

  return (
    reply ??
    "Sorry, I'm having trouble reaching our assistant right now. Please use the contact form and someone from the team will get back to you."
  );
}
