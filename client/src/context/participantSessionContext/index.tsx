/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ParticipantSessionData } from "./types";
import { useParticipantSessionData } from "@/queries/sessionData";
import { useNavigate, useParams } from "react-router-dom";
import { RefetchOptions } from "@tanstack/react-query";
import { SocketProvider } from "../socketContext";
import { API } from "@/api";

const ParticipantContext = createContext<ParticipantSessionData>(
  {} as ParticipantSessionData
);

export default function ParticipantSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
    null
  );
  const [roundStatus, setRoundStatus] = useState<RoundStatus>("waiting");
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("pending");

  useEffect(() => {
    const hostSession = localStorage.getItem("QUIZIKAL_USER");
    if (hostSession) navigate("/");
  }, []);

  const { multiCode } = useParams();
  const {
    data,
    error: queryError,
    refetch,
  } = useParticipantSessionData({ multiCode });

  const wrappedRefetch = async (options?: RefetchOptions): Promise<void> => {
    await refetch(options); // Await and ignore the result
  };

  const handleSessionUpdate = async (
    payload: Partial<SessionClientPayload>
  ) => {
    console.log("PAYLOAD", payload);
    const { roundIdx, questionIdx, sessionStatus, roundStatus, questionData } =
      payload;

    if ("roundIdx" in payload) setRoundIdx(roundIdx!);
    if ("questionIdx" in payload) {
      setQuestionIdx(questionIdx!);
    }
    if ("roundStatus" in payload) setRoundStatus(roundStatus!);
    if ("sessionStatus" in payload) setSessionStatus(sessionStatus!);
    if ("questionData" in payload) setCurrentQuestion(questionData!);
  };

  const refetchQuestionData = async () => {
    if (!data) return;
    const { data: questionData } = await API.round.getClientQuestion({
      userId: data?.userData?.id,
      sessionCode: data?.sessionCode,
      roundIdx,
      questionIdx,
    });
    console.log({ questionData });
    if (questionData) setCurrentQuestion(questionData);
  };

  useEffect(() => {
    refetchQuestionData();
  }, [roundIdx, questionIdx]);

  const memoizedSessionCode = useMemo(
    () => data?.sessionCode ?? "",
    [data?.sessionCode]
  );
  const memoizedUserData = useMemo(
    () => ({
      userId: data?.userData?.id ?? "",
      username: data?.userData?.username ?? "",
    }),
    [data?.userData?.id, data?.userData?.username]
  );

  if (queryError) return <h1>{queryError?.message}</h1>;

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
        refetch: wrappedRefetch,
        handleSessionUpdate,
      }}
    >
      <SocketProvider
        sessionCode={memoizedSessionCode}
        userData={memoizedUserData}
      >
        {children}
      </SocketProvider>
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
