import { useHostSession } from "@/context/hostSessionContext";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";
import useClipboard from "@/hooks/useClipboard";
import CircleTick from "@/components/ui/circle-tick";
import { useRef, useState } from "react";
import { cn } from "@/utilities/cn";
import useOutsideClick from "@/hooks/useOutsideClick";
import spinner from '@/assets/loaders/spin_white.svg'

export default function ParticipantListItem({
  name,
  code,
  handleDelete,
}: {
  name: string;
  code: string;
  handleDelete: () => void;
}) {
  const { sessionCode } = useHostSession();
  const contRef = useRef<HTMLDivElement>(null);
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [ deleting, setDeleting ] = useState<boolean>(false);

  const { handleCopy, copied } = useClipboard();

  const handleCopyBtn = async () => {
    const textToCopy = `${window.location.host}/play/${sessionCode}${code}`;
    handleCopy(textToCopy);
  };

  const handleConfirmBtn = () => {
    setDeleting(true);
    handleDelete();
  };

  useOutsideClick(contRef, () => setConfirmState(false));

  return (
    <div
      key={code}
      ref={contRef}
      className={`w-full h-[40px] flex items-center box-border px-[15px] border-t-2 border-black1 m-0 relative`}
    >
      <div className="flex items-center justify-center w-1/2">{name}</div>
      <div className="flex items-center justify-center w-1/4">{code}</div>
      <div className="grow flex items-center justify-end">
        <div className="h-[40px] w-[40px] flex items-center justify-center">
          {!copied ? (
            <TooltipWrapper message="copy participant link">
              <div
                onClick={handleCopyBtn}
                className="border border-transparent h-[25px] w-[25px] flex items-center justify-center mx-1 rounded-md cursor-pointer transition-all duration-200 ease-out hover:border-main1"
              >
                <FaRegCopy style={{ height: "15px", width: "15px" }} />
              </div>
            </TooltipWrapper>
          ) : (
            <CircleTick height={20} width={20} color="#ff8f1c" />
          )}
        </div>
        <TooltipWrapper message="delete participant">
          <div
            onClick={() => {
              setConfirmState(true);
            }}
            className="border border-transparent h-[25px] w-[25px] flex items-center justify-center mx-1 rounded-md cursor-pointer transition-all duration-200 ease-out hover:border-main1"
          >
            <MdDeleteForever style={{ height: "20px", width: "20px" }} />
          </div>
        </TooltipWrapper>
      </div>
      <div
        className={cn(
          "absolute h-full w-full left-0 overflow-hidden",
          confirmState
            ? "opacity-100 pointer-events-autoP"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute h-full w-full flex items-center justify-center bg-red-500/30 left-0 backdrop-blur-md z-30 transition-transform duration-200 ease-out",
            confirmState ? "translate-y-0" : "translate-y-[-100%]"
          )}
        >
          {deleting ? (
            <img src={spinner} className="h-[35px] w-[35px]" />
          ) : (
            <>
              <h4>Delete {name}?</h4>
              <div className="h-[30px] absolute right-2 flex items-center gap-2">
                <button
                  onClick={handleConfirmBtn}
                  className="w-[80px] h-[95%] rounded-md bg-red-500 flex items-center justify-cente border-transparentr"
                >
                  confirm
                </button>
                <button
                  onClick={() => {
                    setConfirmState(false);
                  }}
                  className="w-[80px] h-[95%] rounded-md bg-black1 flex items-center justify-center"
                >
                  cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
