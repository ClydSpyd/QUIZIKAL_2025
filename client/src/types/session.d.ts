declare interface SessionData {
  _id: string;
  sessionName: string;
  sessionCode: string;
  roundIdx: number;
  questionIdx: number;
  participants: Record<string, string>; // {[userId]:[username]} userId to be UUID which serves as session access code for user.
  responses: Record<string, [number][]>; // array of optionIdx values for each round e.g [[0,3,1,1],[2,1,3]]
  sessionStatus: SessionStatus;
  questions: object[][]; // @todo define question format & create interface
  quizId: string;
}

declare type SessionStatus =
  | "pending" // session not begun
  | "question" // active question awaiting responses
  | "resultRound" // display round results to all users
  | "pendingRound" // between rounds
  | "result" // show quiz results to all users
  | "ended"; // session finalized

// <--- interfaces to be used for socket
declare interface ConnectedUser {
  _id: string;
  username: string;
  isHost: boolean;
}

declare interface Participant {
  _id: string;
  username: string;
  roundStatus: string;
}
// <---
