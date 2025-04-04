import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useQuizData = ({ quizId }:  {
  quizId: string;
}) => {
  const getQuiz = async () => {
    console.log("GET QUIZ");
    const { data }: { data: QuizData } = await axios.get(
      `/api/quiz/${quizId}`
    );
    console.log({ data })
    return data;
  };

  return useQuery({
    queryKey: ["quizData", quizId],
    queryFn: getQuiz,
    enabled: !!quizId,
    select: (data) => data,
  });
};

export const useQuestions = () => {
  const getQuestions = async () => {
    console.log("GET QUESTIONS");
    const { data }: { data: QuestionData[] } = await axios.get(`/api/question`);
    console.log({ data })
    return data;
  };

  return useQuery({
    queryKey: ["allQuestions"],
    queryFn: getQuestions,
  });
}

export const useMyQuizzes = ({ userId }:  {
  userId: string;
}) => {
  console.log({ userId });
  const getMyQuizzes = async () => {
    console.log("GET MY QUIZZES");
    const { data } = await axios.get(`/api/quiz/creator/${userId}`);
    return data;
  };

  return useQuery({
    queryKey: ["myQuizzes", userId],
    queryFn: getMyQuizzes,
    enabled: !!userId,
    select: (data) => data,
  });
};
