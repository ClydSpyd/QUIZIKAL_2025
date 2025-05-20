/* eslint-disable @typescript-eslint/no-explicit-any */
import { addAnimation } from "@/utilities/addAnimation";
import { deconstructMulticode } from "@/utilities/multicodeElements";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSessionUtilities = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [codeInput, setCodeInput] = useState<string | null>();
  const navigate = useNavigate();

  useEffect(() => {console.log('öö: ', codeInput)},[codeInput])

  const handleExitSession = () => {
    navigate("/");
  };

  const handleCodeInout = (code: string) => {
    setCodeInput(code)
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
      return {error: err.response.data};
    }
  };

  const handleJoinSession = async (
    e: React.FormEvent,
    nameRef: React.RefObject<HTMLInputElement>,
    btnRef: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("CODE: ", codeInput)
    const name = nameRef.current?.value;
    if (!codeInput || codeInput.length < 4) {
      handleError("Please enter a session code", btnRef);
    } else if (name === "") {
      nameRef.current?.focus();
      handleError("Please enter your name", btnRef);
    } 
    else {
      setLoading(true);
      const { sessionCode, userId } = deconstructMulticode(codeInput);
      const { error, session: sessionData } = await getSession(sessionCode);
      const participantFound = !!sessionData?.responses?.[userId];
      console.log({ sessionCode, userId, participantFound, sessionData });

      if (!participantFound) {
        handleError("Session user not found", btnRef);
        setTimeout(() => setLoading(false), 1000);
      } else if (error) {
        handleError(error, btnRef);
        setTimeout(() => setLoading(false), 1000);
      } else {
        // dispatch(setUsername(name!));
        navigate(`/play/${codeInput}`);
      }
      setLoading(false);
    }
  };

  return {
    handleExitSession,
    getSession,
    loading,
    setLoading,
    handleJoinSession,
    error,
    setError,
    codeInput,
    setCodeInput: handleCodeInout,
  };
};
