import styles from './CreateQuiz.module.scss'
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { CgEye, CgTrashEmpty } from "react-icons/cg";
import loader from "assets/loaders/spin_orange.svg";
import Image from 'components/ui/Image';
import { RefObject, useRef, useState } from 'react';
import axios from 'axios';
import { queryClient } from '@/main';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useQuizData } from '@/queries/quizData';

interface Props {
  question: QuestionData;
  idx: number;
  roundIdx: number;
  modalRef: RefObject<ModalRef>;
  quizId: string;
}

const Loader = () => {
  return <img style={{ height: "60px", width: "60px" }} src={loader} />;
};

const QuestionItem = ({ question, idx, roundIdx, modalRef, quizId }: Props) => {
  const [deleteState, setDeleteState] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const { data: quizData } = useQuizData({ quizId });

  const handleDelete = async () => {
    const { data } = await axios.delete(
      `/api/question/${quizId}/${roundIdx}/${idx}`
    );
    if (!data.error) {
      queryClient.refetchQueries({ queryKey: ["quizData"] });
      setDeleteState(false);
    }
  };
  const handleEye = () => {
    modalRef.current?.open();
  };

  useOutsideClick(contRef, () => setDeleteState(false));

  return (
    <>
      <div ref={contRef} className={`${styles.questionWrapper}`}>
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
          <div
            onClick={() => setDeleteState(!deleteState)}
            className={`${styles.delete} ${styles.icon}`}
          >
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

        <div
          className={`${styles.deleteState} ${deleteState && styles.display}`}
        >
          <p>
            Delete this item from <span>{quizData?.quizName}</span>?
          </p>
          <div className={`${styles.btns}`}>
            <button
              onClick={handleDelete}
              className={`${styles.btn} ${styles.confirm}`}
            >
              Confirm
            </button>
            <button
              onClick={() => setDeleteState(false)}
              className={`${styles.btn} ${styles.cancel}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionItem;