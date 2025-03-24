"use client";
import { QuizAnswer } from "@/components/Quiz/QuizAnswer";
import { QuizProgress } from "@/components/Quiz/QuizProgress";
import { useQuiz } from "@/hooks/useQuiz";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

interface QuizPageProps {
  params: Promise<{ locale: string }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") || "all";

  const {
    questions,
    currentIndex,
    score,
    loading,
    handleNextQuestion,
    updateScore,
  } = useQuiz(locale, categoryParam);

  useEffect(() => {
    localStorage.removeItem("lastScore");
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      updateScore();
    }

    if (currentIndex === questions.length - 1) {
      const finalScore = isCorrect ? score + 1 : score;
      localStorage.setItem(
        "lastScore",
        JSON.stringify({
          score: finalScore,
          total: questions.length,
        })
      );
      router.push(`/${locale}/quiz/scoreboard`);
    } else {
      handleNextQuestion();
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 mt-8 space-y-4">
      <QuizProgress
        currentIndex={currentIndex}
        total={questions.length}
        score={score}
      />
      <QuizAnswer question={questions[currentIndex]} onAnswer={handleAnswer} />
    </div>
  );
}
