import { useParticipantSession } from "@/context/participantSessionContext";
import { cn } from "@/utilities/cn";
import { useEffect, useState } from "react";
import spinner from "assets/loaders/spin_green.svg";

import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
  IoWarning,
} from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useReviewData } from "@/queries/roundReviewData";

const AnswerBlockText = ({
  title,
  answerText,
  isCorrect,
}: {
  title: string;
  answerText: string;
  isCorrect: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl px-5 py-4",
        isCorrect ? "bg-[#181c18]" : "bg-[#2d1a1a]"
      )}
    >
      <span className="text-xs text-gray-400 font-bold tracking-wide mb-1">
        {title}
      </span>
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <IoIosCheckmarkCircle className="fa-solid fa-circle-check text-lime-400" />
        ) : (
          <TiDelete className="h-[23px] w-[23px] fa-solid fa-circle-check text-red-400" />
        )}
        <span
          className={cn(
            "font-semibold",
            isCorrect ? "text-lime-200" : "text-red-200"
          )}
        >
          {answerText}
        </span>
      </div>
    </div>
  );
};

export default function RoundReviewModule() {
  const { roundIdx, sessionCode, userData } = useParticipantSession();
  const [questionIdx, setQuestionIndex] = useState(0);
  const [roundLength, setRoundLength] = useState(0);

  const { data: questionReviewData, error } = useReviewData({
    sessionCode,
    userId: userData?.id ?? "",
    roundIdx,
    questionIdx,
  });

  useEffect(() => {
    questionReviewData && setRoundLength(questionReviewData?.roundLength);
  }, [questionReviewData]);

  const answeredCorrectly =
    questionReviewData?.response === questionReviewData?.question?.correctIndex;
  // const isPictureRound = questionReviewData?.question?.questionType === "PICTURE";

  return (
    <section className="w-[90%] max-w-[600px] bg-[#18181b] border border-main3Dark rounded-3xl shadow-xl mb-10 p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-6 pb-3 border-b border-orange-400/20">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-magnifying-glass text-lime-400"></i>
          <span className="font-bold text-main1 text-lg tracking-wide">
            <span className="hidden md:inline">Review</span> Your Responses
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <IoChevronBackCircleOutline
            onClick={() =>
              setQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
            }
            className="text-white/60 hover:text-lime-400 transition-colors duration-300 h-[35px] w-[35px] cursor-pointer"
          />
          <span
            id="question-index"
            className="font-mono text-gray-300 select-none hidden md:block"
          >
            {questionIdx + 1} / {roundLength}
          </span>
          <IoChevronForwardCircleOutline
            onClick={() =>
              setQuestionIndex((prev) =>
                prev < roundLength - 1 ? prev + 1 : prev
              )
            }
            className="text-white/60 hover:text-lime-400 transition-colors duration-300 h-[35px] w-[35px] cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-7 py-6">
        {error ? (
          <div className="w-full h-[180px] flex flex-col items-center justify-center">
            <IoWarning className="text-main3 h-[50px] w-[50px]" />
            <h1 className="text-main3 font-bold text-lg">{error.message}</h1>
          </div>
        ) : !questionReviewData ? (
          <div className="w-full h-[180px] flex flex-col items-center justify-center">
            <img src={spinner} className="h-[75px] w-[75px] relative" />
            <p className="m-0 text-sm relative bottom-2">
              fetching question data
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <span className="text-xs uppercase text-lime-400 font-bold select-none">
                Question {questionIdx + 1}
              </span>
              <span className="font-semibold text-lg text-white">
                {questionReviewData?.question?.questionText}
              </span>
            </div>
            <AnswerBlockText
              title="Your Answer"
              answerText={
                questionReviewData?.question?.options[
                  questionReviewData?.response
                ] ?? "No Answer Given"
              }
              isCorrect={answeredCorrectly}
            />
            {!answeredCorrectly && (
              <AnswerBlockText
                title="Correct Answer"
                answerText={
                  questionReviewData?.question?.options[
                    questionReviewData?.question?.correctIndex
                  ] ?? ""
                }
                isCorrect={true}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
