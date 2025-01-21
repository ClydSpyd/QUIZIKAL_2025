import styles from './CreateQuiz.module.scss'
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { CgEye, CgTrashEmpty } from "react-icons/cg";
import loader from "assets/loaders/spin_orange.svg";
import Image from 'components/ui/Image';
import { RefObject } from 'react';
import axios from 'axios';
import { queryClient } from '@/main';

interface Props {
  question: QuestionData;
  idx: number;
  modalRef: RefObject<ModalRef>;
}

const Loader = () => {
  return <img style={{ height: "60px", width: "60px" }} src={loader} />;
};

const QuestionItem = ({ question, idx, modalRef }: Props) => {
  // const { setQuestionIdx } = useQuiz()
  const setQuestionIdx = (val:number) => console.log(val)

  const handleDelete = async () => {
    const { data } = await axios.post("/api/questions/delete", {
      questionId: question._id,
    });
    if(!data.error){
      queryClient.refetchQueries({ queryKey: ["quizData"] });
    }
  }
  const handleEye = () => {
    setQuestionIdx(idx)
    modalRef.current?.open();
  }
  
  return (
    <>
      <div className={`${styles.questionWrapper}`}>
        <h5 className={`${styles.number}`}>{idx + 1}.</h5>
        <p className={`${styles.questionText}`}>{question.questionText}</p>
        <div className={`${styles.options} ${styles[question.questionType]}`}>
          {question.options.map((option: string, idx: number) =>
            question.questionType === "PICTURE" ? (
              <Image
                key={idx}
                Placeholder={Loader}
                src={option}
                className={styles.img}
              />
            ) : (
              <p key={idx} className={`${styles.option}`}>
                <span>{idx + 1}. </span>
                {option}
              </p>
            )
          )}
        </div>
        <div className={`${styles.icons}`}>
          <div onClick={handleDelete} className={`${styles.delete} ${styles.icon}`}>
            <CgTrashEmpty />
          </div>
          <Link to={`/question/edit/${question._id}`}>
            <div className={`${styles.icon}`}>
              <FiEdit className={`${styles.edit}`} />
            </div>
          </Link>
          <div onClick={handleEye} className={`${styles.icon}`}>
            <CgEye />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionItem;