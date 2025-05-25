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
  fetchResults: async (
    sessionCode: string,
    userId?: string
  ): Promise<ApiResponse<ResultsData[]>> => {
    try {
      const { data } = await baseClient.get(
        `/session/results/${sessionCode}${userId ? `/${userId}` : ""}`
      );
      return { data };
    } catch (error) {
      console.log("ERROR FETCHING RESULTS");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
  fetchQuestionResponses: async (
    sessionCode: string,
    roundIdx: number,
    questionIdx: number
  ): Promise<
    ApiResponse<{
      responses: Record<string, number[]>;
    }>
  > => {
    try {
      const { data } = await baseClient.get(
        `/session/responses/${sessionCode}?roundidx=${roundIdx}&questionidx=${questionIdx}`
      );
      return { data };
    } catch (error) {
      console.log("ERROR FETCHING QUESTION RESPONSES");
      const err = error as AxiosError;
      return { error: err.message };
    }
  },
  fetchQuestionReview: async (
    sessionCode: string,
    userId: string,
    roundIdx: number,
    questionIdx: number
  ): Promise<ApiResponse<QuestionReviewData>> => {
    try {
      const { data } = await baseClient.get(
        `/session/responses/review/${sessionCode}/${userId}?roundidx=${roundIdx}&questionidx=${questionIdx}`
      );
      return { data };
    } catch (error) {
      console.log("ERROR FETCHING QUESTION REVIEW");
      const err = error as AxiosError;
      return { error: err.message };
    }
  }
};
