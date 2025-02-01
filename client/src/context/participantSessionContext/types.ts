import { RefetchOptions } from "@tanstack/react-query";

export interface ParticipantSessionData {
  sessionName: string;
  sessionCode: string;
  userData: Participant | null;
  roundIdx: number;
  questionIdx: number;
  currentQuestion: QuestionData | null;
  roundStatus: RoundStatus;
  sessionStatus: SessionStatus;
  loading: boolean;
  error: string | null;
  refetch: (options?: RefetchOptions) => Promise<void>;
}
