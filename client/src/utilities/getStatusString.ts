export function getStatusString(status: SessionStatus): string {
  switch (status) {
    case "pending":
      return "Session Pending";
    case "pendingQuestion":
      return "Quesiton Pending";
    case "question":
      return "Question";
    case "pendingRound":
      return "Round Pending";
    case "resultRoundPending":
      return "Results Pending";
    case "resultRound":
      return "Round results";
    case "resultPending":
      return "End Results Pending";
    case "result":
      return "Quiz Results";
    case "paused":
      return "Session paused";
    case "ended":
      return "Session ended";
    default:
      return "";
  }
}
