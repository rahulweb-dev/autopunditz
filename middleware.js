import { NextResponse } from "next/server";

export function middleware(req) {

  const pathname =
    req.nextUrl.pathname;

  // ✅ Allow Login Page
  if (
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  // ✅ Read Token
  const token =
    req.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  // ✅ No Token
  if (!token) {

    return NextResponse.redirect(
      new URL(
        "/admin/login",
        req.url
      )
    );
  }

  // ✅ Allow Access
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};