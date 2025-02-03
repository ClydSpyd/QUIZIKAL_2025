export interface HostSessionContextData {
  sessionName: string,
  quizData: QuizData;
  sessionCode: string;
  sidecarCode: string;
  roundIdx: number;
  questionIdx: number;
  sessionStatus: SessionStatus;
  participants: Record<string, Participant>;
  userId: string | undefined;
  handleSessionUpdate: (data: Partial<SessionClientPayload>) => void;
}