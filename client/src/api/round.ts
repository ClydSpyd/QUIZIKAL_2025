import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse, ErrorResponse } from "./types";

export const roundAPIHandlers = {
  getClientQuestion: async ({
    userId,
    sessionCode,
    roundIdx,
    questionIdx,
  }: {
    userId: string;
    sessionCode: string;
    roundIdx: number;
    questionIdx: number;
  }): Promise<ApiResponse<RoundQuestion>> => {
    try {
      const res = await baseClient.post("/question/participant", {
        userId,
        sessionCode,
        roundIdx,
        questionIdx,
      });

      return { data: res.data };
    } catch (error) {
      console.log("ERROR RETREIVING PARTICIPANT QUESTIONDATA");
      const err = error as AxiosError<ErrorResponse>;
      return { error: err.response?.data.error };
    }
  },
};
