import styles from "./Landing.module.scss";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { TbLogin2 } from "react-icons/tb";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import { useAuth } from "@/context/authContext";

const HostLogin = () => {
  const btnRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { error, setError, login, loading } = useAuth();

  const onSubmit = (e: React.FormEvent) =>
    login(e, usernameRef, passRef, btnRef);

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
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.landingWrapper}`}
    >
      <CardForm
        title={"Host login"}
        icon={<TbLogin2 />}
        inputs={inputs}
        onSubmit={onSubmit}
        btnText="GO"
        error={error}
        link={{
          text: "New user? Create an account",
          route: "/signup",
          linkText: "here",
        }}
        loading={loading}
        btnRef={btnRef}
      />
    </motion.div>
  );
};

export default HostLogin;
