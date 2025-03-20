"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");

  return (
    <footer className="p-4 text-center bg-[var(--card-bg)] border-t border-[var(--text-secondary)]">
      <p className="text-sm">
        &copy; {currentYear}{" "}
        {t("copyright", { defaultValue: "All rights reserved" })}
      </p>
    </footer>
  );
}
