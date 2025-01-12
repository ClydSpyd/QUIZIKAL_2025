import { useRef, useState } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "../../utilities/debounce";
import { BiTrash } from "react-icons/bi";
import { RiPlayListAddLine } from "react-icons/ri";
import RoundPicker from "components/RoundPicker/RoundPicker";
import DeleteModal from "components/ui/DeleteModal/DeleteModal";
import BoxIcon from "components/ui/BoxIcon/BoxIcon";
import Modal from "components/ui/Modal";
import QuestionItem from "./QuestionItem";
import LoadingScreen from "components/utilityComps/LoadingScreen/LoadingScreen";
import Question from "components/Question/Question";
import styles from "./CreateQuiz.module.scss";
import shuttle from 'assets/images/shuttle_white.png';

const saveQuiz = async (quizData: QuizData) => {
  console.log("SAVE")
  axios.post(`/api/quiz/${quizData._id}/update`, {
    quizData,
  });
};

const debounceSave = debounce(saveQuiz, 1000)

const CreateQuiz = () => {
  const questionModalRef = useRef<ModalRef>(null)
  const deleteModalRef = useRef<ModalRef>(null)
  const nameModalRef = useRef<ModalRef>(null)
  const inputRef = useRef<HTMLInputElement>(null);
  const { quizId } = useParams();
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({e})
    // debounceSave(newValues)
  };

  const handleLaunch = async (sessionName: string) => {
    console.log("LAUNCH SESSION")
    // const sesisonCode = await createQuizSession(quizId!, sessionName);
    navigate(`/play/${sesisonCode}`)
  }

  const handleCloseModal = (modal: 'delete' | 'name') => {
    if (modal === 'delete'){
      deleteModalRef.current?.close();
      setDeleteError(false);
    } else {
      nameModalRef.current?.close()
    }
  }

  const handleDelete = async () => {
    console.log(quizData)
    const { data } = await axios.post(`/api/quiz/${quizData._id}/delete`);
    if(data.error) return setDeleteError(true);
    navigate("/");
  }

  if (!quizId) return <Navigate to={"/"} />;

  if (!quizData || isLoading) return <LoadingScreen />;

  return (
    <>
      <div className={`${styles.createWrapper}`}>
        <div className={`${styles.iconsBarTop}`}>
          <div
            onClick={() => nameModalRef.current?.open()}
            className={`${styles.startRoundBtn}`}
          >
            <p>Launch Quiz</p>
            <img src={shuttle} className={`${styles.shuttle}`} />
          </div>
          <div onClick={() => deleteModalRef.current?.open()}>
            <BoxIcon bgColor="#1a1a1a" Icon={BiTrash} />
          </div>
          {/* <BiTrash onClick={()=>deleteModalRef.current?.open()}/> */}
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
                  />
                )
              )
            )}
          </div>
          <Link to={`/question/create/${quizId}`} className={`${styles.btn}`}>
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

      <SessionNameModal
        ref={nameModalRef}
        handleConfirm={(sessionName: string) => handleLaunch(sessionName)}
        handleClose={() => handleCloseModal("name")}
      />

      {quizData && (
        <Modal ref={questionModalRef}>
          <Question preview questions={quizData.rounds[roundIdx]} />
        </Modal>
      )}
    </>
  );
};

export default CreateQuiz;
