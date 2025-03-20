"use client";
import { useTranslations } from "next-intl";
import ThemeToggle from "../ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("home");

  return (
    <header className="flex items-center justify-between p-4 bg-[var(--card-bg)] border-b border-[var(--text-secondary)]">
      <div className="flex-1"></div>

      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      </div>

      <div className="flex items-center justify-end flex-1 space-x-2">
        <LocaleSwitcher currentLocale={locale} />
        <ThemeToggle />
      </div>
    </header>
  );
}
