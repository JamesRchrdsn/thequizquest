// middleware.js
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./next-intl.config";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  const ip = request.headers.get("x-forwarded-for") || request.ip;

  let countryCode = "US";

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();
    countryCode = data.countryCode || "US";
  } catch (error) {
    console.error("Erreur de géolocalisation", error);
  }

  let locale = defaultLocale;
  if (["FR", "BE", "CA", "CH"].includes(countryCode)) {
    locale = "fr";
  } else if (["ES", "MX", "AR", "CO"].includes(countryCode)) {
    locale = "es";
  } else {
    locale = "en";
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/"],
};
