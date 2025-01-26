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

export const useParticipantSessionData = ({
  multiCode,
}: {
  multiCode: string | undefined;
}) => {
  const getSession = async (): Promise<ParticipantSessionData> => {
    const { data } = await axios.get(`/api/session/participant/${multiCode}`);
    return data;
  };

  return useQuery({
    queryKey: ["sessionData", multiCode],
    queryFn: getSession,
    enabled: !!multiCode,
    select: (data) => data,
    retry: false,
  });
};
