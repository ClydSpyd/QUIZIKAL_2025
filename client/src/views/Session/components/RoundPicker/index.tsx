import { useHostSession } from "@/context/hostSessionContext";
import { useSocket } from "@/context/socketContext";
import { cn } from "@/utilities/cn";
import { useEffect, useState } from "react";

export default function RoundPicker() {
  const { roundIdx, questionIdx, quizData, sessionStatus, handleSessionUpdate } = useHostSession();
  const [roundSelect, setRoundSelect] = useState<number>(roundIdx);
  const [questionSelect, setQuestionSelect] = useState<number>(questionIdx);
  const { socket } = useSocket();

  useEffect(() => {
    setRoundSelect(roundIdx);
    setQuestionSelect(questionIdx);
  },[questionIdx, roundIdx])

  useEffect(() => {
    setQuestionSelect(roundIdx === roundSelect ? questionIdx : 0);
  },[roundSelect])

  const localChange =
    roundSelect !== roundIdx || questionSelect !== questionIdx;

  console.log({ questionIdx, questionSelect });

  console.log({ quizData, ö: quizData.rounds[roundSelect].length });

  const handleUpdate = () => {
    handleSessionUpdate({ roundIdx: roundSelect, questionIdx: questionSelect });
    socket?.emit("round-update", { roundIdx: roundSelect, questionIdx: questionSelect });
  };

  return (
    <div
      className={cn(
        "w-[750px] flex flex-col items-center mx-auto gap-2",
        sessionStatus === "pending" ? "opacity-35 pointer-events-none" : ""
      )}
    >
      <div className="flex items-center gap-1">
        <p className="text-sx">ROUND</p>
        {quizData.rounds.map((_: QuestionData[], idx: number) => (
          <div
            onClick={() => setRoundSelect(idx)}
            className={cn(
              "h-[30px] w-[30px] cursor-pointer border rounded-sm flex items-center justify-center text-white hover:bg-white/10",
              roundSelect === idx ? "bg-white/30 border-main1" : "",
              roundIdx === idx ? "bg-white text-black border-whitee" : ""
            )}
          >
            <p>{idx + 1}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <p className="text-xs">QUESTION</p>
        {Array.from(
          { length: quizData.rounds[roundSelect].length },
          (_, idx) => (
            <div
              onClick={() => setQuestionSelect(idx)}
              className={cn(
                "h-[30px] w-[30px] cursor-pointer border rounded-sm flex items-center justify-center text-white hover:bg-white/10",
                questionSelect === idx ? "bg-white/30 border-main1" : "",
                roundSelect === roundIdx && questionIdx === idx
                  ? "bg-white text-black border-white"
                  : ""
              )}
            >
              <p>{idx + 1}</p>
            </div>
          )
        )}
      </div>
      <button
        onClick={handleUpdate}
        className={cn(
          "mx-auto transition-all duration-300 ease-out",
          localChange ? "opacity-100" : "opacity-60 pointer-events-none"
        )}
      >
        UPDATE
      </button>
    </div>
  );
}
