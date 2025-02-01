import ParticipantSessionProvider, {
  useParticipantSession,
} from "@/context/participantSessionContext";
import ParticipantNameView from "./components/ParticipantNameView";

function Content() {
  const { userData, error, loading, sessionName, sessionCode } = useParticipantSession();

  return userData ? (
    userData.username ? (
      <div className="min-h-[700px] w-screen flex flex-col items-cente justify-center pb-[20%]">
        <h1 className="text-[40px] font-bold mb-4 text-main2">{sessionName}</h1>
        <h1>{sessionCode}</h1>
        <h1>{userData.id}</h1>
        <h1>{userData.username ?? userData.defaultName}</h1>
      </div>
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
  return (
    <ParticipantSessionProvider>
      <Content />
    </ParticipantSessionProvider>
  )
}
