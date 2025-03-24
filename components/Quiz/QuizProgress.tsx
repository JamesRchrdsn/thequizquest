import { useTranslations } from "next-intl";

interface QuizProgressProps {
  currentIndex: number;
  total: number;
  score: number;
}

export function QuizProgress({
  currentIndex,
  total,
  score,
}: QuizProgressProps) {
  const t = useTranslations("quiz");

  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-xl font-bold">
        {t("question")} {currentIndex + 1}/{total}
      </h2>
      <div className="text-sm">
        {t("score")}: {score}
      </div>
    </div>
  );
}
