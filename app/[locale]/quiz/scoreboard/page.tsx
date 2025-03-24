"use client";
import ScoreCard from "@/components/Quiz/ScoreCard";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ScoreboardPageProps {
  params: {
    locale: string;
  };
}

export default function ScoreboardPage({ params }: ScoreboardPageProps) {
  const { locale } = params;
  const t = useTranslations("quiz");
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const lastScore = localStorage.getItem("lastScore");
    if (lastScore) {
      const { score: lastScoreValue, total: lastScoreTotal } =
        JSON.parse(lastScore);
      setScore(lastScoreValue);
      setTotal(lastScoreTotal);
    }

    const cleanupSession = () => {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("quiz_session_")) {
          sessionStorage.removeItem(key);
        }
      });
    };

    cleanupSession();

    const handlePopState = () => {
      cleanupSession();
      router.push(`/${locale}`);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [locale, router]);

  const handleGoHome = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("quiz_session_")) {
        sessionStorage.removeItem(key);
      }
    });
    router.push(`/${locale}`);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4 bg-bg-main">
      <ScoreCard
        score={score}
        total={total}
        onGoHome={handleGoHome}
        homeText={t("home")}
        scoreText={t("scoreboardTitle")}
      />
    </div>
  );
}
