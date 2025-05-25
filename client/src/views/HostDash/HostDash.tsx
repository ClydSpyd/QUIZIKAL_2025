import styles from "./HostDash.module.scss";
import { motion } from "framer-motion";
import MyQuizzes from "@/components/MyQuizzes";
import { useAuth } from "@/context/authContext";
import { useUserData } from "@/queries/userData";
import LoadingScreen from "@/components/utilityComps/LoadingScreen/LoadingScreen";
import TriviaWidget from "@/components/TriviaWidget/TriviaWidget";
import ActiveSession from "@/components/ActiveSession";

const HostDash = () => {
  const { user } = useAuth();
  const { isLoading } = useUserData();

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
        <ActiveSession />
        <MyQuizzes userId={user?.id ?? ""} />
      </div>
    </motion.div>
  );
};

export default HostDash;
