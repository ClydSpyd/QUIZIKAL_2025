import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";

export const sessionQueryHandlers = {
  createSession: async (
    userId: string,
    quizId: string,
    sessionName: string
  ): Promise<ApiResponse<string>> => {
    try {
      const { data } = await baseClient.post("/session/create", {
        userId,
        quizId,
        sessionName,
      });

      return { data: data.sessionCode };
    } catch (error) {
      console.log("ERROR CREATING SESSION");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
  addParticipant: async (
    sessionCode: string
  ): Promise<ApiResponse<{ userId: string, username: string }>> => {
    try {
      const { data } = await baseClient.post(`/session/${sessionCode}/participant`);

      return { data };
    } catch (error) {
      console.log("ERROR ADDING PARTICIPANT");
      const err = error as AxiosError;
      return { error: err.message };
    }

  },
};
