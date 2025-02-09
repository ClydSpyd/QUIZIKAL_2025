import { useParticipantSession } from "@/context/participantSessionContext";

export default function StatePendingSession() {
  const { sessionName, userData } = useParticipantSession();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-[20%]">
      <h1 className="text-[40px] font-bold mb2 text-main2">
        WELCOME {userData?.username}!
      </h1>
      <h1 className="text-[20px] font-bold text-main1">
        {sessionName} will begin shortly!
      </h1>
    </div>
  );
}
