import { motion } from "framer-motion";
import React, { useRef } from "react";
import { TbLogin2 } from "react-icons/tb";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import { useAuth } from "@/context/authContext";
import LandingLayout from "@/components/utilityComps/LandingLayout";

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
    <LandingLayout>
      <CardForm
        title={"Host login"}
        icon={<TbLogin2 className="text-main1 h-[25px] w-[25px]" />}
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
    </LandingLayout>
  );
};

export default HostLogin;
