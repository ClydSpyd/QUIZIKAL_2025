import { useSession } from "@/context/hostSessionContext";
import ParticipantSessionProvider, {
  useParticipantSession,
} from "@/context/participantSessionContext";

function Content() {
  const { userData, error, loading } = useParticipantSession();
  // const userName = participants[userId]
  console.log({ userData });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {userData ? (
        <>
          <h1>öÖö</h1>
          <h1>{userData.id}</h1>
          <h1>{userData.username ?? userData.defaultName}</h1>
        </>
      ) : loading || error ? (
        <>
          <h1>{error ?? "loading..."}</h1>
        </>
      ) : (
        <h1>ö</h1>
      )}
    </div>
  );
}

export default function SessionViewParticipant() {
  return (
    <ParticipantSessionProvider>
      <Content />
    </ParticipantSessionProvider>
  );
}
