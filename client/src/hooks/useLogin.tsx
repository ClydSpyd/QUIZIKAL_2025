/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { loginHost } from "@/reduxConfig/reducers/userReducer";
import { addAnimation } from "@/utilities/addAnimation";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [sessionCode, setSessionCode] = useState<string | null>();
  const [, setUser] = useLocalStorage<AuthUserData | null>(
    "QUIZIKAL_USER",
    null
  );
  const navigate = useNavigate();

  const handleError = (error: string, ref: React.RefObject<any>) => {
    setError(error);
    addAnimation("shakeHoriz", ref, 400);
    setLoading(false)
  };
  const handleRegisterUser = async (
    e: React.FormEvent,
    usernameRef: React.RefObject<HTMLInputElement>,
    passRef: React.RefObject<HTMLInputElement>,
    passRepRef: React.RefObject<HTMLInputElement>,
    btnRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = passRef.current?.value;
    const passRep = passRepRef.current?.value;

    if (username === "" || password === "" || passRep === "") {
      handleError("Please complete all fields", btnRef);
    } else if (password !== passRep) {
      handleError("Passwords do not match", btnRef);
    } else {
      try {
        const { data } = await axios.post("/api/auth/register", {
          username,
          password,
        });
        setTimeout(() => {
          setUser(data);
          navigate("/dashboard");
          setLoading(false);
        }, 500);
      } catch (error) {
        const err = error as { response: { data: { error: string[] } } };
        handleError(err.response.data.error[0], btnRef);
      }
    }
  };

  return {
    loading,
    setLoading,
    handleRegisterUser,
    error,
    setError,
    sessionCode,
    setSessionCode,
  };
};
