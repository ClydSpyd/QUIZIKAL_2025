import { useNavigate } from "react-router-dom";
import sessionIcon from "assets/images/session.png";
import styles from "./HostDash.module.scss";
import { motion } from "framer-motion";
import MyQuizzes from "@/components/MyQuizzes";
import { useAuth } from "@/context/authContext";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useUserData } from "@/queries/userData";
import LoadingScreen from "@/components/utilityComps/LoadingScreen/LoadingScreen";
import TriviaWidget from "@/components/TriviaWidget/TriviaWidget";

const HostDash = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const createQuiz = async () => {
  //   console.log("hello_world");
  //   const { data } = await axios.post("/api/quiz/create");
  //   console.log(data);
  //   navigate(`/quiz/edit/${data.quizId}`);
  // };
  
  
  const { data: userData, isLoading } = useUserData();
  
    const goToSession = async () => {
      if(!userData?.activeSession) return;
      navigate(`/host/${userData.activeSession.sessionCode}`);
    };
  
  if(isLoading) return <LoadingScreen />

  return (
    // welcome {user}
    // trivia widget
    // your quizzes
    // xreate quiz
    <motion.div
      key={"dash"}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${styles.hostDashWrapper}`}>
        <TriviaWidget />
        <section className="mb-4 w-full p-4 relative rounded-lg border border-main2Dark bg-black1">
          <div className={`${styles.sectionTitleWrapper}`}>
            <img className="" src={sessionIcon} alt={"session-icon"} />
            <p>Active Session</p>
          </div>
          <div className="my-2 flex items-center w-full justify-between">
            <h3 className="text-xl">
              {userData?.activeSession
                ? userData.activeSession.sessionName
                : "NO SESSION"}
            </h3>
            <button className="!text-sm bg-black" onClick={goToSession}>
              <p className="!text-sm">Go To Session</p>{" "}
              <BsArrowRightSquareFill className={`h-[18px] w-[18px] ml-2`} />
            </button>
          </div>
        </section>
        <MyQuizzes userId={user?.id ?? ""} />
      </div>
    </motion.div>
  );
};

export default HostDash;
