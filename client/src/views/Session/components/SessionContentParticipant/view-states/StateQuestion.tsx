import Image from "@/components/ui/Image";
import { useParticipantSession } from "@/context/participantSessionContext";
import { useSocket } from "@/context/socketContext";
import { cn } from "@/utilities/cn";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function StateQuestion() {
  const { currentQuestion, roundIdx, questionIdx } = useParticipantSession();
  const { socket } = useSocket();
  const [selectedIdx, setSelectedIdx] = useState<null | number>(
    currentQuestion?.myResponse !== null &&
      currentQuestion?.myResponse !== undefined &&
      !isNaN(Number(currentQuestion.myResponse))
      ? +currentQuestion.myResponse
      : null
  );
  console.log({ currentQuestion });
  const isPictureRound = currentQuestion?.questionType === "PICTURE";

    const handleSelect = (idx: number) => {
    if (!socket) return;
    setSelectedIdx(idx);
    console.log({roundIdx, questionIdx, idx})
    socket.emit("question-response", { responseIdx: idx, roundIdx, questionIdx });
    // dispatch(setAnswer({ responseIdx: idx, roundIdx, questionIdx }))
  };


  if (!currentQuestion)
    return (
      <div>
        <h1>QUESTION NOT FOUND</h1>
      </div>
    );

  return (
    <div className="w-full h-fit min-h-screen mx-auto max-w-[950px] flex flex-col items-center gap-4 box-border pt-10 pb-28">
      {/* <div className={"mb-[20px] flex flex-col items-center"}>
        <img className="h-[70px]" src={logo} alt={"logo"} />
        <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
          QUIZIKAL
        </h4>
      </div> */}
      <div className="w-full justify-center flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <h1 className={"text-main1 mr-1"}>ROUND</h1>
            <h2>{roundIdx + 1}</h2>
          </div>
          <div className="flex items-center">
            <h1 className={"text-main2 mr-1"}>QUESTION</h1>
            <h2>{questionIdx + 1}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center grow">
        <div
          className={cn(
            "flex flex-col gap-2 rounded-lg border border-main2 bg-[#171717] p-4 w-[90%]",
            isPictureRound ? "max-w-[850px]" : "max-w-[600px]"
          )}
        >
          <h1 className="text-2xl w-full text-center text-white py-4 px-2">
            {currentQuestion.questionText}
          </h1>
          <div
            className={cn(
              "w-full",
              isPictureRound
                ? "grid grid-cols-2 gap-4"
                : "flex flex-col items-center gap-2"
            )}
          >
            {currentQuestion.options.map((i, idx) => {
              if (isPictureRound) {
                return (
                  <div
                    onClick={() => handleSelect(idx)}
                    key={`img_${idx}`}
                    className={cn(
                      "h-[100px] md:h-[300px] bg-white/40 rounded-lg overflow-hidden group border-4 relative",
                      selectedIdx === idx
                        ? "border-main1 bg-[#343434]"
                        : "border-slate-300/10 hover:border-slate-300/20 bg-[#242424]"
                    )}
                  >
                    {selectedIdx === idx && (
                      <p className="absolute z-20 top-1 left-1 text-sm h-[20px] w-[20px] md:h-[30px] md:w-[30px] rounded-full flex items-center justify-center border border-main3 bg-main3 text-black1 font-bold pr-[1px]">
                        <FaCheck className="h-[12px] w-[12px] md:h-[15px] md:w-[15px] relative left-[1px]" />
                      </p>
                    )}
                    <Image
                      src={i}
                      className={
                        "h-full w-full object-fill transition-all duration-200 ease-in-out group-hover:scale-105"
                      }
                      Placeholder={"symbol"}
                    />{" "}
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={() => handleSelect(idx)}
                    key={`option_${idx}`}
                    className={cn(
                      "w-full border rounded-sm p-4 flex items-center justify-center relative transition-all duration-200 ease-in-out cursor-pointer",
                      selectedIdx === idx
                        ? "border-main1 bg-[#343434]"
                        : "border-slate-300/10 hover:border-slate-300/20 bg-[#242424]"
                    )}
                  >
                    {/* <p className="absolute left-5 text-sm h-[25px] w-[25px] rounded-full flex items-center justify-center border border-main3 bg-main3 text-black1 font-bold pr-[1px]">
                    {idx + 1}
                  </p> */}
                    <h1 className="text-lg text-white">{i}</h1>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
