/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface SessionData {
  _id: string,
  sessionName: string,
  roundIdx: number,
  questionIdx: number,
  participants: Participant[],
  connectedUsers: ConnectedUser[],
  responses: Record<string, [number][]>, // @todo define data shape for storing participant responses
  sessionStatus: SessionStatus,
  questions: any[], // @todo define question format & create interface
  quizId: string;
}
  declare type SessionStatus =
  | "pending" // session not begun
  | "question" // active question awaiting responses
  | "resultRound" // display round results to all users
  | "pendingRound" // between rounds
  | "result" // show quiz results to all users
  | "ended"; // session finalized

declare interface ConnectedUser {
  _id: string,
  username: string,
  isHost: boolean
}

declare interface Participant {
  _id: string,
  username: string,
  roundStatus: string,
}
