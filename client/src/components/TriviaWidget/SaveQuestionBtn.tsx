import { BiSave } from "react-icons/bi";
import TooltipWrapper from "../utilityComps/TooltipWrapper";
import { useState } from "react";
import { useLSQuestions } from "@/hooks/useLSQuestions";
import CircleTick from "../ui/circle-tick";

export default function SaveQuestionBtn({
  question,
}: {
  question: TriviaQuestion | undefined;
}) {
  const [saved, setSaved] = useState<boolean>(false);
  const { addQuestion } = useLSQuestions();

  const handleSave = async () => {
    try {
      if (!question) return;
      const q = {
        question: question.question.text,
        answer: question.correctAnswer,
      };
      const success = addQuestion(q);
      if(!success) return;
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
      console.log("Question saved to local storage!");
    } catch (error) {
      console.error("Failed to save question to LS: ", error);
    }
  };
  return (
    <div
      onClick={handleSave}
      className="h-[35px] w-[35px] flex items-center justify-center"
    >
      {!saved ? (
        <TooltipWrapper message="Save Question For Later">
          <BiSave />
        </TooltipWrapper>
      ) : (
        <CircleTick height={20} width={20} color="#ff8f1c" />
      )}
    </div>
  );
}
