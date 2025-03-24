"use client";
import { QuizAnswer } from "@/components/Quiz/QuizAnswer";
import { QuizProgress } from "@/components/Quiz/QuizProgress";
import { useQuiz } from "@/hooks/useQuiz";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizPageProps {
  params: {
    locale: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { locale } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category") || "all";
  const t = useTranslations("quiz");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    questions: quizQuestions,
    currentIndex,
    score: quizScore,
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

    if (currentIndex === quizQuestions.length - 1) {
      const finalScore = isCorrect ? quizScore + 1 : quizScore;
      localStorage.setItem(
        "lastScore",
        JSON.stringify({
          score: finalScore,
          total: quizQuestions.length,
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
        total={quizQuestions.length}
        score={quizScore}
      />
      <QuizAnswer
        question={quizQuestions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
