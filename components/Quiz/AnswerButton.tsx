"use client";

interface AnswerButtonProps {
  answer: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AnswerButton({
  answer,
  isSelected,
  onSelect,
}: AnswerButtonProps) {
  return (
    <button
      onClick={onSelect}
      className={`p-4 border rounded transition cursor-pointer ${
        isSelected ? "bg-[var(--accent)]" : "bg-[var(--second-bg)] "
      }`}
    >
      {answer}
    </button>
  );
}
