export interface ParticipantSessionData {
  userData: Participant | null;
  roundIdx: number;
  questionIdx: number;
  currentQuestion: QuestionData | null;
  roundStatus: RoundStatus;
  sessionStatus: SessionStatus;
  loading: boolean;
  error: string | null;
}
