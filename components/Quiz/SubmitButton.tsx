"use client";

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  onClick,
  disabled,
  children,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 p-4 w-full cursor-pointer rounded transition text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[var(--accent-2)] hover:bg-[var(--accent)]"
      }`}
    >
      {children}
    </button>
  );
}
