import CircleTick from "@/components/ui/circle-tick";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";
import { useHostSession } from "@/context/hostSessionContext";
import useClipboard from "@/hooks/useClipboard";
import { cn } from "@/utilities/cn";

export default function SessionCodeBlock({ userId }: { userId: string }) {
  const { handleCopy, copied } = useClipboard();
  const { sessionCode } = useHostSession();

  const textValue = `${sessionCode}${userId}`;

  const handleCopyBtn = async () => {
    handleCopy(textValue);
  };

  return (
    <div
      className={cn(
        "cursor-pointer flex w-[90px] h-[28px] items-center justify-center gap-2 border border-main3 rounded-md"
      )}
    >
      {!copied ? (
        <TooltipWrapper message="copy session code">
          <div
            onClick={handleCopyBtn}
            className="flex w-[90px] h-[28px] items-center justify-center px-1 text-xs rounded-md text-main3"
          >
            {textValue}
          </div>
        </TooltipWrapper>
      ) : (
        <>
          <CircleTick height={20} width={20} color="var(--main1)" />
        </>
      )}
    </div>
  );
}
