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



  const longestRound = quizData.rounds.reduce(
    (acc: number, curr: QuestionData[]) =>
      curr.length > acc ? curr.length : acc,
    0
  );

  const handleUpdate = () => {
    handleSessionUpdate({ roundIdx: roundSelect, questionIdx: questionSelect, sessionStatus: "pendingRound" });
    socket?.emit("round-update", {
      roundIdx: roundSelect,
      questionIdx: questionSelect,
      sessionStatus: "pendingRound",
    });
  };

  return (
    <div
      className={cn(
        "w-[750px] flex flex-col items-center mx-auto gap-2",
        sessionStatus === "pending" ? "opacity-35 pointer-events-none" : ""
      )}
    >
      <div className="flex gap-2 mt-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs w-fulltext-center text-main1">ROUND</p>
          <div className="flex items-center gap-1 rounded-sm p-1">
            {quizData.rounds.map((_: QuestionData[], idx: number) => (
              <div
                key={idx}
                onClick={() => setRoundSelect(idx)}
                className={cn(
                  "h-[30px] w-[30px] cursor-pointer border border-main1 rounded-sm flex items-center justify-center text-main1 hover:bg-main1/10",
                  roundSelect === idx ? "bg-main1/30 border-main1" : "",
                  roundIdx === idx ? "bg-main1 text-black border-main1" : ""
                )}
              >
                <p>{idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs w-full text-center text-main2">QUESTION</p>
          <div className="flex items-center gap-1 rounded-sm p-1 relative">
            <div className="flex items-center gap-1 border border-transparent rounded-sm">
              {Array.from({ length: longestRound }, (_, idx) => (
                <div
                  key={`ghost_${idx}`}
                  className={"h-[30px] w-[30px] pointer-events-none border opacity-10"}
                />
              ))}
            </div>
            <div className="absolute left-1 top-1 flex items-center gap-1 border border-black1 rounded-sm z-10">
              {Array.from(
                { length: quizData.rounds[roundSelect].length },
                (_, idx) => (
                  <div
                    onClick={() => setQuestionSelect(idx)}
                    className={cn(
                      "h-[30px] w-[30px] cursor-pointer border border-main2 rounded-sm flex items-center justify-center text-main2 hover:bg-main2/10",
                      questionSelect === idx ? "bg-white/30 border-white pointer-events-none" : "",
                      roundSelect === roundIdx && questionIdx === idx
                        ? "bg-main2 text-black border-main2"
                        : ""
                    )}
                  >
                    <p>{idx + 1}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
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
