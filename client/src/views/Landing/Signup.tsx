import { motion } from "framer-motion";
import { useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import { useLogin } from "@/hooks/useLogin";
import LandingLayout from "@/components/utilityComps/LandingLayout";

const Signup = () => {
  const btnRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passRepRef = useRef<HTMLInputElement>(null);
  const { loading, error, setError, handleRegisterUser } = useLogin();

  const onSubmit = (e: React.FormEvent) =>
    handleRegisterUser(e, usernameRef, passRef, passRepRef, btnRef);

  const inputs: InputType[] = [
    {
      onChange: () => setError(null),
      autofocus: true,
      placeholder: "username",
      ref: usernameRef,
      type: "text",
      name: "username",
    },
    {
      onChange: () => setError(null),
      placeholder: "password",
      ref: passRef,
      type: "password",
      name: "password",
    },
    {
      onChange: () => setError(null),
      placeholder: "reperat password",
      ref: passRepRef,
      type: "password",
      name: "repeat password",
    },
  ];
  return (
    <LandingLayout>
      <CardForm
        title={"New User"}
        icon={<FaUserPlus />}
        inputs={inputs}
        onSubmit={onSubmit}
        btnText="GO"
        error={error}
        link={{
          text: "Already a member? Sign in",
          route: "/login",
          linkText: "here",
        }}
        loading={loading}
        btnRef={btnRef}
      />
    </LandingLayout>
  );
};

export default Signup;
