import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";

export const useUserData = () => {
  const { user } = useAuth();

  const userId = user?.id ?? "";

  const getUserData = async (): Promise<Host> => {
    console.log("GET USER DATA");
    const { data } = await axios.get(`/api/user/${userId}`);
    return data;
  };

  return useQuery({
    queryKey: ["quizData", userId],
    queryFn: getUserData,
    enabled: !!userId,
    select: (data) => data,
  });
};
