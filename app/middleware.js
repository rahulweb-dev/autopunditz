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

  // ✅ Allow APIs
  if (
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // ✅ Get Cookie
  const token =
    req.cookies.get(
      "token"
    )?.value;

  // ✅ No Token
  if (!token) {

    return NextResponse.redirect(
      new URL(
        "/admin/login",
        req.url
      )
    );
  }

  try {

    // ✅ Decode JWT
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log(
      "ROLE:",
      decoded.role
    );

    // ======================
    // ✅ WRITER ACCESS
    // ======================

    if (
      decoded.role ===
      "writer"
    ) {

      // ❌ Block Dashboard
      if (
        pathname.startsWith(
          "/admin/dashboard"
        )
      ) {

        return NextResponse.redirect(
          new URL(
            "/admin/blogs",
            req.url
          )
        );
      }

      // ❌ Block Users
      if (
        pathname.startsWith(
          "/admin/users"
        )
      ) {

        return NextResponse.redirect(
          new URL(
            "/admin/blogs",
            req.url
          )
        );
      }

      // ❌ Block Settings
      if (
        pathname.startsWith(
          "/admin/settings"
        )
      ) {

        return NextResponse.redirect(
          new URL(
            "/admin/blogs",
            req.url
          )
        );
      }
    }

    // ✅ Allow Access
    return NextResponse.next();

  } catch (error) {

    console.log(error);

    return NextResponse.redirect(
      new URL(
        "/admin/login",
        req.url
      )
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};