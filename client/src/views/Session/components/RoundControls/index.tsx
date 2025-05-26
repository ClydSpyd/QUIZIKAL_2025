import { useHostSession } from "@/context/hostSessionContext";
import useSessionControls from "@/hooks/useSessionControls";
import { cn } from "@/utilities/cn";
import { BsForwardFill, BsPlayCircleFill } from "react-icons/bs";

export default function RoundControls() {
  const { sessionStatus, questionIdx } = useHostSession();

  const {
    startSession,
    setQuestion,
    handleQuestionState,
    isLastQuestion,
    isFirstQuestion,
  } = useSessionControls();

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
            className={cn(
              "h-[45px] w-[60px] border-black1 hover:border-white/20 transition-all duration-300 ease-in-out bg-black/30 cursor-pointer rounded-md border-2 flex items-center justify-center",
              {
                "pointer-events-none opacity-60": isFirstQuestion,
              }
            )}
          >
            <BsForwardFill className="rotate-180" />
          </div>
          <div
            onClick={handleQuestionState}
            className="h-[45px] w-[150px] bg-black/30 text-main1 border-main1Dark hover:border-main3Dark hover:text-main3 transition-all duration-200 ease-in-out cursor-pointer rounded-md border flex items-center justify-center"
          >
            {sessionStatus === "pendingRound" ? "show" : "hide"} HEMLO
          </div>
          <div
            onClick={() => setQuestion(questionIdx + 1)}
            className={cn(
              "h-[45px] w-[60px] border-black1 hover:border-white/20 transition-all duration-300 ease-in-out bg-black/30 cursor-pointer rounded-md border-2 flex items-center justify-center",
              {
                "pointer-events-none opacity-60": isLastQuestion,
              }
            )}
          >
            <BsForwardFill />
          </div>
        </>
      )}
    </div>
  );
}
