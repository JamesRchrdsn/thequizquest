// middleware.js
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./next-intl.config";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Si l'URL contient déjà une locale, ne rien faire
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // Détecter l'IP du visiteur
  const ip = request.headers.get("x-forwarded-for") || request.ip;

  let countryCode = "US"; // Valeur par défaut

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();
    countryCode = data.countryCode || "US";
  } catch (error) {
    console.error("Erreur de géolocalisation", error);
  }

  // Choisir la locale en fonction du pays détecté
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
  matcher: ["/"], // Appliquer sur la racine et éventuellement d'autres routes
};
