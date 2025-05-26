import { useHostSession } from "@/context/hostSessionContext";
import { useSocket } from "@/context/socketContext";
import useSessionControls from "@/hooks/useSessionControls";
import { cn } from "@/utilities/cn";
import { useEffect, useState } from "react";
import { BsForwardFill, BsPlayCircleFill } from "react-icons/bs";

export default function QuestionControls() {
  const {
    sessionStatus,
    handleSessionUpdate,
    questionIdx,
    roundIdx,
    quizData,
  } = useHostSession();

  console.log({quizData})

  const {
    startSession,
    setQuestion,
    startRound,
    setRound,
    handleQuestionState,
    isLastQuestion,
    isFirstQuestion,
    isFirstRound,
    isLastRound,
  } = useSessionControls();

  const [roundSelect, setRoundSelect] = useState<number>(roundIdx);
  const [questionSelect, setQuestionSelect] = useState<number>(questionIdx);
  const { socket } = useSocket();

  useEffect(() => {
    setRoundSelect(roundIdx);
    setQuestionSelect(questionIdx);
  }, [questionIdx, roundIdx]);

  useEffect(() => {
    setQuestionSelect(roundIdx === roundSelect ? questionIdx : 0);
  }, [roundSelect]);

  const localChange =
    roundSelect !== roundIdx || questionSelect !== questionIdx;

  const longestRound = quizData.rounds.reduce(
    (acc: number, curr: QuestionData[]) =>
      curr.length > acc ? curr.length : acc,
    0
  );

  const handleUpdate = () => {
    handleSessionUpdate({
      roundIdx: roundSelect,
      questionIdx: questionSelect,
      sessionStatus: "pendingQuestion",
    });
    socket?.emit("round-update", {
      roundIdx: roundSelect,
      questionIdx: questionSelect,
      sessionStatus: "pendingQuestion",
    });
  };

  const handleNextArrow = () => {
    if (!isLastQuestion) {
      setQuestion(questionIdx + 1);
    } else {
      setRound(roundIdx + 1);
    }
  };

  const handlePrevArrow = () => {
    if (!isFirstQuestion) {
      setQuestion(questionIdx - 1);
    } else {
      const newQuestionIdx = quizData.rounds[roundIdx - 1]?.length - 1;
      setRound(roundIdx - 1, newQuestionIdx);
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 rounded-lg border border-main1Dark bg-[#171717] p-4 items-center">
      {sessionStatus === "pending" ? (
        <button onClick={startSession}>
          START SESSION <BsPlayCircleFill className="ml-2" />{" "}
        </button>
      ) : (
        <>
          <div className="w-full flex gap-1 justify-between items-center">
            <h1 className="font-semibold text-lg uppercase text-white">
              Question Controls
            </h1>
            <div className="flex gap-1 items-center w-fit">
              <div
                onClick={handlePrevArrow}
                className={cn(
                  "h-[45px] w-[60px] border-black1 hover:border-white/20 transition-all duration-300 ease-in-out bg-black/30 cursor-pointer rounded-md border border-white/10 flex items-center justify-center",
                  {
                    "pointer-events-none opacity-60":
                      isFirstQuestion && isFirstRound,
                  }
                )}
              >
                <BsForwardFill className="rotate-180" />
              </div>
              <div
                onClick={handleNextArrow}
                className={cn(
                  "h-[45px] w-[60px] border-black1 hover:border-white/20 transition-all duration-300 ease-in-out bg-black/30 cursor-pointer rounded-md border border-white/10 flex items-center justify-center",
                  {
                    "pointer-events-none opacity-60":
                      isLastQuestion && isLastRound,
                  }
                )}
              >
                <BsForwardFill />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 mt-4 grow">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs w-fulltext-center text-white select-none">ROUND</p>
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
                    <p className="text-sm font-bold select-none">{idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs w-full text-center text-white select-none">QUESTION</p>
              <div className="flex items-center gap-1 rounded-sm p-1 relative">
                <div className="flex items-center gap-1 border border-transparent rounded-sm">
                  {Array.from({ length: longestRound }, (_, idx) => (
                    <div
                      key={`ghost_${idx}`}
                      className={
                        "h-[30px] w-[30px] pointer-events-none border opacity-10"
                      }
                    />
                  ))}
                </div>
                <div className="absolute left-1 top-1 flex items-center gap-1 border border-black1 rounded-sm z-10">
                  {Array.from(
                    { length: quizData.rounds[roundSelect]?.length },
                    (_, idx) => (
                      <div
                        onClick={() => setQuestionSelect(idx)}
                        className={cn(
                          "h-[30px] w-[30px] cursor-pointer border border-main2 rounded-sm flex items-center justify-center text-main2 hover:bg-main2/10",
                          questionSelect === idx
                            ? "bg-white/30 border-white pointer-events-none"
                            : "",
                          roundSelect === roundIdx && questionIdx === idx
                            ? "bg-main2 text-black border-main2"
                            : ""
                        )}
                      >
                        <p className="text-sm font-bold select-none">{idx + 1}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 w-full grow">
            <div
              onClick={handleUpdate}
              className={cn(
                "uppercase text-sm h-[45px] w-[150px] bg-black/30 text-main1 border-main1Dark hover:border-main3Dark hover:text-main3 transition-all duration-200 ease-in-out cursor-pointer rounded-md border flex items-center justify-center",
                localChange ? "opacity-100" : "opacity-30 pointer-events-none"
              )}
            >
              confirm
            </div>
            {sessionStatus.toLowerCase().includes("round") ||
            sessionStatus === "paused" ? (
              <div
                onClick={startRound}
                className="uppercase text-sm h-[45px] w-[150px] bg-black/30 text-main1 border-main1Dark hover:border-main3Dark hover:text-main3 transition-all duration-200 ease-in-out cursor-pointer rounded-md border flex items-center justify-center"
              >
                {sessionStatus === "paused" ? "RESUME" : "START ROUND"}
              </div>
            ) : (
              <div
                onClick={handleQuestionState}
                className="uppercase text-sm h-[45px] w-[150px] bg-black/30 text-main1 border-main1Dark hover:border-main3Dark hover:text-main3 transition-all duration-200 ease-in-out cursor-pointer rounded-md border flex items-center justify-center"
              >
                {sessionStatus === "pendingQuestion" ? "show" : "hide"} question
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
