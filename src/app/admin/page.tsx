import { auth, signOut } from "@/auth";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen" style={{ background: "#EAE6DB" }}>
      <header className="flex items-center justify-between px-6 md:px-12 py-5" style={{ background: "#14181C" }}>
        <div style={{ color: "#EAE6DB", fontWeight: 700 }}>NEC Admin</div>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#7FA6B8" }}>{session?.user?.name}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="text-sm px-3 py-1.5 rounded-sm" style={{ background: "#B5652D", color: "#EAE6DB" }}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <AdminDashboardClient />
    </div>
  );
}
