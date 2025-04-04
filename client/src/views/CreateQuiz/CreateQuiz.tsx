import { useEffect, useRef, useState } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "../../utilities/debounce";
import { BiTrash } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import DeleteModal from "components/ui/DeleteModal/DeleteModal";
import BoxIcon from "components/ui/BoxIcon/BoxIcon";
import QuestionItem from "./QuestionItem";
import LoadingScreen from "components/utilityComps/LoadingScreen/LoadingScreen";
import styles from "./CreateQuiz.module.scss";
import shuttle from "assets/images/shuttle_white.png";
import { useQuizData } from "@/queries/quizData";
import CreateSessionModal from "@/components/ui/CreateSessionModal";
import { useUserData } from "@/queries/userData";
import RoundPicker from "@/components/RoundPicker/RoundPicker";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";
import { queryClient } from "@/main";

const saveQuiz = async (quizData: QuizData) => {
  console.log("SAVE");
  axios.post(`/api/quiz/${quizData._id}/update`, {
    quizData,
  });
};

const debounceSave = debounce(saveQuiz, 1000);

const CreateQuiz = () => {
  const questionModalRef = useRef<ModalRef>(null);
  const deleteModalRef = useRef<ModalRef>(null);
  const nameModalRef = useRef<ModalRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { quizId, roundIdx: idxParam = 0 } = useParams();
  const roundIdx = +idxParam;
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: quizData, isLoading } = useQuizData({ quizId: quizId ?? "" });
  const { data: userData } = useUserData();
  const activeSession = !!userData?.activeSession;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!quizData) return;
    const newValues: QuizData = { ...quizData, quizName: e.target.value };
    debounceSave(newValues);
  };

  const handleCloseModal = (modal: "delete" | "name") => {
    if (modal === "delete") {
      deleteModalRef.current?.close();
      setDeleteError(false);
    } else {
      nameModalRef.current?.close();
    }
  };

  const handleDelete = async () => {
    console.log(quizData);
    const { data } = await axios.post(`/api/quiz/${quizData?._id}/delete`);
    if (data.error) return setDeleteError(true);
    await queryClient.refetchQueries({ queryKey: ["myQuizzes"] });
    navigate("/");
  };

  useEffect(() => {
    if (quizData?.quizName && inputRef.current)
      inputRef.current.value = quizData.quizName;
  },[quizData])

  if (!quizId) return <Navigate to={"/"} />;

  if (!quizData || isLoading) return <LoadingScreen />;

  return (
    <>
      <div className={`${styles.createWrapper}`}>
        <div className={`${styles.iconsBarTop}`}>
          <TooltipWrapper
            message={
              activeSession
                ? "Unavailable with a session currently active"
                : "Laucnh a session with this quiz"
            }
          >
            <div
              onClick={() => nameModalRef.current?.open()}
              className={`${styles.startRoundBtn} ${
                activeSession ? styles.disabled : ""
              }`}
            >
              <p>Launch Session</p>
              <img src={shuttle} className={`${styles.shuttle}`} />
            </div>
          </TooltipWrapper>
          <div onClick={() => deleteModalRef.current?.open()}>
            <BoxIcon bgColor="#1a1a1a" Icon={BiTrash} />
          </div>
        </div>
        <section className={`${styles.sectionWrapper}`}>
          <p className={`${styles.sectionTitle}`}>Quiz Name:</p>
          <div className={`${styles.nameInputWrapper}`}>
            <input
              ref={inputRef}
              onChange={handleNameChange}
              autoFocus
              type="text"
              defaultValue={quizData?.quizName}
            />
          </div>
        </section>
        <RoundPicker rounds={quizData?.rounds?.length} />
        <section className={`${styles.sectionWrapper}`}>
          <div className={`${styles.questionsList}`}>
            {!quizData.rounds[roundIdx]?.length ? (
              <p>NO QUESTIONS ADDED</p>
            ) : (
              quizData.rounds[roundIdx].map(
                (question: QuestionData, idx: number) => (
                  <QuestionItem
                    modalRef={questionModalRef}
                    question={question}
                    idx={idx}
                    key={idx}
                    quizId={quizId}
                    roundIdx={+roundIdx}
                  />
                )
              )
            )}
          </div>
          <Link
            to={`/question/create/${quizId}/${roundIdx}`}
            className={`${styles.btn}`}
          >
            <button>
              <p>Add question</p> <RiPlayListAddLine />
            </button>
          </Link>
        </section>
      </div>

      <DeleteModal
        ref={deleteModalRef}
        deleteError={deleteError}
        title={quizData.quizName}
        handleClose={() => handleCloseModal("delete")}
        handleConfirm={handleDelete}
      />

      <CreateSessionModal
        quizId={quizId}
        ref={nameModalRef}
        handleClose={() => handleCloseModal("name")}
      />
    </>
  );
};

export default CreateQuiz;
