"use client";
import Link from "next/link";

interface CategoryCardProps {
  category: string;
  title: string;
  description?: string;
}

export default function CategoryCard({
  category,
  title,
  description,
}: CategoryCardProps) {
  return (
    <Link
      href={`/quiz?category=${encodeURIComponent(category)}`}
      className="block p-4 transition border rounded-lg shadow bg-[var(--bg-card)] hover:bg-[var(--accent)] hover:shadow-xl"
    >
      <h2 className="mb-1 text-xl font-bold text-center">{title}</h2>
      {description && (
        <p className="text-sm text-center text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </Link>
  );
}
