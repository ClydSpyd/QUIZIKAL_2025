/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { SessionContextData } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionData } from "@/queries/sessionData";
import { useAuth } from "../authContext";

const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sessionCode, setSessionCode] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isHost, setIsHost] = useState<boolean>(!!user);
  const [indexes, setIndexes] = useState<[number, number]>([0, 0]);
  const [uiState, setUiState] = useState<{
    loading: boolean;
    error: string | null;
  }>({ error: null, loading: false });

  const {
    data: sessionData,
    // isLoading,
    error: queryError,
  } = useSessionData({ sessionCode: sessionCode });

  const { sessionSlug } = useParams();
  const navigate = useNavigate()
  
  useEffect(() => {
    const [sessionCodeParam, userIdParam] = [
      sessionSlug!.slice(0, 5),
      sessionSlug!.slice(5),
    ];
    setSessionCode(sessionCodeParam);
    setUserId(userIdParam);
    setIsHost(!userIdParam);
  }, [sessionSlug]);


  useEffect(() => {
    if (
      sessionData &&
      userId &&
      !Object.keys(sessionData.session.participants).includes(userId)
    ) {
      console.log({ userId, sessionData });
      setUiState((prev) => ({ ...prev, error: "USER NOT FOUND" }));
      navigate("/");
    }
  }, [sessionData]);

  console.log({ sessionSlug });
  console.log("HELLO");

  if (!sessionData || !sessionCode) return <h1>Ö</h1>;
  
  if (uiState.error || queryError)
    return <h1>{uiState.error ?? queryError?.message}</h1>;

  return (
    <SessionContext.Provider
      value={{
        sessionName: sessionData.session.sessionName,
        quizData: sessionData.quizData,
        sessionCode,
        sidecarCode: sessionData.session.sessionCode,
        sessionStatus: sessionData.session.sessionStatus,
        isHost,
        roundIdx: indexes[0],
        questionIdx: indexes[1],
        loading: uiState.loading,
        error: uiState.error,
        participants: sessionData.session.participants,
        userId
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export const useSession = (): SessionContextData => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
