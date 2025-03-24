"use client";
import { CategoryCard } from "@/components/Quiz/CategoryCard";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  title: string;
  description?: string;
}

interface PageProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: PageProps) {
  const { locale } = params;
  const t = useTranslations("home");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await import(
          `../../data/categories/categories_${locale}.json`
        );
        const loadedCategories: Category[] = categoriesData.categories;
        setCategories([...loadedCategories]);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    fetchCategories();
  }, [locale, t]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-bg-main text-text-main">
      <h1 className="m-4 text-2xl font-bold text-center md:m-6 md:text-3xl drop-shadow-lg">
        {t("welcome", { defaultValue: "Bienvenue sur TheQuizQuest" })}
      </h1>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:mt-16">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat.id}
            title={cat.title}
            description={cat.description}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
