import { NextResponse } from "next/server";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(
      payload.replace(/-/g, "+").replace(/_/g, "/")
    );
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function proxy(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const payload = decodeJWT(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Writer: only /admin/blogs and /admin/blogs/editor/* are allowed
  if (payload.role === "writer") {
    const allowed =
      pathname === "/admin/blogs" ||
      pathname.startsWith("/admin/blogs/");

    if (!allowed) {
      return NextResponse.redirect(new URL("/admin/blogs", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
