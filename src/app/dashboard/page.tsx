import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = (session.user as any).role;
  redirect(role === "ADMIN" ? "/admin" : "/attendance");
}
