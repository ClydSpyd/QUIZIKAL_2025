import { useHostSession } from "@/context/hostSessionContext";
import useSessionControls from "@/hooks/useSessionControls";
import { CSSProperties } from "react";

const ActionBtn = ({
  btnText,
  onClick,
  css,
}: {
  btnText: string;
  onClick: () => void;
  css?: CSSProperties;
}) => (
  <button
    className={"w-full h-[50px] text-center text-sm flex justify-center border border-white/20 rounded-md"}
    onClick={onClick}
    style={css ?? {}}
  >
    {btnText}
  </button>
);

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
          <ActionBtn
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
          {sessionStatus !== "paused" ? (
            <ActionBtn btnText={"PAUSE"} onClick={pauseSession} />
          ) : (
            <ActionBtn btnText={"RESUME"} onClick={startSession} />
          )}
          {sessionStatus !== "resultRoundPending" ? (
            <ActionBtn
              btnText={"END ROUND"}
              onClick={endRound}
              css={
                !["question", "pendingQuestion"].includes(sessionStatus)
                  ? {
                      pointerEvents: "none",
                      opacity: 0.5,
                    }
                  : {}
              }
            />
          ) : (
            <ActionBtn
              btnText={"SHOW ROUND RESULTS"}
              onClick={showRoundResults}
            />
          )}

          <ActionBtn btnText={"END SESSION"} onClick={() => setRound(0)} />
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
