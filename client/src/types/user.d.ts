declare interface Host {
  id: string,
  username:string,
  activeSession: SessionData,
  quizzes: string[],
}

declare interface Participant {
  id: string,
  username: string | null,
  defaultName: string,
  status: 'active' | 'inactive',
  roundStatus: RoundStatus,
}

declare interface AuthUserData {
  username: string;
  id: string;
}

declare interface SocketUser {
  id: string;
  userId: string;
  username: string;
}

declare interface SessionClientPayload {
  roundIdx: number;
  questionIdx: number;
  roundStatus: RoundStatus;
  sessionStatus: SessionStatus;
  questionData: QuestionData;
  sidecarCode: string;
}