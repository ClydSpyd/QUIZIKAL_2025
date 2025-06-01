/* eslint-disable react-hooks/exhaustive-deps */
import logo from "assets/images/quizikal_logo1.png";
import { FaCrown } from "react-icons/fa";
import Leaderboard from "./Leaderboard";
import { API } from "@/api";
import { useEffect, useState } from "react";
import spinner from "assets/loaders/spin_orange.svg";
import { delay } from "@/utilities/delay";
import WinnerBlock from "./WinnerBlock";
import { useParticipantSession } from "@/context/participantSessionContext";

export default function StateReults({ showResults }: { showResults: boolean }) {
  const { sessionName, sessionCode } = useParticipantSession();
  const [resultsData, setResultsData] = useState<ResultsData[] | null>(null);
  const [winner, setWinner] = useState<ResultsData[] | null>(null);

  useEffect(() => {
    if (resultsData) {
      const topScore = resultsData[0]?.totalScore;
      const winners = resultsData.filter((r) => r.totalScore === topScore);
      setWinner(winners);
    }
  }, [resultsData]);

  useEffect(() => {
    const getResults = async () => {
      const { data } = await API.session.fetchResults(sessionCode);
      console.log("Results Data:", data);
      if (data) {
        setResultsData(
          Object.values(data).sort((a, b) => b.totalScore - a.totalScore)
        );
      }
    };
    showResults && delay(500).then(() => getResults());
  }, [showResults]);

  return (
    <div className="w-full h-full mx-auto max-w-[950px] flex flex-col items-center gap-4 box-border pt-10 pb-28 px-2">
      <div className={"mb-[20px] flex flex-col items-center"}>
        <img className="h-[70px]" src={logo} alt={"logo"} />
        <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
          QUIZIKAL
        </h4>
      </div>
      <div className="grow w-full justify-center flex flex-col items-center gap-10 relative bottom-[5vh]">
        <h1 className="text-[40px] font-bold px-2 py-1 rounded-md text-white relative top-3 leading-none">
          {sessionName}
        </h1>
        {!resultsData || !winner ? (
          <>
            <span className="text-2xl font-black text-main2 uppercase mb-8">
              QUIZ COMPLETE!
            </span>
            <div className="w-full h-[calc(100vh-300px)] flex flex-col items-center justify-center relative bottom-[20%]">
              <img src={spinner} className="h-[100px] w-[100px] relative" />
              <p className="m-0 text-sm relative bottom-2">
                awaiting results data
              </p>
            </div>
          </>
        ) : (
          <>
            <span className="text-2xl font-black text-main2 uppercase mb-6">
              Final Results
            </span>
            <div className="w-full flex flex-col items-center gap-2">
              {winner.length > 1 && (
                <span className="text-2xl font-black text-main3 uppercase mb-14">
                  We have a tie!
                </span>
              )}
              <section className="relative w-[90vw] max-w-[600px] flex flex-col gap-4 items-center">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                  <FaCrown className="fa-solid fa-crown h-[50px] w-[50px] text-orange-400 drop-shadow-xl" />
                </div>
                {winner.map((scoreData) => (
                  <WinnerBlock data={scoreData} />
                ))}
              </section>
            </div>
            {resultsData && (
              <Leaderboard
                resultsData={resultsData.filter(
                  (i) => i.userStatus === "active"
                )}
              />
            )}
          </>
        )}{" "}
      </div>
    </div>
  );
}
