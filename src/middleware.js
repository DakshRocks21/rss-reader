// This file is written by Daksh

import { NextResponse } from "next/server";

export async function middleware(request) {
  const isAuthenticated = request.cookies.get("firebaseToken");
  
  const pathname = request.nextUrl.pathname;

  const isAuthPage = ["/login", "/signup"].some((path) =>
    pathname.startsWith(path)
  );

  const isProtectedPage = ["/home", "/interests", "/settings"].some((path) =>
    pathname.startsWith(path)
  );

  if (isAuthenticated) {
    if (isAuthPage || pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}