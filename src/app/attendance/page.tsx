"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

type Attendance = {
  id: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  status: string;
  lateMinutes: number;
  earlyMinutes: number;
};

const STATUS_COLOR: Record<string, string> = {
  PRESENT: "#2FA893",
  LATE: "#E8A33D",
  ABSENT: "#E1553F",
  LEAVE: "#7FA6B8",
  HALF_DAY: "#7C5CE0",
};

export default function AttendancePage() {
  const [today, setToday] = useState<Attendance | null>(null);
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showFixForm, setShowFixForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ startDate: "", endDate: "", reason: "" });
  const [fixForm, setFixForm] = useState({ date: "", requestedTimeOut: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/attendance/checkin");
    const data = await res.json();
    setToday(data.today);
    setHistory(data.history ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function act(action: "in" | "out") {
    setActing(true);
    try {
      const res = await fetch("/api/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else await load();
    } finally {
      setActing(false);
    }
  }

  async function submitLeave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leave-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveForm),
      });
      if (res.ok) {
        setLeaveForm({ startDate: "", endDate: "", reason: "" });
        setShowLeaveForm(false);
        alert("Leave request sent — waiting for admin approval.");
      } else {
        alert((await res.json()).error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function submitFix(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/correction-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fixForm),
      });
      if (res.ok) {
        setFixForm({ date: "", requestedTimeOut: "", reason: "" });
        setShowFixForm(false);
        alert("Fix request sent — waiting for admin approval.");
      } else {
        alert((await res.json()).error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <div className="min-h-screen" style={{ background: "#EAE6DB" }}>
      <header className="flex items-center justify-between px-6 md:px-12 py-5" style={{ background: "#14181C" }}>
        <div style={{ color: "#EAE6DB", fontWeight: 700 }}>NEC Attendance</div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm px-3 py-1.5 rounded-sm"
          style={{ background: "#B5652D", color: "#EAE6DB" }}
        >
          Sign out
        </button>
      </header>

      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="p-6 rounded-lg mb-8" style={{ background: "#fff" }}>
          <div className="text-sm text-gray-500 mb-4">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-gray-500">Check-in</div>
                  <div className="text-2xl font-bold" style={{ color: "#14181C" }}>{fmt(today?.timeIn ?? null)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Check-out</div>
                  <div className="text-2xl font-bold" style={{ color: "#14181C" }}>{fmt(today?.timeOut ?? null)}</div>
                </div>
                {today?.status && (
                  <span
                    className="text-xs px-3 py-1.5 rounded-full font-semibold"
                    style={{ background: `${STATUS_COLOR[today.status]}22`, color: STATUS_COLOR[today.status] }}
                  >
                    {today.status.replace("_", " ")}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  disabled={acting || !!today?.timeIn}
                  onClick={() => act("in")}
                  className="flex-1 py-3 rounded-sm text-sm font-semibold disabled:opacity-40"
                  style={{ background: "#2FA893", color: "#fff" }}
                >
                  Check in
                </button>
                <button
                  disabled={acting || !today?.timeIn || !!today?.timeOut}
                  onClick={() => act("out")}
                  className="flex-1 py-3 rounded-sm text-sm font-semibold disabled:opacity-40"
                  style={{ background: "#3E6E86", color: "#fff" }}
                >
                  Check out
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 mb-8">
          <button onClick={() => setShowLeaveForm(!showLeaveForm)} className="flex-1 py-2.5 rounded-sm text-sm font-medium" style={{ background: "#fff", color: "#14181C" }}>
            {showLeaveForm ? "Cancel" : "Request leave"}
          </button>
          <button onClick={() => setShowFixForm(!showFixForm)} className="flex-1 py-2.5 rounded-sm text-sm font-medium" style={{ background: "#fff", color: "#14181C" }}>
            {showFixForm ? "Cancel" : "Forgot to check out?"}
          </button>
        </div>

        {showLeaveForm && (
          <form onSubmit={submitLeave} className="p-5 rounded-lg mb-8 space-y-3" style={{ background: "#fff" }}>
            <div className="flex gap-3">
              <input type="date" required value={leaveForm.startDate} onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} className="flex-1 border px-3 py-2 rounded-sm text-sm" />
              <input type="date" required value={leaveForm.endDate} onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} className="flex-1 border px-3 py-2 rounded-sm text-sm" />
            </div>
            <textarea placeholder="Reason for leave" required value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} className="w-full border px-3 py-2 rounded-sm text-sm" rows={2} />
            <button disabled={submitting} className="w-full py-2.5 rounded-sm text-sm font-semibold disabled:opacity-50" style={{ background: "#B5652D", color: "#fff" }}>
              {submitting ? "Sending…" : "Submit leave request"}
            </button>
          </form>
        )}

        {showFixForm && (
          <form onSubmit={submitFix} className="p-5 rounded-lg mb-8 space-y-3" style={{ background: "#fff" }}>
            <input type="date" required value={fixForm.date} onChange={(e) => setFixForm({ ...fixForm, date: e.target.value })} className="w-full border px-3 py-2 rounded-sm text-sm" />
            <input type="time" required value={fixForm.requestedTimeOut} onChange={(e) => setFixForm({ ...fixForm, requestedTimeOut: e.target.value })} className="w-full border px-3 py-2 rounded-sm text-sm" />
            <textarea placeholder="What happened?" required value={fixForm.reason} onChange={(e) => setFixForm({ ...fixForm, reason: e.target.value })} className="w-full border px-3 py-2 rounded-sm text-sm" rows={2} />
            <button disabled={submitting} className="w-full py-2.5 rounded-sm text-sm font-semibold disabled:opacity-50" style={{ background: "#3E6E86", color: "#fff" }}>
              {submitting ? "Sending…" : "Submit fix request"}
            </button>
          </form>
        )}

        <h2 className="text-sm font-semibold mb-3" style={{ color: "#14181C" }}>Recent days</h2>
        <div className="space-y-2">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between px-4 py-3 rounded-sm text-sm" style={{ background: "#fff" }}>
              <span style={{ color: "#14181C" }}>{new Date(h.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
              <span className="text-gray-500">{fmt(h.timeIn)} – {fmt(h.timeOut)}</span>
              <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: `${STATUS_COLOR[h.status]}22`, color: STATUS_COLOR[h.status] }}>
                {h.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
