import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useQuizData = ({ quizId }:  {
  quizId: string;
}) => {
  const getQuiz = async () => {
    console.log("GET QUIZ");
    const { data } = await axios.get(`/api/quiz/${quizId}`);
    return data;
  };

  return useQuery({
    queryKey: ["quizData", quizId],
    queryFn: getQuiz,
    enabled: !!quizId,
    select: (data) => data,
  });
};

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
