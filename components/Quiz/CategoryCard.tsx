"use client";
import Link from "next/link";

interface CategoryCardProps {
  category: string;
  title: string;
  description?: string;
  locale: string;
}

export function CategoryCard({
  category,
  title,
  description,
  locale,
}: CategoryCardProps) {
  const handleCategoryClick = () => {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith("quiz_session_")) {
        sessionStorage.removeItem(key);
      }
    });
  };

  return (
    <Link
      href={`/${locale}/quiz?category=${encodeURIComponent(category)}`}
      onClick={handleCategoryClick}
      className="p-6 bg-[var(--bg-card)] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
    </Link>
  );
}
