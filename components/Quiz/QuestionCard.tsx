"use client";

import { useTranslations } from "next-intl";
import SubmitButton from "./SubmitButton";

export interface Question {
  id: string;
  category: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  questionData: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  feedback: string | null;
  onSubmit: () => void;
}

export default function QuestionCard({
  questionData,
  selectedAnswer,
  onSelectAnswer,
  feedback,
  onSubmit,
}: QuestionCardProps) {
  const t = useTranslations("quiz");

  return (
    <div className="w-full max-w-2xl p-6 space-y-4 bg-[var(--bg-card)] rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-center">
        {questionData.question}
      </h3>
      <div className="space-y-2">
        {questionData.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => onSelectAnswer(answer)}
            className={`w-full p-3 text-center cursor-pointer rounded transition ${
              selectedAnswer === answer
                ? "bg-[var(--accent)]"
                : "bg-[var(--second-bg)] hover:bg-[var(--accent)]"
            }`}
            disabled={feedback !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      {feedback && <div className="mt-4 font-bold text-center">{feedback}</div>}
      <SubmitButton
        onClick={onSubmit}
        disabled={!selectedAnswer || feedback !== null}
      >
        {t("submit")}
      </SubmitButton>
    </div>
  );
}
