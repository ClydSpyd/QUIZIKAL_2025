import { useParticipantSession } from "@/context/participantSessionContext";
import { cn } from "@/utilities/cn";

export default function RoundEnder() {
  const { roundIdx } = useParticipantSession();
  return (
    <>
      <div
        className={cn(
          "bg-gradient-to-tr from-lime-500/30 via-orange-500/30 to-orange-400/30 backdrop-blur-md border-4 border-lime-400/70 rounded-xl shadow-2xl flex flex-col items-center px-8 py-7 relative z-20 p-4 w-[90%] max-w-[600px]"
        )}
      >
        <h1 className={"text-white font-bold text-lg"}>ROUND</h1>
        <h1
          className="grad-text text-[120px] font-black leading-none relative bottom-2"
          style={{ padding: 0 }}
        >
          {roundIdx + 1}
        </h1>
        <h1 className={"text-white font-bold text-lg"}>COMPLETE!</h1>
      </div>
      <h3 className="text-white/50 text-2xl font-bold relative bottom-2">
        Next round coming up...
      </h3>
    </>
  );
}
