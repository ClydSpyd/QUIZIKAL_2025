import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useSessionData = ({
  sessionCode,
}: {
  sessionCode: string | undefined;
}) => {
  const getSession = async (): Promise<{
    session: SessionData;
    quizData: QuizData;
  }> => {
    const { data } = await axios.get(`/api/session/${sessionCode}`);
    return data;
  };

  return useQuery({
    queryKey: ["sessionData", sessionCode],
    queryFn: getSession,
    enabled: !!sessionCode,
    select: (data) => data,
  });
};
