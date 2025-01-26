import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import joinIcon from "assets/images/join_yellow2.png";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import { useSessionUtilities } from "@/hooks/useSessionUtilities";
import { useAuth } from "@/context/authContext";
import LandingLayout from "@/components/utilityComps/LandingLayout";

const Landing = () => {
  const codeRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  // const { sessionCode } = useSelector((state: RootState) => state.quiz);
  const { handleJoinSession, error, setError } = useSessionUtilities();
  const [sessionCode, setSessionCode] = useState("");
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
        setSessionCode(e.target.value);
      },
    },
  ];
  // loggedin host redirect to dash
  if (user) return <Navigate to="/dashboard" />;

  // // active participation in quiz, redirect to session view
  // if (username && sessionCode && !isHost) return <Navigate to={`/play/${sessionCode}`} />;

  return (
    <LandingLayout>
      <CardForm
        inputs={inputs}
        title={"Join Session"}
        icon={
          <img src={joinIcon} className="h-[25px] w-[40px] object-contain" />
        }
        onSubmit={onSubmit}
        error={error}
        btnRef={btnRef}
        titleColor="yellow"
        loading={false}
        conditionalInput={{
          condition: !!(sessionCode && sessionCode.length > 3),
          input: {
            placeholder: "your name",
            ref: nameRef,
            type: "text",
            name: "nameInput",
          },
        }}
      />
    </LandingLayout>
  );
};

export default Landing;
