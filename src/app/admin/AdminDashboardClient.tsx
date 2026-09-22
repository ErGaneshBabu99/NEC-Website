"use client";

import { useEffect, useState } from "react";
import { bsToAd, formatBs, daysInBsMonth, BS_MONTH_NAMES, todayBs } from "@/lib/nepaliDate";

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string | null;
  bloodGroup: string | null;
  gender: string | null;
  birthDate: string | null;
  active: boolean;
};

const STATUS_COLOR: Record<string, string> = {
  PRESENT: "#2FA893",
  LATE: "#E8A33D",
  ABSENT: "#E1553F",
  LEAVE: "#7FA6B8",
  HALF_DAY: "#7C5CE0",
};

const emptyForm = {
  name: "", email: "", phone: "", password: "", position: "",
  bloodGroup: "", gender: "", birthDate: "", photoUrl: "",
};

export default function AdminDashboardClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<typeof emptyForm>(emptyForm);
  const [holidays, setHolidays] = useState<{ id: string; date: string; label: string }[]>([]);
  const [newHoliday, setNewHoliday] = useState({ year: todayBs().year, month: todayBs().month, day: 1, label: "" });
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [correctionRequests, setCorrectionRequests] = useState<any[]>([]);
  const [summary, setSummary] = useState<{ byStatus: Record<string, number>; byEmployee: any[] } | null>(null);
  const [exportMonth, setExportMonth] = useState(new Date().toISOString().slice(0, 7));

  async function loadRequests() {
    const [lr, cr, sm] = await Promise.all([
      fetch("/api/admin/leave-requests").then((r) => r.json()),
      fetch("/api/admin/correction-requests").then((r) => r.json()),
      fetch("/api/admin/attendance/summary").then((r) => r.json()),
    ]);
    setLeaveRequests(lr.requests ?? []);
    setCorrectionRequests(cr.requests ?? []);
    setSummary(sm);
  }

  async function decideLeave(id: string, status: "APPROVED" | "REJECTED") {
    await fetch(`/api/admin/leave-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadRequests();
  }

  async function decideCorrection(id: string, status: "APPROVED" | "REJECTED") {
    await fetch(`/api/admin/correction-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadRequests();
  }

  async function loadHolidays() {
    const res = await fetch("/api/admin/holidays");
    const data = await res.json();
    setHolidays(data.holidays ?? []);
  }

  async function addHoliday(e: React.FormEvent) {
    e.preventDefault();
    if (!newHoliday.label) return;
    const adDate = bsToAd(newHoliday.year, newHoliday.month, newHoliday.day);
    await fetch("/api/admin/holidays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: adDate.toISOString(), label: newHoliday.label }),
    });
    setNewHoliday({ year: todayBs().year, month: todayBs().month, day: 1, label: "" });
    loadHolidays();
  }

  async function removeHoliday(id: string) {
    await fetch(`/api/admin/holidays/${id}`, { method: "DELETE" });
    loadHolidays();
  }

  async function loadEmployees() {
    setLoading(true);
    const res = await fetch("/api/admin/employees");
    const data = await res.json();
    setEmployees(data.employees ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadEmployees();
    loadHolidays();
    loadRequests();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(emptyForm);
        setShowForm(false);
        loadEmployees();
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to create employee");
      }
    } finally {
      setSaving(false);
    }
  }

  function startEdit(emp: Employee) {
    setEditingId(emp.id);
    setEditForm({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      password: "",
      position: emp.position ?? "",
      bloodGroup: emp.bloodGroup ?? "",
      gender: emp.gender ?? "",
      birthDate: emp.birthDate ? emp.birthDate.slice(0, 10) : "",
      photoUrl: "",
    });
  }

  async function handleUpdate(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setEditingId(null);
        loadEmployees();
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to update employee");
      }
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(emp: Employee) {
    const label = emp.active ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${label} ${emp.name}?`)) return;
    if (emp.active) {
      await fetch(`/api/admin/employees/${emp.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/admin/employees/${emp.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: true }),
      });
    }
    loadEmployees();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#14181C" }}>Employees</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-sm rounded-sm font-medium"
          style={{ background: "#14181C", color: "#EAE6DB" }}
        >
          {showForm ? "Cancel" : "+ Add employee"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 p-6 rounded-lg grid sm:grid-cols-2 gap-3" style={{ background: "#fff" }}>
          <input placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <input placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <input placeholder="Login password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <input placeholder="Blood group" value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="border px-3 py-2 rounded-sm text-sm">
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <input placeholder="Birthdate" type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 block mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const uploadData = new FormData();
                uploadData.append("file", file);
                uploadData.append("folder", "photos");
                const res = await fetch("/api/upload", { method: "POST", body: uploadData });
                const data = await res.json();
                if (res.ok) setForm({ ...form, photoUrl: data.url });
                else alert(data.error ?? "Photo upload failed");
              }}
              className="text-sm"
            />
          </div>
          <button disabled={saving} className="sm:col-span-2 py-2.5 rounded-sm text-sm font-semibold disabled:opacity-50" style={{ background: "#B5652D", color: "#EAE6DB" }}>
            {saving ? "Saving…" : "Create employee"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : employees.length === 0 ? (
        <p className="text-sm text-gray-500">No employees yet — add the first one above.</p>
      ) : (
        <div className="space-y-2">
          {employees.map((emp) =>
            editingId === emp.id ? (
              <div key={emp.id} className="p-6 rounded-lg grid sm:grid-cols-2 gap-3" style={{ background: "#fff", border: "2px solid #3E6E86" }}>
                <input placeholder="Full name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <input placeholder="Email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <input placeholder="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <input placeholder="New password (leave blank to keep)" type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <input placeholder="Position" value={editForm.position} onChange={(e) => setEditForm({ ...editForm, position: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <input placeholder="Blood group" value={editForm.bloodGroup} onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <select value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className="border px-3 py-2 rounded-sm text-sm">
                  <option value="">Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                <input placeholder="Birthdate" type="date" value={editForm.birthDate} onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })} className="border px-3 py-2 rounded-sm text-sm" />
                <div className="sm:col-span-2 flex gap-3">
                  <button disabled={saving} onClick={() => handleUpdate(emp.id)} className="flex-1 py-2.5 rounded-sm text-sm font-semibold disabled:opacity-50" style={{ background: "#2FA893", color: "#fff" }}>
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button onClick={() => setEditingId(null)} className="flex-1 py-2.5 rounded-sm text-sm font-semibold" style={{ background: "#DCD7C9", color: "#14181C" }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={emp.id} className="flex items-center justify-between p-4 rounded-sm" style={{ background: "#fff" }}>
                <div>
                  <div className="font-semibold" style={{ color: "#14181C" }}>{emp.name}</div>
                  <div className="text-sm text-gray-500">{emp.position || "—"} · {emp.email} · {emp.phone}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: emp.active ? "#2FA89322" : "#E1553F22", color: emp.active ? "#2FA893" : "#E1553F" }}>
                    {emp.active ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => startEdit(emp)} className="text-xs px-3 py-1.5 rounded-sm font-medium" style={{ background: "#EAE6DB", color: "#14181C" }}>
                    Edit
                  </button>
                  <button onClick={() => toggleActive(emp)} className="text-xs px-3 py-1.5 rounded-sm font-medium" style={{ background: emp.active ? "#E1553F22" : "#2FA89322", color: emp.active ? "#E1553F" : "#2FA893" }}>
                    {emp.active ? "Deactivate" : "Reactivate"}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <h1 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#14181C" }}>Holiday calendar</h1>
      <p className="text-sm text-gray-500 mb-4">
        Dates listed here won't count as late even if someone checks in past the usual start time.
      </p>
      <form onSubmit={addHoliday} className="flex gap-3 mb-4 flex-wrap">
        <select value={newHoliday.year} onChange={(e) => setNewHoliday({ ...newHoliday, year: Number(e.target.value) })} className="border px-3 py-2 rounded-sm text-sm">
          {Array.from({ length: 6 }, (_, i) => todayBs().year - 1 + i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={newHoliday.month} onChange={(e) => setNewHoliday({ ...newHoliday, month: Number(e.target.value), day: 1 })} className="border px-3 py-2 rounded-sm text-sm">
          {BS_MONTH_NAMES.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
        <select value={newHoliday.day} onChange={(e) => setNewHoliday({ ...newHoliday, day: Number(e.target.value) })} className="border px-3 py-2 rounded-sm text-sm">
          {Array.from({ length: daysInBsMonth(newHoliday.year, newHoliday.month) }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input placeholder="Label (e.g. Dashain)" value={newHoliday.label} onChange={(e) => setNewHoliday({ ...newHoliday, label: e.target.value })} className="border px-3 py-2 rounded-sm text-sm flex-1 min-w-[160px]" />
        <button className="px-4 py-2 rounded-sm text-sm font-medium" style={{ background: "#14181C", color: "#EAE6DB" }}>Add</button>
      </form>
      <div className="space-y-2">
        {holidays.map((h) => (
          <div key={h.id} className="flex items-center justify-between px-4 py-2.5 rounded-sm text-sm" style={{ background: "#fff" }}>
            <span style={{ color: "#14181C" }}>
              {formatBs(new Date(h.date))} — {h.label}
            </span>
            <button onClick={() => removeHoliday(h.id)} className="text-xs" style={{ color: "#E1553F" }}>Remove</button>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#14181C" }}>Attendance overview (last 30 days)</h1>
      {summary && (
        <div className="mb-8">
          <div className="flex gap-6 items-end h-32 mb-2">
            {Object.entries(summary.byStatus).map(([status, count]) => (
              <div key={status} className="flex flex-col items-center gap-2">
                <div style={{ width: 32, height: `${Math.min(100, count * 4)}px`, background: STATUS_COLOR[status] ?? "#3E6E86", borderRadius: 4 }} />
                <span className="text-xs text-gray-500">{status}</span>
                <span className="text-xs font-semibold" style={{ color: "#14181C" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-12">
        <input type="month" value={exportMonth} onChange={(e) => setExportMonth(e.target.value)} className="border px-3 py-2 rounded-sm text-sm" />
        <a
          href={`/api/admin/attendance/export?month=${exportMonth}`}
          className="px-4 py-2 rounded-sm text-sm font-medium"
          style={{ background: "#14181C", color: "#EAE6DB" }}
        >
          Download CSV
        </a>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: "#14181C" }}>Pending leave requests</h1>
      <div className="space-y-2 mb-12">
        {leaveRequests.filter((r) => r.status === "PENDING").length === 0 && (
          <p className="text-sm text-gray-500">No pending leave requests.</p>
        )}
        {leaveRequests.filter((r) => r.status === "PENDING").map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 rounded-sm text-sm" style={{ background: "#fff" }}>
            <div>
              <div className="font-semibold" style={{ color: "#14181C" }}>{r.employee.name}</div>
              <div className="text-gray-500">
                {new Date(r.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – {new Date(r.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {r.reason}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => decideLeave(r.id, "APPROVED")} className="px-3 py-1.5 rounded-sm text-xs font-medium" style={{ background: "#2FA89322", color: "#2FA893" }}>Approve</button>
              <button onClick={() => decideLeave(r.id, "REJECTED")} className="px-3 py-1.5 rounded-sm text-xs font-medium" style={{ background: "#E1553F22", color: "#E1553F" }}>Reject</button>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: "#14181C" }}>Pending check-out fix requests</h1>
      <div className="space-y-2">
        {correctionRequests.filter((r) => r.status === "PENDING").length === 0 && (
          <p className="text-sm text-gray-500">No pending fix requests.</p>
        )}
        {correctionRequests.filter((r) => r.status === "PENDING").map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 rounded-sm text-sm" style={{ background: "#fff" }}>
            <div>
              <div className="font-semibold" style={{ color: "#14181C" }}>{r.employee.name}</div>
              <div className="text-gray-500">
                {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · requested check-out {new Date(r.requestedTimeOut).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · {r.reason}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => decideCorrection(r.id, "APPROVED")} className="px-3 py-1.5 rounded-sm text-xs font-medium" style={{ background: "#2FA89322", color: "#2FA893" }}>Approve</button>
              <button onClick={() => decideCorrection(r.id, "REJECTED")} className="px-3 py-1.5 rounded-sm text-xs font-medium" style={{ background: "#E1553F22", color: "#E1553F" }}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
