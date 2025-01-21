import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sessionIcon from "assets/images/session.png";
import styles from "./HostDash.module.scss";
import { motion } from "framer-motion";
import MyQuizzes from "@/components/MyQuizzes";
import { useAuth } from "@/context/authContext";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useUserData } from "@/queries/userData";

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
      navigate(`/play/${userData.activeSession.sessionCode}`);
    };
  
  if(isLoading) return <h1>LOADING</h1>

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
        <section>
          <div className={`${styles.sectionTitleWrapper}`}>
            <img
              className={`${styles.sessionIcon}`}
              src={sessionIcon}
              alt={"session-icon"}
            />
            <p>Active Session</p>
          </div>
          <h3>
            {userData?.activeSession
              ? userData.activeSession.sessionName
              : "NO SESSION"}
          </h3>
          <button onClick={goToSession}>
            <p>Go To Session</p>{" "}
            <BsArrowRightSquareFill className={`${styles.fixed15}`} />
          </button>
        </section>
        <MyQuizzes userId={user?.id ?? ""} />
      </div>
    </motion.div>
  );
};

export default HostDash;
