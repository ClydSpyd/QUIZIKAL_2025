/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ParticipantSessionData } from "./types";
import { useParticipantSessionData } from "@/queries/sessionData";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/types";
import { RefetchOptions } from "@tanstack/react-query";

const ParticipantContext = createContext<ParticipantSessionData>(
  {} as ParticipantSessionData
);

export default function ParticipantSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
    null
  );
  const [roundStatus, setRoundStatus] =
    useState<RoundStatus>("pendingResponse");
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("pending");

  useEffect(() => {
    const hostSession = localStorage.getItem("QUIZIKAL_USER");
    if (hostSession) navigate("/");
  }, []);

  const { multiCode } = useParams();
  const { data, error: queryError, refetch } = useParticipantSessionData({ multiCode });
  const wrappedRefetch = async (options?: RefetchOptions): Promise<void> => {
    await refetch(options); // Await and ignore the result
  };
  useEffect(() => {
    console.log({ queryError });
    if (queryError) {
      const err = queryError as AxiosError<ErrorResponse>;
      console.log({ error: err.response?.data.error });
      setError(err.response?.data.error ?? "Something went wrong :(");
    } else {
      setError(null);
    }
  }, [queryError]);

  return (
    <ParticipantContext.Provider
      value={{
        userData: data?.userData ?? null,
        sessionName: data?.sessionName ?? "",
        sessionCode: data?.sessionCode ?? "",
        roundIdx,
        questionIdx,
        currentQuestion,
        roundStatus,
        sessionStatus,
        loading,
        error,
        refetch: wrappedRefetch,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
}

export const useParticipantSession = (): ParticipantSessionData => {
  const context = useContext(ParticipantContext);
  if (!context) {
    throw new Error(
      "usParticipantSession must be used within a ParticipantContext"
    );
  }
  return context;
};
