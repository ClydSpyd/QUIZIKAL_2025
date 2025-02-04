import { useHostSession } from "@/context/hostSessionContext"

export default function RoundDisplay(){
  const { roundIdx, questionIdx, sessionStatus } = useHostSession();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <h1>ROUND</h1>
          <h2>{roundIdx + 1}</h2>
        </div>
        <div className="flex items-center">
          <h1>QUESTION</h1>
          <h2>{questionIdx + 1}</h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>STATUS:</p>
        <h4>{sessionStatus.toUpperCase()}</h4>
      </div>
    </div>
  );
}