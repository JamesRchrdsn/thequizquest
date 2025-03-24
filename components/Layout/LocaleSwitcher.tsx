"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Flag from "react-flagkit";

interface LocaleSwitcherProps {
  currentLocale: string;
  isMobile?: boolean;
}

const localeToCountry: { [key: string]: string } = {
  en: "GB",
  fr: "FR",
  es: "ES",
};

export default function LocaleSwitcher({
  currentLocale,
  isMobile = false,
}: LocaleSwitcherProps) {
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
    <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-2"}`}>
      {Object.entries(localeToCountry).map(([loc, country]) => (
        <Link
          key={loc}
          href={redirectedPathName(loc)}
          className={`${
            currentLocale === loc
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          } cursor-pointer p-1 rounded flex items-center ${
            isMobile ? "justify-start space-x-2 w-full" : ""
          }`}
        >
          <Flag country={country} size={24} />
          {isMobile && <span className="ml-2">{loc.toUpperCase()}</span>}
        </Link>
      ))}
    </div>
  );
}
