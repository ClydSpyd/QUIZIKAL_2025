import { useHostSession } from "@/context/hostSessionContext"
import { useSocket } from "@/context/socketContext";
import { BsForwardFill, BsPlayCircleFill } from "react-icons/bs";

export default function RoundControls(){
  const { sessionStatus, handleSessionUpdate, questionIdx } = useHostSession();
  const {socket} = useSocket();

  const startSession = () => {
    handleSessionUpdate({sessionStatus:"pendingRound"})
    socket?.emit("round-update", { sessionStatus: "pendingRound" });
  };

  const pauseSession = () => {
    handleSessionUpdate({sessionStatus:"pending"})
    socket?.emit("round-update", { sessionStatus: "pending" });
  };

  const setQuestion = (idx:number) => {
    handleSessionUpdate({ sessionStatus: "pendingRound", questionIdx: idx });
    socket?.emit("round-update", {
      sessionStatus: "pendingRound",
      questionIdx: idx,
    });
  };

  const handleQuestionState = () => {
    const newStatus =
      sessionStatus === "pendingRound" ? "question" : "pendingRound";
    handleSessionUpdate({ sessionStatus: newStatus });
    socket?.emit("round-update", { sessionStatus: newStatus });
  }

  return (
    <div className="flex gap-1 items-center">
      {sessionStatus === "pending" ? (
        <button onClick={startSession}>
          START SESSION <BsPlayCircleFill className="ml-2" />{" "}
        </button>
      ) : (
        <>
          <div
            onClick={() => {
              setQuestion(questionIdx - 1);
            }}
            className="h-[45px] w-[90px] border-black1 bg-black/20 cursor-pointer rounded-md border-2 flex items-center justify-center"
          >
            <BsForwardFill className="rotate-180" />
          </div>
          <div
            onClick={handleQuestionState}
            className="h-[45px] w-[150px] border-black1 bg-black/20 cursor-pointer rounded-md border-2 flex items-center justify-center"
          >
            {sessionStatus === "pendingRound" ? "show" : "hide"} question
          </div>
          <div
            onClick={() => setQuestion(questionIdx + 1)}
            className="h-[45px] w-[90px] border-black1 bg-black/20 cursor-pointer rounded-md border-2 flex items-center justify-center"
          >
            <BsForwardFill />
          </div>
        </>
      )}
    </div>
  );
}