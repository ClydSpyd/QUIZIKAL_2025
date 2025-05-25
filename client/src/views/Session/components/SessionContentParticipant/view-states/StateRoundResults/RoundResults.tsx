import { API } from "@/api";
import { useParticipantSession } from "@/context/participantSessionContext";
import { cn } from "@/utilities/cn";
import { useEffect, useState } from "react";
import spinner from "assets/loaders/spin_green.svg";
import { IoWarning } from "react-icons/io5";
import RoundReviewModule from "./RoundReviewModule";

export default function RoundResults() {
  const [resultsData, setResultsData] = useState<null | ResultsData>(null);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const { roundIdx, sessionCode, userData } = useParticipantSession();

  const getResults = async () => {
    const { data, error } = await API.session.fetchResults(
      sessionCode,
      userData?.id
    );

    if (error) {
      setFetchError("Error fetching results");
      console.error("Error fetching results:", error);
      return;
    }
    if (data) setResultsData(data[0]);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div
        className={cn(
          "bg-gradient-to-tr from-lime-500/30 via-orange-500/30 to-orange-400/30 backdrop-blur-md border-2 border-lime-400/70 rounded-xl shadow-2xl flex flex-col items-center px-8 py-7 relative z-20 p-4 w-[90%] max-w-[600px]"
        )}
      >
        {fetchError ? (
          <>
            <IoWarning className="text-main3 h-[50px] w-[50px]" />
            <h1 className="text-main3 font-bold text-lg">{fetchError}</h1>
          </>
        ) : !resultsData ? (
          <div className="w-full h-[220px] flex flex-col items-center justify-center">
            <img src={spinner} className="h-[75px] w-[75px] relative" />
            <p className="m-0 text-sm relative bottom-2">
              fetching round results
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white">
              {resultsData.userName}
            </h2>
            <h1 className="grad-text text-[120px] font-black leading-none relative bottom-2">
              {resultsData.roundTotals[roundIdx]}
            </h1>
            <h2 className="text-lg font-bold m-0">Points this round</h2>
            <div className="flex items-center gap-1 mt-4">
              <p className="text-main2">cumulative score: </p>
              <h4 className="grad-text font-bold text-xl">
                {resultsData.totalScore}
              </h4>
            </div>
          </>
        )}
      </div>
      <RoundReviewModule />
    </>
  );
}
