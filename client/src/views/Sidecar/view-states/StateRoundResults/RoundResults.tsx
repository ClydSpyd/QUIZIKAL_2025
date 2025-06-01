/* eslint-disable react-hooks/exhaustive-deps */
import { API } from "@/api";
import { cn } from "@/utilities/cn";
import { useEffect, useState } from "react";
import spinner from "assets/loaders/spin_green.svg";
import { IoWarning } from "react-icons/io5";
import Leaderboard from "../StateResults/Leaderboard";
import { useParticipantSession } from "@/context/participantSessionContext";

export default function RoundResults() {
  const [resultsData, setResultsData] = useState<null | ResultsData[]>(null);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const { sessionCode, roundIdx } = useParticipantSession();

  const getResults = async () => {
    const { data, error } = await API.session.fetchResults(sessionCode);

    if (error) {
      setFetchError("Error fetching results");
      console.error("Error fetching results:", error);
      return;
    }
    if (data){
      setResultsData(
        Object.values(data).sort((a, b) => b.totalScore - a.totalScore)
      );
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
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
          <div
            className={cn(
              "bg-gradient-to-tr from-lime-500/30 via-orange-500/30 to-orange-400/30 backdrop-blur-md border-4 border-lime-400/70 rounded-xl shadow-2xl flex justify-center items-center gap-2 px-8 py-4 relative z-20 p-4 w-[90%] max-w-[600px]"
            )}
          >
            <h1 className={"text-white font-bold text-lg"}>ROUND</h1>
            <h1
              className="grad-text text-[70px] font-black leading-none relative"
              style={{ padding: 0 }}
            >
              {roundIdx + 1}
            </h1>
            <h1 className={"text-white font-bold text-lg"}>COMPLETE!</h1>
          </div>
          <Leaderboard
            resultsData={resultsData.filter((i) => i.userStatus === "active")}
          />
        </>
      )}
    </>
  );
}
