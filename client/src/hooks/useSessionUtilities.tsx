/* eslint-disable @typescript-eslint/no-explicit-any */
import { addAnimation } from "@/utilities/addAnimation";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSessionUtilities = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [sessionCode, setSessionCodeState] = useState<string | null>();
  const navigate = useNavigate();

  useEffect(() => {console.log('öö: ', sessionCode)},[sessionCode])

  const handleExitSession = () => {
    navigate("/");
  };

  const handleSessionCode = (code: string) => {
    setSessionCodeState(code)
  }

  const handleError = (error: string, ref: React.RefObject<any>) => {
    setLoading(false);
    setError(error);
    addAnimation("shakeHoriz", ref, 400);
  };

  const getSession = async (
    sessionCode: string,
    callback?: Dispatch<SetStateAction<QuizData | undefined>>
  ) => {
    try {
      const { data } = await axios.get(`/api/session/${sessionCode}`);
      callback?.(data.quizData);
      return data;
    } catch (error) {
      const err = error as { response: { data: { error: string[] } } };
      return err.response.data;
    }
  };

  const handleJoinSession = async (
    e: React.FormEvent,
    nameRef: React.RefObject<HTMLInputElement>,
    btnRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("CODE: ", sessionCode)
    const name = nameRef.current?.value;
    if (!sessionCode || sessionCode.length < 4) {
      handleError("Please enter a session code", btnRef);
    } else if (name === "") {
      nameRef.current?.focus();
      handleError("Please enter your name", btnRef);
    } 
    // else {
    //   setLoading(true);
    //   const { error } = await getSession(sessionCode);
    //   if (error) {
    //     handleError(error, btnRef);
    //     setTimeout(() => setLoading(false), 1000);
    //   } else {
    //     // dispatch(setUsername(name!));
    //     navigate(`/play/${sessionCode}`);
    //   }
    // }
  };

  return {
    handleExitSession,
    getSession,
    loading,
    setLoading,
    handleJoinSession,
    error,
    setError,
    sessionCode,
    setSessionCode: handleSessionCode,
  };
};
