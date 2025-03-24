"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Confetti from "react-confetti";
import { Question } from "./QuestionCard";

interface QuizAnswerProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizAnswer({ question, onAnswer }: QuizAnswerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const t = useTranslations("quiz");

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setFeedback(isCorrect ? t("correct") : t("incorrect"));
    onAnswer(isCorrect);
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-md bg-[var(--bg-card)]">
        <h3 className="mb-4 text-lg font-semibold">{question.question}</h3>
        <div className="space-y-3">
          {question.answers.map((answer) => (
            <button
              key={answer}
              onClick={() => setSelectedAnswer(answer)}
              className={`w-full p-3 text-left cursor-pointer rounded-md transition-colors ${
                selectedAnswer === answer
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--second-bg)] hover:bg-[var(--accent)]"
              }`}
              disabled={!!feedback}
            >
              {answer}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || !!feedback}
          className={`mt-6 w-full py-2 px-4 rounded-md ${
            !selectedAnswer || !!feedback
              ? "bg-[var(--accent-2)] cursor-not-allowed"
              : "bg-[var(--accent)] text-white hover:bg-[var(--accent-2)] cursor-pointer"
          }`}
        >
          {t("submit")}
        </button>
      </div>

      {feedback && (
        <div
          className={`w-full max-w-2xl p-3 rounded-md text-center transition-all duration-300 relative overflow-hidden ${
            feedback === t("correct")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700 shake-animation"
          }`}
        >
          {feedback === t("correct") && (
            <Confetti
              width={400}
              height={60}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              initialVelocityY={15}
              tweenDuration={1000}
              colors={["#FFD700", "#FFA500", "#FF6347", "#98FB98"]}
            />
          )}
          <span className="relative z-10 font-bold">
            {feedback === t("correct") ? "✨ " : "❌ "}
            {feedback}
          </span>
        </div>
      )}
    </div>
  );
}
