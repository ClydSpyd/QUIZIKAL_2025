import Modal from "@/components/utilityComps/Modal";
import { LSQuestion, useLSQuestions } from "@/hooks/useLSQuestions";
import axios from "axios";
import { useRef, useState } from "react";
import { BiSave } from "react-icons/bi";
import spinner from "assets/loaders/spin_green.svg";

const ListModal = ({
  questions,
  handleSelect,
}: {
  questions: LSQuestion[];
  handleSelect: (q: LSQuestion, idx: number) => void;
}) => {
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <div className="max-w-[650px] w-[90vw] p-6 bg-grey1 rounded-lg z-50 flex flex-col gap-2 relative overflow-hidden">
      {questions.map((q, index) => (
        <div
          className="px-4 w-full min-h-[65px] flex items-center justify-center text-center border border-grey3 rounded-md cursor-pointer transition-all duration-300 ease-out hover:border-main3Dark font-semibold"
          key={index}
          onClick={() => {
            setSaving(true);
            handleSelect(q, index);
          }}
        >
          {q.question}
        </div>
      ))}
      {saving && (
        <div className="absolute h-full w-full left-0 top-0 flex flex-col items-center justify-center bg-gray-700/20 backdrop-blur-md">
          <img src={spinner} className="h-[55px] w-[55px]" />
        </div>
      )}
    </div>
  );
};

export default function SavedQuestionsSelector({
  handleSelect,
}: {
  handleSelect: (question: {
    questionText: string;
    options: string[];
    correctIdx: number;
  }) => void;
}) {
  const listModalRef = useRef<ModalRef>(null);
  const { savedQuestions, removeQuestion } = useLSQuestions();

  const handleQuestion = async (q: LSQuestion, idx: number) => {
    const randomIndex = Math.floor(Math.random() * 4);

    const { data: optionsRes } = await axios.get(
      `/api/trivia/options?question=${encodeURIComponent(
        q.question
      )}&correctAnswer=${encodeURIComponent(q.answer)}`
    );

    const optionsBase =
      optionsRes ?? [...Array(4)].map((_, idx) => `Option ${idx + 1}`);

    const options = optionsBase.map((option: string, idx: number) => {
      if (idx === randomIndex) return q.answer;
      return option;
    });

    handleSelect({
      questionText: q.question,
      options,
      correctIdx: randomIndex,
    });

    removeQuestion(idx);
    listModalRef.current?.close();
  };

  if (savedQuestions.length === 0) return null;

  return (
    <>
      <button
        className="h-[35px] !text-base font-[700] rounded-md"
        onClick={() => listModalRef.current?.open()}
      >
        Saved Items <BiSave />
      </button>
      <Modal ref={listModalRef}>
        <ListModal questions={savedQuestions} handleSelect={handleQuestion} />
      </Modal>
    </>
  );
}
