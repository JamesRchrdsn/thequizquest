"use client";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const handleHomeClick = () => {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith("quiz_session_")) {
        sessionStorage.removeItem(key);
      }
    });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[var(--second-bg)] shadow-lg">
      <div className="flex-1"></div>

      <div className="flex-1 text-center">
        <Link
          href={`/${locale}`}
          className="transition-opacity cursor-pointer hover:opacity-80"
          onClick={handleHomeClick}
          replace
        >
          <h1 className="text-2xl font-bold">The Quiz Quest</h1>
        </Link>
      </div>

      <div className="flex items-center justify-end flex-1 space-x-2">
        <LocaleSwitcher currentLocale={locale} />
        <ThemeToggle />
      </div>
    </header>
  );
}
