// This file is written by Daksh
import { NextResponse } from "next/server";

export async function middleware(request) {
  // this allows me to do a quick check to see if the user is authenticated or not, instant redirect if not :D
  const isAuthenticated = request.cookies.get("firebaseToken");
  
  const pathname = request.nextUrl.pathname;

  const isAuthPage = ["/login", "/signup"].some((path) =>
    pathname.startsWith(path)
  );

  const isProtectedPage = pathname.startsWith("/home");

  if (isAuthenticated) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}