// app/[locale]/page.tsx
"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home"); // On suppose que ton fichier messages contient une clé "home"

  return (
    <div className="p-8 bg-bg-main text-text-main">
      <h1 className="m-6 text-3xl font-bold text-center text-text-main">
        {t("welcome", { defaultValue: "Bienvenue sur TheQuizQuest" })}
      </h1>
      <p className="p-8 text-center text-text-secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
