import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isEmployeeRoute = path.startsWith("/attendance") || path.startsWith("/dashboard");
  const role = (req.auth?.user as any)?.role;

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  if (isEmployeeRoute && !req.auth?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/attendance/:path*", "/dashboard"],
};
