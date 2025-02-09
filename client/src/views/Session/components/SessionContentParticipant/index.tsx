import { useParticipantSession } from "@/context/participantSessionContext";
import StatePendingSession from "./view-states/StatePendingSession";
import StatePendingRound from "./view-states/StatePendingRound";

export default function SessionContentParticipant(){
    const { sessionStatus } = useParticipantSession();

    const views: Record<SessionStatus, JSX.Element> = {
      pending: <StatePendingSession />,
      pendingRound: <StatePendingRound />,
      question: <h1>question</h1>,
      resultRound: <h1>resultRound</h1>,
      result: <h1>result</h1>,
      ended: <h1>ended</h1>,
    };
  return views[sessionStatus];
}