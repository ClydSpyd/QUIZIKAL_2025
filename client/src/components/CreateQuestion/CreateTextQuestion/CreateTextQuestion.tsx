/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useRef, useState } from "react";
import styles from "./CreateTextQuestion.module.scss";
import { FaRandom } from "react-icons/fa";
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import axios from "axios";
import loader from "assets/loaders/spin_orange.svg";
import { QuestionProps } from "../config";
import SavedQuestionsSelector from "./SavedQuestionsSelector";

const CreateTextQuestion = ({
  questionData,
  setQuestionData,
  submitQuestion,
  optionsComplete,
  dataComplete,
  isEdit,
}: QuestionProps) => {
  const [loading, toggleLoading] = useState<boolean>(false);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const optionOneRef = useRef<HTMLInputElement>(null);
  const optionTwoRef = useRef<HTMLInputElement>(null);
  const optionThreeRef = useRef<HTMLInputElement>(null);
  const optionFourRef = useRef<HTMLInputElement>(null);
  const refs = [optionOneRef, optionTwoRef, optionThreeRef, optionFourRef];

  useEffect(() => {
    if (isEdit) {
      questionRef.current!.value = questionData.questionText;
      refs.forEach(
        (ref, idx) => (ref.current!.value = questionData.options[idx])
      );
    }
  }, []);

  const setData = (value: string | number, key: keyof QuestionData) =>
    setQuestionData((prev: QuestionData) => ({ ...prev, [key]: value }));

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    idx: number
  ) => {
    const options = [...questionData.options];
    options[idx] = e.target.value;
    setQuestionData({ ...questionData, options });
  };
  const confText = (
    <p className={`${styles.confText}`}>
      {questionData.correctIndex === -1
        ? "Please indicate the correct option"
        : `option ${questionData.correctIndex + 1} is the correct answer`}
    </p>
  );

  const handleRandomQuestion = async () => {
    let responseData;
    toggleLoading(true);
    if (questionRef.current) questionRef.current.value = "";
    refs.forEach((item: RefObject<HTMLInputElement>) => {
      if (item.current) item.current.value = "";
    });

    const { data } = await axios.get("/api/trivia");

    if (data.error) {
      console.log("OPENAI ERROR");
      const { data } = await axios.get("/api/trivia");
      responseData = data;
    } else {
      responseData = data;
    }
    console.log({ data });
    const correctIndex = Math.floor(Math.random() * 4);
    const incorrect = [...responseData.incorrectAnswers];
    const options = [
      ...incorrect.slice(0, correctIndex),
      responseData.correctAnswer,
      ...incorrect.slice(correctIndex),
    ];
    const questionData: QuestionData = {
      questionText: responseData.question,
      options,
      correctIndex,
      _id: responseData.id,
      questionType: "MULTI_TEXT",
      myResponse: null,
    };
    if (questionRef.current) questionRef.current.value = responseData.question;
    refs.forEach((item: RefObject<HTMLInputElement>, idx: number) => {
      if (item.current) item.current.value = options[idx];
    });
    setQuestionData(questionData);
    toggleLoading(false);
  };

  const handleSavedQuestion = async (question: {
    questionText: string;
    options: string[];
    correctIdx: number;
  }) => {
    refs.forEach((item: RefObject<HTMLInputElement>, idx: number) => {
      if (item.current) item.current.value = question.options[idx];
    });
    questionRef.current!.value = question.questionText;
    setQuestionData({
      ...questionData,
      questionText: question.questionText!,
      options: question.options,
      correctIndex: question.correctIdx,
    });
  };

  return (
    <div className={`${styles.textQuestionWrapper}`}>
      <div className={`${styles.inputs} ${loading && styles.loading}`}>
        <div className={`${styles.inputWrapper}`}>
          <p>Question text:</p>
          <textarea
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setData(e.target.value, "questionText")
            }
            name="question text"
            ref={questionRef}
          />
        </div>
        {[...Array(4)].map((_: unknown, idx: number) => (
          <>
            <p className={styles.questionTitle}>Option {idx + 1}:</p>
            <div className={`${styles.inputWrapper}`}>
              <input
                type="text"
                onChange={(e) => handleInput(e, idx)}
                name="question text"
                ref={refs[idx]}
              />
              {optionsComplete && (
                <div
                  onClick={() => setData(idx, "correctIndex")}
                  className={`${styles.checkboxWrapper}`}
                >
                  {questionData.correctIndex !== idx ? (
                    <ImCheckboxUnchecked />
                  ) : (
                    <ImCheckboxChecked color={"#90ff2e"} />
                  )}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
      <div className={`${styles.confTextDiv}`}>
        {optionsComplete && confText}
      </div>
      <div className={`${styles.btnsBottom}`}>
        <SavedQuestionsSelector handleSelect={handleSavedQuestion} />
        {!isEdit && (
          <div
            onClick={handleRandomQuestion}
            className={`${styles.shuffleBtn} ${styles.active}`}
          >
            <p>Random</p>
            <FaRandom className={`${styles.random}`} />
          </div>
        )}
        <div
          onClick={submitQuestion}
          className={`${styles.submitBtn} ${dataComplete && styles.active}`}
        >
          <p>Submit</p>
          <BiSolidChevronRightCircle />
        </div>
      </div>
      {loading && (
        <div className={`${styles.loaderWrapper}`}>
          <img src={loader} />
        </div>
      )}
    </div>
  );
};
export default CreateTextQuestion;
