export interface SessionContextData {
  sessionName: string,
  quizData: QuizData;
  sessionCode: string;
  isHost: boolean;
  sidecarCode: string;
  roundIdx: number;
  questionIdx: number;
  sessionStatus: SessionStatus;
  error: string | null;
  loading: boolean;
  participants: Record<string, string>;
  userId: string | undefined;
}