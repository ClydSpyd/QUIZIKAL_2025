declare interface Host {
  _id: string,
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