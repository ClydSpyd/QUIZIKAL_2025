import { useRef } from "react";
import styles from "./Landing.module.scss";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { RootState } from "@/reduxConfig/Store";
import { motion } from "framer-motion";
import joinIcon from "assets/images/join_yellow2.png";
// import { useSessionUtilities } from "@/hooks/useSessionUtilities";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import { useSessionUtilities } from "@/hooks/useSessionUtilities";
import { useAuth } from "@/context/authContext";

const Landing = () => {
  const codeRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  // const { sessionCode } = useSelector((state: RootState) => state.quiz);
  const { handleJoinSession, error, setError } = useSessionUtilities();

  const onSubmit = (e: React.FormEvent) =>
    handleJoinSession(e, nameRef, btnRef);

  const inputs: InputType[] = [
    {
      autofocus: true,
      placeholder: "session code",
      ref: codeRef,
      type: "text",
      name: "sessionCode",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        console.log("ö: ", e.target.value);
        // setSessionCode(e.target.value);
      },
    },
  ];
  // loggedin host redirect to dash
  if (user) return <Navigate to="/dashboard" />;

  // // active participation in quiz, redirect to session view
  // if (username && sessionCode && !isHost) return <Navigate to={`/play/${sessionCode}`} />;

  return (
    <motion.div
      key={"dash"}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.landingWrapper}`}
    >
      <CardForm
        inputs={inputs}
        title={"Join Session"}
        icon={<img src={joinIcon} />}
        onSubmit={onSubmit}
        error={error}
        btnRef={btnRef}
        titleColor="yellow"
        loading={false}
        // conditionalInput={{
        //   condition: !!(sessionCode && sessionCode.length > 3),
        //   input: {
        //     placeholder: "your name",
        //     ref: nameRef,
        //     type: "text",
        //     name: "nameInput",
        //   },
        // }}
      />
    </motion.div>
  );
};

export default Landing;
