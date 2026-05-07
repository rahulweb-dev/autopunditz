import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {

  const pathname =
    req.nextUrl.pathname;

  // ✅ Allow Login
  if (
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  const token =
    req.cookies.get("token")?.value;

  // ✅ No Token
  if (!token) {

    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ Admin Only
    if (
      pathname.startsWith(
        "/admin/users"
      ) &&
      decoded.role !== "admin"
    ) {

      return NextResponse.redirect(
        new URL(
          "/admin/dashboard",
          req.url
        )
      );
    }

    return NextResponse.next();

  } catch (err) {

    console.log(err);

    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};