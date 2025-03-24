"use client";

interface ScoreCardProps {
  score: number;
  total: number;
  onGoHome: () => void;
  homeText: string;
  scoreText: string;
}

export default function ScoreCard({
  score,
  total,
  onGoHome,
  homeText,
  scoreText,
}: ScoreCardProps) {
  const percentage = (score / total) * 100;

  return (
    <div className="w-full max-w-md p-6 bg-[var(--bg-card)] rounded-lg shadow-lg">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">{scoreText}</h2>

        <div className="flex flex-col items-center space-y-2">
          <div className="text-4xl font-bold text-[var(--accent)]">
            {score} / {total}
          </div>
          <div className="text-xl text-[var(--text-secondary)]">
            {percentage.toFixed(0)}%
          </div>
        </div>

        <div className="relative w-32 h-32 mx-auto my-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="stroke-[var(--bg-main)] fill-none"
              cx="50"
              cy="50"
              r="45"
              strokeWidth="8"
            />
            <circle
              className="stroke-[var(--accent)] fill-none"
              cx="50"
              cy="50"
              r="45"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.827} 282.7`}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <button
          onClick={onGoHome}
          className="w-full py-3 px-6 bg-[var(--accent)] cursor-pointer text-white rounded-lg 
                   hover:bg-[var(--accent-2)] transition-colors duration-200 
                   font-semibold shadow-md hover:shadow-lg"
        >
          {homeText}
        </button>
      </div>
    </div>
  );
}
