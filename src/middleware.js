import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.get("firebaseToken");
  const pathname = request.nextUrl.pathname;

  const isAuthPage = ["/login", "/signup"].some((path) =>
    pathname.startsWith(path)
  );

  const isProtectedPage = pathname.startsWith("/home");

  if (isAuthenticated) {
    if (isAuthPage || pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected pages
  if (isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}