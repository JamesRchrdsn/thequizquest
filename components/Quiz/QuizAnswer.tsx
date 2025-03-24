"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Question } from "./QuestionCard";

interface QuizAnswerProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizAnswer({ question, onAnswer }: QuizAnswerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("quiz");

  useEffect(() => {
    if (cardRef.current) {
      setCardDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, [feedback]);

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

  const isCorrect = feedback === t("correct");

  return (
    <div className="w-full max-w-2xl">
      <div
        ref={cardRef}
        className={`p-6 rounded-lg shadow-md transition-colors duration-300 relative overflow-hidden ${
          feedback
            ? isCorrect
              ? "bg-green-100 dark:bg-green-900"
              : "bg-red-700 shake-animation"
            : "bg-[var(--bg-card)]"
        }`}
      >
        {isCorrect && (
          <div className="absolute inset-0">
            <Confetti
              width={cardDimensions.width}
              height={cardDimensions.height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.2}
              initialVelocityY={15}
              tweenDuration={1000}
              colors={["#FFD700", "#FFA500", "#FF6347", "#98FB98"]}
              confettiSource={{
                x: cardDimensions.width / 3,
                y: cardDimensions.height - 50,
                w: cardDimensions.width / 180,
                h: 0,
              }}
            />
          </div>
        )}
        <div className="relative z-10">
          <h3 className="mb-4 text-lg font-semibold">{question.question}</h3>
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <button
                key={answer}
                onClick={() => setSelectedAnswer(answer)}
                className={`w-full p-3 cursor-pointer text-center rounded-md transition-colors ${
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
            {feedback ? (
              <span className="font-bold">
                {isCorrect ? "✨ " : "❌ "}
                {feedback}
              </span>
            ) : (
              t("submit")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
