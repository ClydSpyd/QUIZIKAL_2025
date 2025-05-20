import { useParticipantSession } from "@/context/participantSessionContext";
import StatePendingSession from "./view-states/StatePendingSession";
import StatePendingRound from "./view-states/StatePendingRound";
import StateQuestion from "./view-states/StateQuestion";

export default function SessionContentParticipant(){
    const { sessionStatus } = useParticipantSession();

    const views: Record<SessionStatus, JSX.Element> = {
      pending: <StatePendingSession />,
      pendingRound: <StatePendingRound />,
      question: <StateQuestion />,
      resultRound: <h1>resultRound</h1>,
      result: <h1>result</h1>,
      ended: <h1>ended</h1>,
    };
  return (
    <div className="w-full h-full min-w-screen min-h-screen">
      {views[sessionStatus]}
    </div>
  );
}