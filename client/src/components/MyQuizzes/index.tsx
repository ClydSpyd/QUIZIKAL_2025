import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./MyQuizzes.module.scss";
import { FiEdit } from "react-icons/fi";
import { TiDocumentAdd } from "react-icons/ti";
import { CgPlayList } from "react-icons/cg";
import sheetIcon from "../../assets/images/sheet_orange.png";

export default function MyQuizzes({ userId }: { userId: string }) {
  const [myQuizzes, setMyQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`/api/quiz/${userId}`);
        setMyQuizzes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizzes();
  }, [userId]);

  return (
    <section className={`${styles.myQuizzesWrapper}`}>
      <div className={`${styles.sectionTitleWrapper}`}>
        <img src={sheetIcon} alt={"quiz-icon"} />
        <p>My Quizzes</p>
      </div>
      {/* <p className={`${styles.sectionTitle}`}>My Quizzes</p> */}
      <div className={`${styles.quizzes}`}>
        {myQuizzes?.map((quiz: QuizData, idx: number) => (
          <div key={idx} className={`${styles.quizDiv}`}>
            <p>{quiz.quizName}</p>
            <div className={`${styles.icons}`}>
              <Link to={`/quiz/edit/${quiz._id}`}>
                <FiEdit className={`${styles.edit}`} />
              </Link>
              <Link to={`/quiz/play/${quiz._id}`}>
                <CgPlayList className={`${styles.start}`} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button>
        {/* <button onClick={createQuiz}> */}
        <p>Create Quiz</p> <TiDocumentAdd />{" "}
      </button>
    </section>
  );
}
