import logo from "assets/images/quizikal_logo1.png";
import RoundEnder from "./RoundEnder";
import RoundResults from "./RoundResults";
import { useParticipantSession } from "@/context/participantSessionContext";

export default function StateRoundReults({
  showResults,
}: {
  showResults?: boolean;
}) {
  const { sessionName } = useParticipantSession();

  return (
    <div className="w-full h-full mx-auto max-w-[950px] flex flex-col items-center gap-4 box-border pt-10 pb-28 px-2">
      <div className={"mb-[20px] flex flex-col items-center"}>
        <img className="h-[70px]" src={logo} alt={"logo"} />
        <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
          QUIZIKAL
        </h4>
      </div>
      <div className="grow w-full justify-center flex flex-col items-center gap-10 relative bottom-[5vh]">
        <h1 className="text-[30px] font-bold px-2 py-1 rounded-md text-white relative top-3 leading-none">
          {sessionName}
        </h1>
        {!showResults ? <RoundEnder /> : <RoundResults />}
      </div>
    </div>
  );
}
