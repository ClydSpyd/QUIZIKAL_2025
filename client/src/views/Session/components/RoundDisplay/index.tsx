import CircleTick from "@/components/ui/circle-tick";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";
import { useHostSession } from "@/context/hostSessionContext";
import useClipboard from "@/hooks/useClipboard";
import { getStatusString } from "@/utilities/getStatusString";
import { FaLink } from "react-icons/fa";

export default function RoundDisplay() {
  const {
    roundIdx,
    questionIdx,
    sessionStatus,
    sessionName,
    sessionCode,
    sidecarCode,
  } = useHostSession();
  const { handleCopy, copied } = useClipboard();
  const handleCopyBtn = async () => {
    const textToCopy = `${window.location.host}/play/${sessionCode}QZKL/${sidecarCode}`;
    handleCopy(textToCopy);
  };
  return (
    <div className="flex flex-col p-6 gap-2">
      <div className="mb-2">
        <div>
          <p className="text-sm text-white uppercase">Session:</p>
          <h1 className="text-xl text-left font-bold text-main1">
            {sessionName}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-md text-left mb-1 text-white/70">
            SIDECAR: <span className="text-white">{sidecarCode}</span>
          </h1>

          {!copied ? (
            <TooltipWrapper message="copy sidecar link">
              <div
                onClick={handleCopyBtn}
                className="border border-transparent h-[30px] w-[30px] flex items-center justify-center mx-1 rounded-md cursor-pointer transition-all duration-200 ease-out hover:border-main3"
              >
                <FaLink style={{ height: "15px", width: "15px" }} />
              </div>
            </TooltipWrapper>
          ) : (
            <div className="h-[30px] w-[30px] flex items-center justify-center">
              <CircleTick height={20} width={20} color="#ff8f1c" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <h1 className={"text-main1 mr-1"}>ROUND:</h1>
        <h2>{roundIdx + 1}</h2>
      </div>
      <div className="flex items-center">
        <h1 className={"text-main2 mr-1"}>QUESTION:</h1>
        <h2>{questionIdx + 1}</h2>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-main3">STATUS:</h1>
        <h4>{getStatusString(sessionStatus).toUpperCase()}</h4>
      </div>
    </div>
  );
}
