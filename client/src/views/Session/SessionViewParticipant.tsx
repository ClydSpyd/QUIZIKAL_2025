import ParticipantSessionProvider, {
  useParticipantSession,
} from "@/context/participantSessionContext";
import ParticipantNameView from "./components/ParticipantNameView";
import SessionContentParticipant from "./components/SessionContentParticipant";
import { useParams } from "react-router-dom";
import SidecarView from "../Sidecar";

function Content() {
  const { userData, loading, roundIdx, questionIdx } = useParticipantSession();
  const error = null;
  console.log({roundIdx, questionIdx})
  return userData ? (
    userData.username ? (
      <SessionContentParticipant />
    ) : (
      <ParticipantNameView />
    )
  ) : (
    loading ||
      (error && (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <>
            <h1>{error ?? "loading..."}</h1>
          </>
        </div>
      ))
  );
}

export default function SessionViewParticipant() {
  const { sidecar } = useParams();
  return (
    <ParticipantSessionProvider>
       {sidecar ? <SidecarView /> : <Content />}
    </ParticipantSessionProvider>
  );
}
