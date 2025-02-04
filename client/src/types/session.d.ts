/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface SessionData {
  _id: string;
  sessionName: string;
  sessionCode: string;
  roundIdx: number;
  questionIdx: number;
  participants: Record<string, Participant>; // {[userId]:[username]} userId to be UUID which serves as session access code for user.
  responses: Record<string, [number][]>; // array of optionIdx values for each round e.g [[0,3,1,1],[2,1,3]]
  sessionStatus: SessionStatus;
  questions: object[][]; // @todo define question format & create interface
  quizId: string;
  quizData: Record<any, any>;
}

declare interface ParticipantSessionData {
  userData: Participant,
  roundIdx: number,
  questionIdx: number,
  sessionStatus: SessionStatus,
  sessionName: string,
  sessionCode: string,
}

declare type SessionStatus =
  | "pending" // session not begun
  | "question" // active question awaiting responses
  | "resultRound" // display round results to all users
  | "pendingRound" // between rounds
  | "result" // show quiz results to all users
  | "ended"; // session finalized

declare type RoundStatus =
  | "pendingResponse" // user has not responded to current active round
  | "waiting" // user has responded to current active round
  | "inactive"; // round finalized

// <--- interfaces to be used for socket
declare interface ConnectedUser {
  _id: string;
  username: string;
  isHost: boolean;
}

// <---
