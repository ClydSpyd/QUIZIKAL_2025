/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface SessionData {
  _id: string;
  sessionName: string;
  sessionCode: string;
  sidecarCode: string;
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
  sidecarCode: string,
}

declare type SessionStatus =
  | "pending" // session not begun
  | "pendingQuestion" // between questions
  | "question" // active question awaiting responses
  | "pendingRound" // awaiting to start next round
  | "resultRoundPending" // between rounds
  | "resultRound" // display round results to all users
  | "resultPending" // session finished, awaiting results
  | "result" // show quiz results to all users
  | "paused" // session is paused
  | "ended"; // session finalized

declare type RoundStatus =
  | "pendingResponse" // user has not responded to current active round
  | "waiting" // user has responded to current active round
  | "inactive"; // round finalized

declare interface ResultsData {
  userName: string;
  roundTotals: number[];
  roundLengths: number[];
  totalScore: number;
  userStatus: "active" | "inactive";
}

declare interface QuestionReviewData {
  response: number,
  roundLength: number,
  questionIdx: number,
  question: QuestionData,
}

// <--- interfaces to be used for socket
declare interface ConnectedUser {
  _id: string;
  username: string;
  isHost: boolean;
}

// <---
