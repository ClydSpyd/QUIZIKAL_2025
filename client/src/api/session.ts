import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse, ErrorResponse } from "./types";

export const sessionAPIHandlers = {
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
  ): Promise<ApiResponse<{ userId: string; username: string }>> => {
    try {
      const { data } = await baseClient.post(
        `/session/${sessionCode}/participant`
      );

      return { data };
    } catch (error) {
      console.log("ERROR ADDING PARTICIPANT");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
  removeParticipant: async (
    sessionCode: string,
    userId: string
  ): Promise<ApiResponse<{ userId: string; username: string }>> => {
    try {
      const { data } = await baseClient.patch(
        `/session/${sessionCode}/participant/${userId}`,
        { payload: { status: "inactive" } }
      );
      return { data };
    } catch (error) {
      console.log("ERROR DELETING PARTICIPANT");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
  setParticipentName: async (
    sessionCode: string,
    userId: string,
    username: string
  ): Promise<ApiResponse<{ userId: string; username: string }>> => {
    try {
      const { data } = await baseClient.patch(
        `/session/${sessionCode}/participant/${userId}`,
        { payload: { username } }
      );
      return { data };
    } catch (error) {
      console.log("ERROR UPDATING PARTICIPANT NAME");
      const err = error as AxiosError<ErrorResponse>;
      return { error: err.response?.data.error };
    }
  },
  fetchParticipantSession: async (
    multiCode: string
  ): Promise<ApiResponse<ParticipantSessionData>> => {
    try {
      const { data } = await baseClient.get(
        `/session/participant/${multiCode}`
      );
      return { data };
    } catch (error) {
      console.log("ERROR FETCHING PARTICIPANT DATA");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
};
