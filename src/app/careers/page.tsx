"use client";

import { useState } from "react";
import { compressPdf } from "@/lib/compressPdf";

type FormState = {
  name: string;
  age: string;
  phone: string;
  email: string;
  collegeName: string;
  collegeStatus: string;
};

const COLLEGE_SUGGESTIONS = [
  "Pulchowk Campus, IOE",
  "Thapathali Campus, IOE",
  "Khwopa Engineering College",
  "Kathmandu Engineering College",
  "Himalaya College of Engineering",
  "National College of Engineering",
];

function ApplicationForm({
  form,
  setForm,
  cvFile,
  setCvFile,
  submitting,
  compressing,
  sizeError,
  onSubmit,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  cvFile: File | null;
  setCvFile: (f: File | null) => void;
  submitting: boolean;
  compressing: boolean;
  sizeError: { sizeKB: number } | null;
  onSubmit: () => void;
}) {
  return (
    <div className="max-w-md space-y-4 mt-8">
      <input
        placeholder="Full name"
        className="w-full border px-4 py-3 rounded-sm"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Age"
        type="number"
        className="w-full border px-4 py-3 rounded-sm"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <input
        placeholder="Phone number"
        type="tel"
        inputMode="numeric"
        className="w-full border px-4 py-3 rounded-sm"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Email address"
        type="email"
        className="w-full border px-4 py-3 rounded-sm"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="College name"
        list="college-suggestions"
        className="w-full border px-4 py-3 rounded-sm"
        value={form.collegeName}
        onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
      />
      <datalist id="college-suggestions">
        {COLLEGE_SUGGESTIONS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <select
        className="w-full border px-4 py-3 rounded-sm"
        value={form.collegeStatus}
        onChange={(e) => setForm({ ...form, collegeStatus: e.target.value })}
      >
        <option value="STUDYING">Currently studying</option>
        <option value="PASSED_OUT">Passed out</option>
      </select>
      <div>
        <label className="block text-sm text-gray-600 mb-2">
          CV / resume <span className="text-gray-400">(PDF, DOC or DOCX — under 900KB)</span>
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
        {cvFile && (
          <p className="text-xs text-gray-500 mt-1">
            {cvFile.name} · {Math.round(cvFile.size / 1024)}KB
          </p>
        )}
        {compressing && (
          <div className="flex items-center gap-2 mt-3 text-sm text-blue-700">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Compressing your CV…
          </div>
        )}
        {sizeError && (
          <div className="mt-3 p-4 rounded-lg" style={{ background: "#FEF2E8", border: "1px solid #E8A33D" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#8A5A1E" }}>
              Your CV is still {sizeError.sizeKB}KB — a bit over our 900KB limit
            </p>
            <p className="text-sm mb-2" style={{ color: "#8A5A1E" }}>
              We tried compressing it automatically but couldn't get it small enough. Please reduce the file size and upload again:
            </p>
            <ul className="text-sm list-disc list-inside space-y-0.5" style={{ color: "#8A5A1E" }}>
              <li>Use a free tool like smallpdf.com or ilovepdf.com to compress the PDF</li>
              <li>Remove any large images or extra pages if possible</li>
              <li>Save/export from Word as a smaller PDF</li>
            </ul>
          </div>
        )}
      </div>
      <button
        disabled={submitting || compressing}
        onClick={onSubmit}
        className="px-6 py-3 bg-black text-white rounded-sm disabled:opacity-50"
      >
        {compressing ? "Compressing…" : submitting ? "Sending…" : "Submit application"}
      </button>
    </div>
  );
}

// Replace with a server fetch (`await prisma.vacancy.findMany({ where: { isOpen: true } })`
// in a parent server component) once the DB is connected — left as a prop-driven
// client component here so the UI/flow can be reviewed on its own.
export default function CareersPage({ openVacancies = [] as Vacancy[] }) {
  const [mode, setMode] = useState<"landing" | "vacancy" | "open-cv" | "intern">("landing");
  const [internType, setInternType] = useState<"SELF_PAID" | "SKILL" | "PAID" | null>(null);
  const [submitted, setSubmitted] = useState<null | "job" | "intern">(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    collegeName: "",
    collegeStatus: "STUDYING",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [sizeError, setSizeError] = useState<{ sizeKB: number } | null>(null);

  const MAX_CV_BYTES = 900 * 1024;

  async function handleSubmit(kind: "vacancy" | "open-cv" | "intern", vacancyTitle?: string) {
    if (!cvFile) return alert("Please attach your CV.");
    setSizeError(null);

    let fileToUpload = cvFile;
    if (cvFile.type === "application/pdf" && cvFile.size > MAX_CV_BYTES) {
      setCompressing(true);
      fileToUpload = await compressPdf(cvFile);
      setCompressing(false);
    }

    if (fileToUpload.size > MAX_CV_BYTES) {
      setSizeError({ sizeKB: Math.round(fileToUpload.size / 1024) });
      return;
    }

    setSubmitting(true);
    try {
      // Upload CV via the upload API (GitHub-backed storage).
      const uploadData = new FormData();
      uploadData.append("file", fileToUpload);
      uploadData.append("folder", "cvs");
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) {
        alert(uploadJson.error ?? "CV upload failed");
        return;
      }
      const cvUrl = uploadJson.url;

      const applyRes = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          ...form,
          age: Number(form.age),
          cvUrl,
          internshipType: internType,
          vacancyTitle,
        }),
      });
      if (!applyRes.ok) {
        let message = "Something went wrong submitting your application. Please try again.";
        try {
          const err = await applyRes.json();
          if (err.error) message = err.error;
        } catch {
          // response body wasn't JSON — keep the generic message
        }
        alert(message);
        return;
      }
      setSubmitted(kind === "intern" ? "intern" : "job");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-32 px-6 text-center">
        <div className="text-5xl mb-6">🎉</div>
        {submitted === "intern" ? (
          <>
            <h1 className="text-2xl font-bold mb-3">Request sent!</h1>
            <p className="text-gray-600">
              Your internship request has been sent. We'll look at your CV and reach out soon.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-3">Your request has been sent</h1>
            <p className="text-gray-600">
              We'll look at your CV and reach out. Once a vacancy opens up matching your profile,
              we'll call you — stay tuned.
            </p>
          </>
        )}
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 text-sm rounded-sm font-semibold"
          style={{ background: "#14181C", color: "#EAE6DB" }}
        >
          Back to website
        </a>
      </div>
    );
  }

  const applicationFormProps = {
    form,
    setForm,
    cvFile,
    setCvFile: (f: File | null) => {
      setCvFile(f);
      setSizeError(null);
    },
    submitting,
    compressing,
    sizeError,
  };

  return (
    <div className="max-w-3xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold mb-2">Vacancy on NEC</h1>

      {mode === "landing" && (
        <div className="space-y-10 mt-8">
          <div>
            <p className="text-gray-600 mb-1">Want to start from an internship?</p>
            <p className="text-sm text-gray-500 mb-4 max-w-xl">
              An internship is a short, structured period where you work alongside our team on real
              projects instead of starting straight into a full role. It's how most people join us —
              interns who do well are the first ones we call when a paid position opens up, and you'll
              get to work on live projects, not just observe.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { key: "SELF_PAID", label: "Self-paid intern", desc: "You cover your own cost while you learn.", color: "#E8A33D", emoji: "🎓" },
                { key: "SKILL", label: "Skill intern", desc: "No charge, no pay — skill exchange only.", color: "#2FA893", emoji: "🤝" },
                { key: "PAID", label: "Paid intern", desc: "Compensated internship position.", color: "#7C5CE0", emoji: "💼" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setInternType(opt.key as any);
                    setMode("intern");
                  }}
                  className="text-left rounded-xl p-6 transition-transform hover:-translate-y-1"
                  style={{
                    background: `${opt.color}14`,
                    border: `2px solid ${opt.color}`,
                  }}
                >
                  <div className="text-3xl mb-3">{opt.emoji}</div>
                  <div className="font-bold mb-1" style={{ color: opt.color }}>{opt.label}</div>
                  <div className="text-sm text-gray-600">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {openVacancies.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-4">Open positions right now:</p>
              <div className="space-y-3">
                {openVacancies.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setMode("vacancy")}
                    className="block w-full text-left border rounded-sm p-4 hover:border-black transition-colors"
                  >
                    <div className="font-semibold">{v.title}</div>
                    <div className="text-sm text-gray-500">Click here to apply</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="border rounded-sm p-6">
              <p className="text-gray-600 mb-4">No open vacancy right now.</p>
              <button onClick={() => setMode("open-cv")} className="px-6 py-3 bg-black text-white rounded-sm">
                Send your CV and basic info
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "vacancy" && (
        <>
          <p className="text-gray-600 mt-4">Applying for: {openVacancies[0]?.title}</p>
          <ApplicationForm {...applicationFormProps} onSubmit={() => handleSubmit("vacancy", openVacancies[0]?.title)} />
        </>
      )}

      {mode === "open-cv" && (
        <>
          <p className="text-gray-600 mt-4">Send your CV and basic info — we'll call when a role opens up.</p>
          <ApplicationForm {...applicationFormProps} onSubmit={() => handleSubmit("open-cv")} />
        </>
      )}

      {mode === "intern" && (
        <>
          <p className="text-gray-600 mt-4">Applying as: {internType?.replace("_", " ")} intern</p>
          <ApplicationForm {...applicationFormProps} onSubmit={() => handleSubmit("intern")} />
        </>
      )}
    </div>
  );
}
