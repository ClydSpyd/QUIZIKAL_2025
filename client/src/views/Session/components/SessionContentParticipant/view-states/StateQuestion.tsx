import Image from "@/components/ui/Image";
import { useParticipantSession } from "@/context/participantSessionContext";
import { cn } from "@/utilities/cn";

export default function StateQuestion() {
  const { currentQuestion } = useParticipantSession();
  console.log({ currentQuestion });
  const isPictureQuestion = currentQuestion?.questionType === "PICTURE";

  if (!currentQuestion)
    return (
      <div>
        <h1>QUESTION NOT FOUND</h1>
      </div>
    );

  return (
    <div className="w-full h-fit mx-auto max-w-[950px] flex flex-col gap-4 box-border">
      <div className="flex items-center justify-center border-[3px] border-[var(--grey2)] rounded-md p-6">
        <h1 className="text-2xl">{currentQuestion.questionText}</h1>
      </div>
      <div
        className={cn(
          "w-full gap-2",
          isPictureQuestion ? "grid grid-cols-2" : "flex flex-col items-center"
        )}
      >
        {currentQuestion.options.map((i, idx) => {
          if (isPictureQuestion) {
            return (
              <div className="h-[300px] bg-lime-300 rounded-lg overflow-hidden group">
                <Image
                  src={i}
                  className={"h-full w-full object-fill transition-all duration-200 ease-in-out group-hover:scale-105"}
                  Placeholder={"symbol"}
                />{" "}
              </div>
            );
          } else {
           return (
             <div
               className="w-full border border-slate-300/10 rounded-sm p-4"
             >
               <h1 className="text-lg text-main2">{i}</h1>
             </div>
           );
          }
        })}
      </div>
    </div>
  );
}
