import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/transactions", "/categories"];

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.includes(pathname);

  if (isProtected && !token) {
    const authUrl = new URL("/auth", request.url);

    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/categories/:path*", "/transactions/:path*"],
};
