import { useEffect, useRef } from "react";
// import ImageUploader from "components/ImageUploader/ImageUploader";
import { BiSolidChevronRightCircle } from 'react-icons/bi'
import { FaRandom } from 'react-icons/fa'
import styles from "./CreateImageQuestion.module.scss";
import { useTrivia } from "@/context/TriviaContext";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { initialQuestionData, QuestionProps } from "../config";


const CreateImageQuestion = ({
  questionData,
  setQuestionData,
  submitQuestion,
  optionsComplete,
  dataComplete,
  isEdit
}: QuestionProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { getImgQuestion } = useTrivia();

  useEffect(() => {
    if(isEdit && textRef.current){
      textRef.current.value = questionData.questionText
    }
  },[isEdit, questionData.questionText])

  const handleImage = (idx: number, url: string) => {
    const newOptions = [...questionData.options];
    newOptions[idx] = url;
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  const getRandomQuestion = async () => {
    setQuestionData(initialQuestionData);
    const res = await getImgQuestion();
    const correctIndex = Math.floor(Math.random() * 4);
    const incorrect = [
      ...res.incorrectAnswers.map((i: ImgObject[]) => i[0].url),
    ];
    const options = [
      ...incorrect.slice(0, correctIndex),
      res.correctAnswer[0].url,
      ...incorrect.slice(correctIndex),
    ];
    const questionData: QuestionData = {
      questionText: res.question.text,
      options,
      correctIndex,
      _id: res.id,
      questionType: "PICTURE",
      myResponse: null,
    };
    if (textRef.current) textRef.current.value = res.question.text;
    setQuestionData(questionData);
  };

  const setData = (value: string | number, key: keyof QuestionData) =>
    setQuestionData((prev: QuestionData) => ({ ...prev, [key]: value }));

  const confText = (
    <p className={`${styles.confText}`}>
      {questionData.correctIndex === -1
        ? "click an image to define the correct option"
        : `option ${questionData.correctIndex + 1} is the correct answer`}
    </p>
  );

  return (
    <div className={`${styles.createWrapper}`}>
      <div className={`${styles.inputWrapper}`}>
        <p>Question text:</p>
        <textarea
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData(e.target.value, "questionText")
          }
          name="question text"
          ref={textRef}
        />
      </div>
      <div className={`${styles.imageInputs}`}>
        {questionData.options.map((option: string, idx: number) => (
          <div key={idx} className={`${styles.imageContainer}`}>
            <ImageUploader
              idx={idx}
              callback={handleImage}
              isCorrectOption={questionData.correctIndex === idx}
              setCorrect={
                optionsComplete
                  ? (idx: number) => setData(idx, "correctIndex")
                  : undefined
              }
              currentValue={option}
            />
          </div>
        ))}
      </div>
      <div className={`${styles.confTextDiv}`}>
        {optionsComplete && confText}
      </div>
      <div className={`${styles.btnsBottom}`}>
        {!isEdit && (
          <div
            onClick={getRandomQuestion}
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
    </div>
  );
};

export default CreateImageQuestion;
