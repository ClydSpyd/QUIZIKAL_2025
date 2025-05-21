import { useHostSession } from "@/context/hostSessionContext";
import { MdDeleteForever } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";
import useClipboard from "@/hooks/useClipboard";
import CircleTick from "@/components/ui/circle-tick";
import { useRef, useState } from "react";
import { cn } from "@/utilities/cn";
import useOutsideClick from "@/hooks/useOutsideClick";
import spinner from '@/assets/loaders/spin_white.svg'
import { useSocket } from "@/context/socketContext";
import SessionCodeBlock from "./SessionCodeBlock";

export default function ParticipantListItem({
  name,
  userId,
  handleDelete,
  lastItem = false,
}: {
  name: string;
  userId: string;
  handleDelete: () => void;
  lastItem?: boolean;
}) {
  const { sessionCode } = useHostSession();
  const contRef = useRef<HTMLDivElement>(null);
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [ deleting, setDeleting ] = useState<boolean>(false);

  const { handleCopy, copied } = useClipboard();
  const { connectedUsers } = useSocket();

  console.log({connectedUsers, userId})
  const isConnected = connectedUsers.some(
    (user: SocketUser) => user.userId == userId
  );

  const handleCopyBtn = async () => {
    const textToCopy = `${window.location.host}/play/${sessionCode}${userId}`;
    handleCopy(textToCopy);
  };

  const handleConfirmBtn = () => {
    setDeleting(true);
    handleDelete();
  };

  useOutsideClick(contRef, () => setConfirmState(false));

  return (
    <div
      key={userId}
      ref={contRef}
      className={cn(
        `w-full h-[50px] flex items-center box-border pr-[15px] bg-black/30 m-0 relative`,
        {
          "border-b border-b-white/10": !lastItem,
        }
      )}
    >
      <div
        className={cn(
          "absolute center-vert left-5 h-[10px] w-[10px] rounded-full",
          isConnected ? "bg-lime-400" : "bg-red-600"
        )}
      />
      <div className="flex items-center justify-start pl-10 w-2/3">{name}</div>
      {/* <div className="flex items-center justify-center w-1/4">{userId}</div> */}
      <div className="grow flex items-center justify-end">
        <SessionCodeBlock userId={userId} />
        <div className="h-[40px] w-[40px] flex items-center justify-center">
          {!copied ? (
            <TooltipWrapper message="copy participant link">
              <div
                onClick={handleCopyBtn}
                className="border border-transparent h-[28px] w-[28px] flex items-center justify-center mx-1 rounded-md cursor-pointer transition-all duration-200 ease-out hover:border-main3"
              >
                <FaLink style={{ height: "15px", width: "15px" }} />
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
            className="border border-transparent h-[28px] w-[28px] flex items-center justify-center mx-1 rounded-md cursor-pointer transition-all duration-200 ease-out hover:border-main3"
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
                  className="text-sm w-[80px] h-[95%] rounded-md bg-red-500 flex items-center justify-center border-transparent"
                >
                  confirm
                </button>
                <button
                  onClick={() => {
                    setConfirmState(false);
                  }}
                  className="text-sm w-[80px] h-[95%] rounded-md bg-black1 flex items-center justify-center"
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
