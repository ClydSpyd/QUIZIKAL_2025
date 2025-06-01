import { ImTrophy } from "react-icons/im";

export default function WinnerBlock({ data }: { data: ResultsData }) {
  return (
    <div className="w-full bg-gradient-to-bl from-lime-500/70 via-orange-500/60 to-orange-400/50 backdrop-blur-md border-4 border-lime-400/70 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between px-6 py-5 relative z-20">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full border-4 border-orange-400 shadow-xl flex items-center justify-center">
          <ImTrophy className="fa-solid fa-crown h-[50px] w-[50px] text-orange-400 drop-shadow-xl relative" />
        </div>
        <div>
          <span className="block text-2xl font-extrabold text-white uppercase">
            {data.userName}
          </span>
          <span className="block text-lg text-lime-100 font-semibold">
            WINNER
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-black text-white drop-shadow-lg">
          {data.totalScore}
        </span>
        <span className="text-lg font-bold text-orange-200 tracking-tight">
          correct
        </span>
      </div>
    </div>
  );
}
