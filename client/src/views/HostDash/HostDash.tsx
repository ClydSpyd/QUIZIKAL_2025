import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HostDash.module.scss";
import { motion } from "framer-motion";
import MyQuizzes from "@/components/MyQuizzes";
import { useAuth } from "@/context/authContext";

const HostDash = () => {
  const { user } = useAuth();

  // const createQuiz = async () => {
  //   console.log("hello_world");
  //   const { data } = await axios.post("/api/quiz/create");
  //   console.log(data);
  //   navigate(`/quiz/edit/${data.quizId}`);
  // };

  // const goToSession = async () => {
  //   navigate(`/play/${activeSession?.sessionCode}`);
  // };

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
        {/* {activeSession && (
          <section>
            <div className={`${styles.sectionTitleWrapper}`}>
              <img
                className={`${styles.sessionIcon}`}
                src={sessionIcon}
                alt={"session-icon"}
              />
              <p>Active Session</p>
            </div>
            <h3>{activeSession.sessionName}</h3>
            <button onClick={goToSession}>
              <p>Go To Session</p>{" "}
              <BsArrowRightSquareFill className={`${styles.fixed15}`} />
            </button>
          </section>
        )}> */}
        <MyQuizzes userId={user?.id ?? ""} />
      </div>
    </motion.div>
  );
};

export default HostDash;
