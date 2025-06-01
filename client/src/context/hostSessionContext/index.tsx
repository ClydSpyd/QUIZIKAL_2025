/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HostSessionContextData } from "./types";
import { useParams } from "react-router-dom";
import { useSessionData } from "@/queries/sessionData";
import { useAuth } from "../authContext";
import LoadingScreen from "@/components/utilityComps/LoadingScreen/LoadingScreen";
import { SocketProvider } from "../socketContext";

const SessionContext = createContext<HostSessionContextData>(
  {} as HostSessionContextData
);

export default function HostSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sessionCode, setSessionCode] = useState<string | undefined>(undefined);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("pending");
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [roundIdx, setRoundIdx] = useState<number>(0)
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const {
    data: sessionData,
    isLoading,
    error: queryError,
  } = useSessionData({ sessionCode: sessionCode });
  const { sessionSlug, sidecar } = useParams();
  console.log({ sessionData, isLoading, sessionCode });

  useEffect(() => {
    const [sessionCodeParam, userIdParam] = [
      sessionSlug!.slice(0, 5),
      sessionSlug!.slice(5),
    ];
    setSessionCode(sessionCodeParam);
    setUserId(userIdParam);
  }, [sessionSlug]);

  const handleSessionUpdate = async (
    payload: Partial<SessionClientPayload>
  ) => {
    const { roundIdx, questionIdx, sessionStatus } = payload;
    if ("roundIdx" in payload) setRoundIdx(roundIdx!);
    if ("questionIdx" in payload) setQuestionIdx(questionIdx!);
    if ("sessionStatus" in payload) setSessionStatus(sessionStatus!);
  };
    const memoizedSessionCode = useMemo(() => sessionCode ?? "", [sessionCode]);
    const memoizedUserData = useMemo(
      () => ({ username: user?.username ?? "", userId: user?.id ?? "" }),
      [user]
    );


  if (isLoading || (!sessionData || !sessionCode))
    return <LoadingScreen />;

  if (queryError)
    return <h1>{queryError?.message}</h1>;

  return (
    <SessionContext.Provider
      value={{
        sessionName: sessionData.session.sessionName,
        sessionCode,
        sessionStatus,
        roundIdx,
        questionIdx,
        quizData: sessionData.quizData,
        sidecarCode: sessionData.session.sidecarCode,
        participants: sessionData.session.participants,
        userId,
        handleSessionUpdate,
      }}
    >
      <SocketProvider
        isHost={sidecar === undefined}
        isSidecar={!!sidecar}
        sessionCode={memoizedSessionCode}
        userData={memoizedUserData}
      >
        {children}
      </SocketProvider>
    </SessionContext.Provider>
  );
}
export const useHostSession = (): HostSessionContextData => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
