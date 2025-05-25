import { useQuery } from "@tanstack/react-query";
import { baseClient } from "@/api";
import { AxiosError } from "axios";

export const useReviewData = ({
  sessionCode,
  userId,
  roundIdx,
  questionIdx,
}: {
  sessionCode: string;
  userId: string;
  roundIdx: number;
  questionIdx: number;
}) => {
  const getReviewData = async (): Promise<QuestionReviewData> => {
    try {
      const { data } = await baseClient.get(
        `/session/responses/review/${sessionCode}/${userId}?roundidx=${roundIdx}&questionidx=${questionIdx}`
      );
      return  data;
    } catch (error) {
      console.log("ERROR FETCHING QUESTION REVIEW");
      const err = error as AxiosError;
      throw new Error(err.message);
    }
  };

  return useQuery<QuestionReviewData>({
    queryKey: ["reviewData", questionIdx, sessionCode, userId, roundIdx],
    queryFn: getReviewData,
    enabled: !!userId,
    select: (data) => data,
  });
};
