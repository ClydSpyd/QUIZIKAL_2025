import { useHostSession } from "@/context/hostSessionContext";
import useSessionControls from "@/hooks/useSessionControls";
import { CSSProperties } from "react";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious, BiStop } from "react-icons/bi";
import { GoStop } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { FaList } from "react-icons/fa6";

const btnIconsMap: Record<string, IconType> = {
  startSession: () => <BiPlay className="text-white h-[35px] w-[35px]" />,
  pauseSession: () => <BiPause className="text-white h-[35px] w-[35px]" />,
  prevRound: () => <BiSkipPrevious className="text-white h-[35px] w-[35px]" />,
  nextRound: () => <BiSkipNext className="text-white h-[35px] w-[35px]" />,
  pauseRound: () => <BiPause className="text-white h-[35px] w-[35px]" />,
  endRound: () => <BiStop className="text-white h-[35px] w-[35px]" />,
  setRound: () => <BiPlay className="text-white h-[35px] w-[35px]" />,
  showRoundResults: () => <FaList className="text-white h-[15px] w-[15px]" />,
  endSession: () => <GoStop className="text-white h-[20px] w-[20px]" />,
};

const ActionBtn = ({
  btnText,
  onClick,
  icon,
  css,
}: {
  btnText: string;
  onClick: () => void;
  icon: keyof typeof btnIconsMap;
  css?: CSSProperties;
}) => {
  const Icon = btnIconsMap[icon];
  return (
    <button
      className={
        "w-full h-[50px] text-center text-sm flex justify-center items-center gap-1 border border-white/20 rounded-md relative"
      }
      onClick={onClick}
      style={css ?? {}}
    >
      <div className="h-[40px] w-[40px] flex items-center justify-center">
        <Icon />
      </div>
      <div className="grow pr-4">{btnText}</div>
    </button>
  );
};

export default function QuickActions() {
  const { sessionStatus, roundIdx } = useHostSession();
  const {
    startSession,
    pauseSession,
    endRound,
    setRound,
    showRoundResults,
    isFirstRound,
    isLastRound,
  } = useSessionControls();

  return (
    <div className="w-full h-full flex flex-col gap-2 p-4">
      <h1 className="text-main2 uppercase font-semibold w-full text-left mb-2">
        Quick Actions
      </h1>
      {sessionStatus === "pending" ? (
        <button onClick={startSession}>START SESSION</button>
      ) : (
        <>
          {sessionStatus !== "paused" ? (
            <ActionBtn
              icon="pauseSession"
              btnText={"PAUSE SESSION"}
              onClick={pauseSession}
            />
          ) : (
            <ActionBtn
              icon="startSession"
              btnText={"RESUME SESSION"}
              onClick={startSession}
            />
          )}
          <ActionBtn
            icon="prevRound"
            btnText="PREV ROUND"
            onClick={() => setRound(roundIdx - 1)}
            css={
              isFirstRound
                ? {
                    pointerEvents: "none",
                    opacity: 0.5,
                  }
                : {}
            }
          />
          <ActionBtn
            icon="nextRound"
            btnText={"NEXT ROUND"}
            onClick={() => setRound(roundIdx + 1)}
            css={
              isLastRound
                ? {
                    pointerEvents: "none",
                    opacity: 0.5,
                  }
                : {}
            }
          />
          {sessionStatus !== "resultRoundPending" ? (
            <ActionBtn
              icon="endRound"
              btnText={"END ROUND"}
              onClick={endRound}
              // css={
              //   !["question", "pendingQuestion"].includes(sessionStatus)
              //     ? {
              //         pointerEvents: "none",
              //         opacity: 0.5,
              //       }
              //     : {}
              // }
            />
          ) : (
            <ActionBtn
              icon="showRoundResults"
              btnText={"ROUND RESULTS"}
              onClick={showRoundResults}
            />
          )}

          <ActionBtn
            icon="endSession"
            btnText={"END SESSION"}
            onClick={() => setRound(0)}
          />
        </>
      )}
    </div>
  );
}

{
  /* <button
className={"w-full h-[50px] text-center flex justify-center"}
onClick={() => setRound(roundIdx - 1)}
style={
  isFirstRound
    ? {
        pointerEvents: "none",
        opacity: 0.5,
      }
    : {}
}
>
PREV ROUND
</button>
<button
className={"w-full h-[50px] text-center flex justify-center"}
onClick={() => setRound(roundIdx + 1)}
style={
  isLastRound
    ? {
        pointerEvents: "none",
        opacity: 0.5,
      }
    : {}
}
>
NEXT ROUND
</button> */
}
