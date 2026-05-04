import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  // public pages (NO auth required)
  const isPublicPage = isLoginPage || isRegisterPage;

  // 🚫 No token → only allow public pages
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 Logged in → block login/register pages
  if (token && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)",
  ],
};