declare interface Host {
  _id: string,
  username:string,
  activeSession: SessionData,
  quizzes: string[],
}

declare interface AuthUserData {
  username: string;
  id: string;
}