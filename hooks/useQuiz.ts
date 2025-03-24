"use client";
import { Question } from "@/components/Quiz/QuestionCard";
import { useEffect, useState } from "react";

export function useQuiz(locale: string, categoryParam: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const sessionKey = `quiz_session_${categoryParam}`;

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    async function loadQuestions() {
      try {
        const questionsModule = await import(
          `@/data/questions/questions_${locale}.json`
        );
        let allQuestions: Question[] = questionsModule.questions;

        const existingSession = sessionStorage.getItem(sessionKey);
        if (existingSession) {
          const sessionData = JSON.parse(existingSession);
          const selectedQuestions = sessionData.questionIds.map(
            (id: string) => {
              const question = allQuestions.find((q) => q.id === id)!;
              return {
                ...question,
                answers: shuffleArray([...question.answers]),
                correctAnswer: question.correctAnswer,
              };
            }
          );
          setQuestions(selectedQuestions);
          setCurrentIndex(sessionData.currentIndex);
          setScore(sessionData.score);
          setLoading(false);
          return;
        }

        if (categoryParam !== "all" && categoryParam !== "random") {
          allQuestions = allQuestions.filter(
            (q) => q.category === categoryParam
          );
        } else if (categoryParam === "random") {
          const categories = Array.from(
            new Set(allQuestions.map((q) => q.category))
          );
          const randomCategory =
            categories[Math.floor(Math.random() * categories.length)];
          allQuestions = allQuestions.filter(
            (q) => q.category === randomCategory
          );
        }

        const shuffledQuestions = shuffleArray([...allQuestions]);
        const selected = shuffledQuestions.slice(0, 10);

        const selectedWithShuffledAnswers = selected.map((question) => {
          const answers = [...question.answers];
          const shuffledAnswers = shuffleArray(answers);

          return {
            ...question,
            answers: shuffledAnswers,
            correctAnswer: question.correctAnswer,
          };
        });

        sessionStorage.setItem(
          sessionKey,
          JSON.stringify({
            questionIds: selectedWithShuffledAnswers.map((q) => q.id),
            currentIndex: 0,
            score: 0,
          })
        );

        setQuestions(selectedWithShuffledAnswers);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setLoading(false);
      }
    }
    loadQuestions();
  }, [categoryParam, locale, sessionKey]);

  const handleNextQuestion = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    if (newIndex >= questions.length) {
      localStorage.setItem(
        "lastScore",
        JSON.stringify({
          score,
          total: questions.length,
        })
      );
    }

    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || "{}");
    sessionStorage.setItem(
      sessionKey,
      JSON.stringify({
        ...sessionData,
        currentIndex: newIndex,
        score: score,
      })
    );
  };

  const updateScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey) || "{}");
    sessionStorage.setItem(
      sessionKey,
      JSON.stringify({
        ...sessionData,
        score: newScore,
      })
    );
  };

  return {
    questions,
    currentIndex,
    score,
    loading,
    handleNextQuestion,
    updateScore,
    sessionKey,
  };
}
