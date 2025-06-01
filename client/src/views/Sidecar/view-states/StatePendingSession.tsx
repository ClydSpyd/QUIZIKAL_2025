import LogoMain from "@/components/ui/logo-main";
import { useParticipantSession } from "@/context/participantSessionContext";

export default function StatePendingSession() {
  const { sessionName } = useParticipantSession();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-[15%]">
      <div className="w-full flex justify-center">
        <LogoMain />
      </div>
      <h1 className="text-[40px] font-bold mb2 text-main2">
        WELCOME!
      </h1>
      <h1 className="text-[20px] font-bold text-main1">
        {sessionName} will begin shortly!
      </h1>
    </div>
  );
}
