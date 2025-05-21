import { useHostSession } from "@/context/hostSessionContext";
import { useSocket } from "@/context/socketContext";

export default function useSessionControls() {
  const {
    sessionStatus,
    handleSessionUpdate,
    questionIdx,
    roundIdx,
    quizData,
  } = useHostSession();
  const { socket } = useSocket();

  const isLastQuestion = questionIdx === quizData?.rounds[roundIdx]?.length - 1;
  const isFirstQuestion = questionIdx === 0;

  const isFirstRound = roundIdx === 0;
  const isLastRound = roundIdx === quizData?.rounds.length - 1;

  const startSession = () => {
    handleSessionUpdate({ sessionStatus: "pendingRound" });
    socket?.emit("round-update", { sessionStatus: "pendingRound" });
  };

  const endRound = () => {
    handleSessionUpdate({ sessionStatus: "resultRoundPending" });
    socket?.emit("round-update", { sessionStatus: "resultRoundPending" });
  };

  const showRoundResults = () => {
    handleSessionUpdate({ sessionStatus: "resultRound" });
    socket?.emit("round-update", { sessionStatus: "resultRound" });
  };

  const pauseSession = () => {
    handleSessionUpdate({ sessionStatus: "paused" });
    socket?.emit("round-update", { sessionStatus: "paused" });
  };

  const setQuestion = (idx: number) => {
    handleSessionUpdate({ sessionStatus: "pendingQuestion", questionIdx: idx });
    socket?.emit("round-update", {
      sessionStatus: "pendingQuestion",
      questionIdx: idx,
    });
  };

  const handleQuestionState = () => {
    const newStatus =
      sessionStatus !== "question" ? "question" : "pendingQuestion";
    handleSessionUpdate({ sessionStatus: newStatus });
    socket?.emit("round-update", { sessionStatus: newStatus });
  };

  const startRound = () => {
    handleSessionUpdate({ sessionStatus: "question" });
    socket?.emit("round-update", { sessionStatus: "question" });
  };

  const setRound = (idx: number, questionIdx?:number) => {
    const payload: Partial<SessionData> = {
      sessionStatus: "pendingRound",
      roundIdx: idx,
      questionIdx: questionIdx ?? 0,
    };
    handleSessionUpdate(payload);
    socket?.emit("round-update", payload);
  };

  return {
    startSession,
    pauseSession,
    setQuestion,
    setRound,
    startRound,
    endRound,
    showRoundResults,
    isLastQuestion,
    isFirstQuestion,
    isFirstRound,
    isLastRound,
    handleSessionUpdate,
    handleQuestionState,
  };
}
