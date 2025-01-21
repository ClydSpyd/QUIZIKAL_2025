import { Link } from "react-router-dom";
import styles from "./MyQuizzes.module.scss";
import { FiEdit } from "react-icons/fi";
import { TiDocumentAdd } from "react-icons/ti";
import { CgPlayList } from "react-icons/cg";
import sheetIcon from "../../assets/images/sheet_orange.png";
import { useMyQuizzes } from "@/queries/quizData";

export default function MyQuizzes({ userId }: { userId: string }) {
  const { data: myQuizzes, isLoading } = useMyQuizzes({ userId });

  return (
    <section className={`${styles.myQuizzesWrapper}`}>
      <div className={`${styles.sectionTitleWrapper}`}>
        <img src={sheetIcon} alt={"quiz-icon"} />
        <p>My Quizzes</p>
      </div>
      {/* <p className={`${styles.sectionTitle}`}>My Quizzes</p> */}
      <div className={`${styles.quizzes}`}>
        {isLoading ? (
          <p className={styles.loadingMsg}>loading quizzes...</p>
        ) : (
          myQuizzes.map((quiz: QuizData, idx: number) => (
            <div key={idx} className={`${styles.quizDiv}`}>
              <p>{quiz.quizName}</p>
              <div className={`${styles.icons}`}>
                <Link to={`/quiz/edit/${quiz._id}`}>
                  <FiEdit className={`${styles.edit}`} />
                </Link>
                <Link to={`/play/${quiz._id}`}>
                  <CgPlayList className={`${styles.start}`} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <button>
        {/* <button onClick={createQuiz}> */}
        <p>Create Quiz</p> <TiDocumentAdd />{" "}
      </button>
    </section>
  );
}
