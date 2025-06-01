import { useCallback, useState } from 'react';

const LS_KEY = 'quizikal_questions';

export interface LSQuestion {
    question: string;
    answer: string;
}

export function useLSQuestions() {
    const [savedQuestions, setSavedQuestions] = useState<LSQuestion[]>(() => {
        const data = localStorage.getItem(LS_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data) as LSQuestion[];
        } catch {
            return [];
        }
    });

    const saveQuestions = useCallback((questions: LSQuestion[]) => {
        setSavedQuestions(questions);
        localStorage.setItem(LS_KEY, JSON.stringify(questions));
    }, []);

    const addQuestion = useCallback(
      (q: LSQuestion): boolean => {
        const questions = [...savedQuestions];
        const exists = questions.some(
          (item) => item.question === q.question && item.answer === q.answer
        );
        if (exists) {
          console.warn('Question already exists in saved questions.');
          return false;
        }
        questions.push(q);
        saveQuestions(questions);
        return true
      },
      [saveQuestions, savedQuestions]
    );

    const removeQuestion = useCallback((index: number) => {
        const questions = [...savedQuestions];
        questions.splice(index, 1);
        saveQuestions(questions);
    }, [savedQuestions, saveQuestions]);

    const clearQuestions = useCallback(() => {
        localStorage.removeItem(LS_KEY);
    }, []);

    return {
        savedQuestions,
        saveQuestions,
        addQuestion,
        removeQuestion,
        clearQuestions,
    };
}