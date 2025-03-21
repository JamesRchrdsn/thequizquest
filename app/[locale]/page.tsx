"use client";
import CategoryCard from "@/components/Quiz/CategoryCard";
import { useTranslations } from "next-intl";
import { use, useEffect, useState } from "react";

interface Category {
  id: string;
  title: string;
  description?: string;
}

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("home");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await import(
          `../../data/categories/categories_${locale}.json`
        );
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    fetchCategories();
  }, [locale]);

  return (
    <div className="p-8 bg-bg-main text-text-main">
      <h1 className="m-6 text-3xl font-bold text-center">
        {t("welcome", { defaultValue: "Bienvenue sur TheQuizQuest" })}
      </h1>

      <div className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((cat: Category) => (
          <CategoryCard
            key={cat.id}
            category={cat.id}
            title={cat.title}
            description={cat.description}
          />
        ))}
      </div>
    </div>
  );
}
