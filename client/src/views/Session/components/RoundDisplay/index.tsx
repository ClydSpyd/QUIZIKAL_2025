import { useHostSession } from "@/context/hostSessionContext"

export default function RoundDisplay(){
  const { roundIdx, questionIdx, sessionStatus, sessionName, sessionCode } = useHostSession();

  return (
    <div className="flex flex-col p-6 gap-2">
      <div className=" mb-2">
        <p className="text-sm text-white">Session:</p>
      <h1 className="text-xl text-left font-bold text-main1">{sessionName}</h1>
      </div>
      <h1 className="text-lg text-left mb-1 text-main1">CODE: <span className="text-white">{sessionCode}</span></h1>
      <div className="flex items-center">
        <h1 className={"text-main1 mr-1"}>ROUND:</h1>
        <h2>{roundIdx + 1}</h2>
      </div>
      <div className="flex items-center">
        <h1 className={"text-main2 mr-1"}>QUESTION:</h1>
        <h2>{questionIdx + 1}</h2>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="font-normal text-slate-300">STATUS:</h1>
        <h4>{sessionStatus.toUpperCase()}</h4>
      </div>
    </div>
  );
}