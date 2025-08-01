import { NextRequest, NextResponse } from "next/server";
import {
  getLocale,
  pathnameHasLocale,
  pathnameHasExtention,
} from "./lib/locale";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const hasLocale = pathnameHasLocale(pathname);
  if (hasLocale) return;
  const isResource = pathnameHasExtention(pathname);
  if (isResource) return;
  // Redirect if there is no locale
  const locale = getLocale(pathname);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /resume/get-started
  // The new URL is now /en/resume/get-started
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
