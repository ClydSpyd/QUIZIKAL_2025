/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";
import { useLocalStorage } from 'usehooks-ts'
import { AuthContextType, AuthProviderProps } from "./types";
import { addAnimation } from "@/utilities/addAnimation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useLocalStorage<AuthUserData | null>(
    "QUIZIKAL_USER",
    null
  );
  const navigate = useNavigate();
  
  const handleError = (error: string, ref: React.RefObject<HTMLElement>) => {
    setError(error);
    addAnimation("shakeHoriz", ref, 400);
    setLoading(false)
  };

  const handleLogin = async (
    e: React.FormEvent,
    usernameRef: React.RefObject<HTMLInputElement>,
    passRef: React.RefObject<HTMLInputElement>,
    btnRef: React.RefObject<HTMLInputElement>
  ) => {
    setLoading(true);
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passRef.current?.value;

    if (username === "" || password === "") {
      handleError("Please complete all fields", btnRef);
    } else {
      try {
        const { data } = await axios.post("/api/auth/login", {
          username,
          password,
        });
        console.log(data);
        setTimeout(() => {
          setUser(data)
          navigate("/dashboard");
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        const err = error as { response: { data: { error: string } } };
        handleError(err.response.data.error, btnRef);
      }
    }
  };


  const logout = () => {
    setUser(null)
    localStorage.removeItem("QUIZIKAL_USER")
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
