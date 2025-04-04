import { initialQuestionData } from "@/components/CreateQuestion/config";
import CreateTextQuestion from "@/components/CreateQuestion/CreateTextQuestion/CreateTextQuestion";
import { useNotification } from "@/context/notification-context";
import { queryClient } from "@/main";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loader from "assets/loaders/spin_orange.svg";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import CreateImageQuestion from "@/components/CreateQuestion/CreateImageQuestion/CreateImageQuestion";

export default function EditQuestion() {
  const navigate = useNavigate()
  const { showToast } = useNotification()
  const { questionId } = useParams();
  const [questionData, setQuestionData] =
    useState<QuestionData>(initialQuestionData);

  const optionsComplete = !questionData.options.some(
    (option: string) => option === ""
  );

  const dataComplete =
    optionsComplete &&
    !!questionData.questionText &&
    questionData.correctIndex !== -1;

    const submitQuestion = async () => {
      const { data } = await axios.patch(
        `/api/question/${questionData._id}`,
        questionData
      );
      if (data.success) {
        showToast("QUESTION UPDATED", 'success')
        await queryClient.refetchQueries({ queryKey: ["quizData"] });
        // navigate(`/quiz/edit/${quizId}/${roundIdx}`);
      }
    };

    useEffect(() => {
      const fetchQuestionData = async () => {
        const { data } = await axios.get(`/api/question/${questionId}`);
        if(data){
          setQuestionData(data);
        }
      }
      fetchQuestionData();
    },[])

  return (
    <div
      className={
        "pb-20 h-full max-h-[650px] w-full flex flex-col items-center justify-center"
      }
    >
      {questionData.correctIndex === -1 ? (
        <img src={loader} className="h-[100px] w-[100px]" />
      ) : (
        <motion.div
          style={{ position: "relative", width: "fit-content" }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoArrowBackCircleSharp
            onClick={() => navigate(-1)}
            className={`cursor-pointer h-10 w-10 relative top-8 right-2 text-grey3 z-10`}
          />
          {questionData.questionType === "MULTI_TEXT" ? (
            <CreateTextQuestion
              questionData={questionData}
              setQuestionData={setQuestionData}
              submitQuestion={submitQuestion}
              optionsComplete={optionsComplete}
              dataComplete={dataComplete}
              isEdit
            />
          ) : (
            <CreateImageQuestion
              questionData={questionData}
              setQuestionData={setQuestionData}
              submitQuestion={submitQuestion}
              optionsComplete={optionsComplete}
              dataComplete={dataComplete}
              isEdit
            />
          )}
        </motion.div>
      )}
    </div>
  );}
