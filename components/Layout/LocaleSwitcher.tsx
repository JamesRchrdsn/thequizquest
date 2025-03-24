"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Flag from "react-flagkit";

interface LocaleSwitcherProps {
  currentLocale: string;
}

const localeToCountry: { [key: string]: string } = {
  en: "GB",
  fr: "FR",
  es: "ES",
};

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";

    const segments = pathName.split("/");
    segments[1] = locale;

    const params = searchParams.toString();
    const newPath = segments.join("/");

    return params ? `${newPath}?${params}` : newPath;
  };

  return (
    <div className="flex space-x-2">
      {Object.entries(localeToCountry).map(([loc, country]) => (
        <Link
          key={loc}
          href={redirectedPathName(loc)}
          className={`${
            currentLocale === loc
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          } cursor-pointer p-1 rounded`}
        >
          <Flag country={country} size={24} />
        </Link>
      ))}
    </div>
  );
}
