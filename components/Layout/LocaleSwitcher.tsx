"use client";
import { usePathname, useRouter } from "next/navigation";
import Flag from "react-flagkit";
import { locales } from "../../next-intl.config";

interface LocaleSwitcherProps {
  currentLocale: string;
}

const localeToCountry: { [key: string]: string } = {
  en: "GB",
  fr: "FR",
  es: "ES",
};

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex space-x-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          disabled={loc === currentLocale}
          className={`p-1 rounded ${
            loc === currentLocale
              ? "bg-[var(--accent)] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          }`}
        >
          <Flag
            className="cursor-pointer"
            country={localeToCountry[loc]}
            size={24}
          />
        </button>
      ))}
    </div>
  );
}
