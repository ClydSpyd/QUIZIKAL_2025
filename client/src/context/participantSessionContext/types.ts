import { RefetchOptions } from "@tanstack/react-query";

export interface ParticipantSessionData {
  sessionName: string;
  sessionCode: string;
  userData: Participant | null;
  roundIdx: number;
  questionIdx: number;
  currentQuestion: RoundQuestion | null;
  roundStatus: RoundStatus;
  sessionStatus: SessionStatus;
  loading: boolean;
  refetch: (options?: RefetchOptions) => Promise<void>;
  handleSessionUpdate: (data: Partial<SessionClientPayload>) => void;
}
