import { Link, useNavigate } from "react-router-dom";
import styles from "./MyQuizzes.module.scss";
import { FiEdit } from "react-icons/fi";
import { TiDocumentAdd } from "react-icons/ti";
import { CgPlayList } from "react-icons/cg";
import sheetIcon from "../../assets/images/sheet_orange.png";
import { useMyQuizzes } from "@/queries/quizData";
import axios from "axios";
import TooltipWrapper from "../utilityComps/TooltipWrapper";
import { queryClient } from "@/main";

export default function MyQuizzes({ userId }: { userId: string }) {
  const { data: myQuizzes, isLoading } = useMyQuizzes({ userId });
  const navigate = useNavigate();

  const createQuiz = async () => {
    console.log("hello_world");
    const { data } = await axios.post("/api/quiz/create", { userId });
    console.log(data);
    navigate(`/quiz/edit/${data.quizId}`);
    queryClient.refetchQueries({ queryKey: ["myQuizzes"] });
  };

  return (
    <section
      className={`${styles.myQuizzesWrapper} rounded-lg border border-main3 p-4 bg-black1 relative`}
    >
      <div className="w-full flex items-center gap-2">
        <img src={sheetIcon} alt={"quiz-icon"} className="w-[30px] h-[30px]" />
        <p className="text-lg text-main1">My Quizzes</p>
      </div>
      {/* <p className={`${styles.sectionTitle}`}>My Quizzes</p> */}
      <div className={`box-border w-full flex flex-col gap-4`}>
        {isLoading ? (
          <p className={styles.loadingMsg}>loading quizzes...</p>
        ) : !myQuizzes.length ? (
          <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
            <p className="text-sm text-white/80">No quizzes found</p>
            <button className="self-center" onClick={createQuiz}>
              <p>Create Quiz</p> <TiDocumentAdd />{" "}
            </button>
          </div>
        ) : (
          <div className="mt-2 py-3 flex flex-col gap-4">
            {myQuizzes.map((quiz: QuizData, idx: number) => (
              <div
                key={idx}
                className={`flex items-center justify-between py-3 px-4 rounded-md bg-grey2 text-white`}
              >
                <p>{quiz.quizName}</p>
                <div className={`flex items-center gap-2 box-border`}>
                  <TooltipWrapper message="edit quiz">
                    <Link
                      to={`/quiz/edit/${quiz._id}`}
                      className="flex items-center justify-center border border-transparent rounded-sm w-[30px] h-[30px] transition-colors duration-200 hover:border-main1"
                    >
                      <FiEdit className={`text-white w-[18px] h-[18px]`} />
                    </Link>
                  </TooltipWrapper>
                  <TooltipWrapper message="preview questions">
                    <Link
                      to={`/play/${quiz._id}`}
                      className="flex items-center justify-center border border-transparent rounded-sm w-[30px] h-[30px] transition-colors duration-200 hover:border-main1"
                    >
                      <CgPlayList
                        className={`text-white w-[25px] h-[25px] relative top-[1px] left-[1px]`}
                      />
                    </Link>
                  </TooltipWrapper>
                </div>
              </div>
            ))}
            <div className="flex w-full justify-end">
              <button onClick={createQuiz}>
                <p>Create Quiz</p> <TiDocumentAdd />{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
