import { useHostSession } from "@/context/hostSessionContext";
import { cn } from "@/utilities/cn";

export default function QuestionPreview({
  questionData,
}: {
  questionData: QuestionData | null;
}) {
  const { sessionStatus } = useHostSession();
  const isImgRound = questionData?.questionType === "PICTURE";
  const correctIdx = questionData?.correctIndex;

  const TextQuestion = ({ text, idx }: { text: string; idx: number }) => (
    <div key={idx} className="flex gap-2 items-center text-slate-200 my-4">
      <p
        className={cn(
          "text-sm h-[20px] w-[20px] rounded-full flex items-center justify-center border pb-[2px] pr-[1px]",
          correctIdx === idx
            ? "border-main2 text-main2"
            : "border-main1 text-main1"
        )}
      >
        {idx + 1}
      </p>
      <p>{text}</p>
    </div>
  );

  return (
    questionData && (
      <div className="w-full h-fit flex flex-col gap-1 rounded-lg border border-main2Dark bg-[#171717] p-6 py-4">
        <div className="flex gap-2 items-center text-main2">
          <h1 className="text-main2 uppercase font-semibold mb-2">
            {sessionStatus === "question" ? "Active" : "Pending"} Question
          </h1>
        </div>
        <p className="font-semibold text-xl min-h-[70px]">
          {questionData.questionText}
        </p>
        <div
          className={cn("h-[200px]", {
            "grid grid-cols-2 gap-5 w-fit": isImgRound,
          })}
        >
          {questionData.options.map((option, idx) =>
            !isImgRound ? (
              <TextQuestion text={option} idx={idx} key={idx} />
            ) : (
              <div key={idx} className="flex gap-2 items-center text-slate-200">
                <p
                  className={cn(
                    "text-sm h-[20px] w-[20px] rounded-full flex items-center justify-center border pb-[2px] pr-[1px]",
                    correctIdx === idx
                      ? "border-main2 text-main2"
                      : "border-main1 text-main1"
                  )}
                >
                  {idx + 1}
                </p>
                <img
                  src={option}
                  alt={`Option ${idx + 1}`}
                  className="w-[100px] h-[70px] object-cover rounded-lg"
                />
              </div>
            )
          )}
        </div>
      </div>
    )
  );
}
