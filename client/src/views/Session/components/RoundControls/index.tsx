import { useHostSession } from "@/context/hostSessionContext"
import { useSocket } from "@/context/socketContext";

export default function RoundControls(){
  const { sessionStatus, handleSessionUpdate } = useHostSession();
  const {socket} = useSocket();

  const startSession = () => {
    handleSessionUpdate({sessionStatus:"pendingRound"})
    socket?.emit("round-update", { sessionStatus: "pendingRound" });
  };

  const pauseSession = () => {
    handleSessionUpdate({sessionStatus:"pending"})
    socket?.emit("round-update", { sessionStatus: "pending" });
  };

  return (
    <div className="flex items-center">
      {sessionStatus === "pending" ? (
        <button onClick={startSession}>START SESSION</button>
      ) : (
        <button onClick={pauseSession}>PAUSE SESSION</button>
      )}
    </div>
  );
}