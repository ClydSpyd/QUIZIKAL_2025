/* eslint-disable react-hooks/exhaustive-deps */
import { useParticipantSession } from "@/context/participantSessionContext";
import logo from "assets/images/quizikal_logo1.png";
import { FaCrown } from "react-icons/fa";
import Leaderboard from "./Leaderboard";
import { API } from "@/api";
import { useEffect, useState } from "react";
import spinner from "assets/loaders/spin_orange.svg";
import { delay } from "@/utilities/delay";
import WinnerBlock from "./WinnerBlock";

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
        )}
        {/* <section className=" w-[90vw] max-w-[600px] bg-[#161616] border-2 border-orange-400/20 rounded-3xl shadow-xl p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <i className="fa-solid fa-list-ol text-orange-400 text-xl"></i>
            <span className="text-xl font-bold text-lime-400 tracking-wider">
              Leaderboard
            </span>
          </div>
          <div className="overflow-x-auto">
            <ul id="scoreboard-list" className="flex flex-col gap-4">
              <li
                id="score-card-1"
                className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-lime-500/20 via-orange-400/10 to-transparent rounded-2xl border-2 border-lime-400/40 shadow group"
              >
                <div className="flex items-center gap-4">
                  <span className="block text-2xl font-black text-orange-400 w-8 text-center">
                    1
                  </span>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                    className="w-12 h-12 rounded-full border-2 border-orange-400 shadow"
                    alt="avatar 1"
                  />
                  <span className="text-lg font-bold text-white tracking-wide group-hover:text-lime-400 transition">
                    BALOOO
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-lime-400 tracking-wider">
                    4,120
                  </span>
                  <span className="text-xs text-orange-300 font-mono bg-black/20 px-2 py-0.5 rounded mt-1">
                    OEG64
                  </span>
                </div>
              </li>
              <li
                id="score-card-2"
                className="flex items-center justify-between px-5 py-4 bg-[#232323] rounded-2xl border-2 border-orange-400/20 shadow group"
              >
                <div className="flex items-center gap-4">
                  <span className="block text-2xl font-black text-gray-400 w-8 text-center">
                    2
                  </span>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    className="w-12 h-12 rounded-full border-2 border-lime-400 shadow"
                    alt="avatar 2"
                  />
                  <span className="text-lg font-bold text-white tracking-wide group-hover:text-orange-400 transition">
                    MAYA
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-orange-300 tracking-wider">
                    3,680
                  </span>
                  <span className="text-xs text-lime-300 font-mono bg-black/20 px-2 py-0.5 rounded mt-1">
                    JXK94
                  </span>
                </div>
              </li>
              <li
                id="score-card-3"
                className="flex items-center justify-between px-5 py-4 bg-[#232323] rounded-2xl border-2 border-lime-400/10 shadow group"
              >
                <div className="flex items-center gap-4">
                  <span className="block text-2xl font-black text-gray-400 w-8 text-center">
                    3
                  </span>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                    className="w-12 h-12 rounded-full border-2 border-orange-400 shadow"
                    alt="avatar 3"
                  />
                  <span className="text-lg font-bold text-white tracking-wide group-hover:text-lime-400 transition">
                    ZARA
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-lime-300 tracking-wider">
                    3,220
                  </span>
                  <span className="text-xs text-orange-300 font-mono bg-black/20 px-2 py-0.5 rounded mt-1">
                    QWRT5
                  </span>
                </div>
              </li>
              <li
                id="score-card-4"
                className="flex items-center justify-between px-5 py-4 bg-[#232323] rounded-2xl border-2 border-lime-400/10 shadow group"
              >
                <div className="flex items-center gap-4">
                  <span className="block text-2xl font-black text-gray-400 w-8 text-center">
                    4
                  </span>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                    className="w-12 h-12 rounded-full border-2 border-orange-400 shadow"
                    alt="avatar 4"
                  />
                  <span className="text-lg font-bold text-white tracking-wide group-hover:text-orange-400 transition">
                    NORA
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-orange-300 tracking-wider">
                    2,860
                  </span>
                  <span className="text-xs text-lime-300 font-mono bg-black/20 px-2 py-0.5 rounded mt-1">
                    PMX28
                  </span>
                </div>
              </li>
              <li
                id="score-card-5"
                className="flex items-center justify-between px-5 py-4 bg-[#232323] rounded-2xl border-2 border-orange-400/10 shadow group"
              >
                <div className="flex items-center gap-4">
                  <span className="block text-2xl font-black text-gray-400 w-8 text-center">
                    5
                  </span>
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                    className="w-12 h-12 rounded-full border-2 border-lime-400 shadow"
                    alt="avatar 5"
                  />
                  <span className="text-lg font-bold text-white tracking-wide group-hover:text-lime-400 transition">
                    JAKE
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-lime-300 tracking-wider">
                    2,300
                  </span>
                  <span className="text-xs text-orange-300 font-mono bg-black/20 px-2 py-0.5 rounded mt-1">
                    HNY56
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section> */}
      </div>
    </div>
  );
}
