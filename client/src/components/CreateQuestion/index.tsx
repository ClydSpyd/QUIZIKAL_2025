import { useEffect, useState } from "react";
import styles from "./CreateQuestion.module.scss";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CreateImageQuestion from "./CreateImageQuestion/CreateImageQuestion";
import CreateTextQuestion from "./CreateTextQuestion/CreateTextQuestion";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@/main";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import {
  ButtonData,
  buttons,
  initialQuestionData,
  QuestionProps,
  SelectedType,
} from "./config";
import ExistingQuestionsPicker from "./ExistingQuestionsPicker";

const CreateQuestion = () => {
  const [questionData, setQuestionData] =
    useState<QuestionData>(initialQuestionData);
  const [selectedType, setSelectedType] = useState<SelectedType | null>(null);
  const navigate = useNavigate();
  const { quizId, roundIdx } = useParams();

  useEffect(() => {
    if (!selectedType) setQuestionData(initialQuestionData);
  }, [selectedType]);

  const submitQuestion = async () => {
    const { data } = await axios.post("/api/question/add", {
      questionData: { ...questionData, questionType: selectedType },
      quizId,
      round: roundIdx,
    });
    if (data.success) {
      await queryClient.refetchQueries({ queryKey: ["quizData"] });
      navigate(`/quiz/edit/${quizId}/${roundIdx}`);
    }
  };
  const optionsComplete = !questionData.options.some(
    (option: string) => option === ""
  );

  const dataComplete =
    optionsComplete &&
    !!questionData.questionText &&
    questionData.correctIndex !== -1;

  const props: QuestionProps = {
    questionData,
    setQuestionData,
    submitQuestion,
    dataComplete,
    optionsComplete,
  };

  const components = {
    PICTURE: <CreateImageQuestion {...props} />,
    MULTI_TEXT: <CreateTextQuestion {...props} />,
    REUSE: <ExistingQuestionsPicker />,
  };

  return (
    <div className={`${styles.createWrapper}`}>
      <AnimatePresence mode={"wait"}>
        <motion.div
          style={{ position: "relative", width: "fit-content" }}
          key={selectedType ?? "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {!!selectedType && (
            <IoArrowBackCircleSharp
              onClick={() => setSelectedType(null)}
              className={`${styles.backBtn}`}
            />
          )}
          {selectedType === null ? (
            <div className={`${styles.buttons}`}>
              <h3>Select question type</h3>
              {buttons.map((i: ButtonData, idx: number) => (
                <div
                  onClick={() => setSelectedType(i.questionType)}
                  key={idx}
                  className={`${styles.buttonWrapper}`}
                >
                  <div className={`${styles.imgWrapper}`}>
                    <img src={i.icon} alt={i.title} />
                  </div>
                  <div className={`${styles.textWrapper}`}>
                    <h1>{i.title}</h1>
                    <h5>{i.description}</h5>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            components[selectedType]
          )}
        </motion.div>
      </AnimatePresence>

      {/*  */}
      {/*  */}
    </div>
  );
};

export default CreateQuestion;
