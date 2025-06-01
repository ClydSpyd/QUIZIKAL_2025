import LogoMain from "@/components/ui/logo-main";
import { useParticipantSession } from "@/context/participantSessionContext";

export default function StatePendingRound() {
  const { sessionName, roundIdx } = useParticipantSession();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-[35%]">
      <LogoMain />
      <h1 className="text-[40px] font-bold text-main2"> {sessionName} </h1>
      <h1 className="text-[20px] font-bold text-main3">
        AWAITING ROUND {roundIdx + 1}
        {/* Round {roundIdx + 1}, Question {questionIdx + 1} will begin shortly! */}
      </h1>
    </div>
  );
}
