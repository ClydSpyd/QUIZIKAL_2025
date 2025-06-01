import { cn } from "@/utilities/cn";

{/* <li */}
// id="score-card-2"
// className="flex items-center justify-between px-5 py-4 bg-[#232323] rounded-2xl border-2 border-orange-400/20 shadow group"
// >
              
const ListItem = ({data, idx}:{data: ResultsData, idx:number}) => {
    return (
      <li
        className={cn(
          "flex items-center justify-between px-5 py-6  rounded-2xl shadow group",
          idx === 0
            ? "border-2 bg-gradient-to-r from-lime-500/20 via-orange-400/10 to-transparent border-lime-400/40"
            : idx % 2 === 0
            ? "border bg-[#232323] border-lime-400/40"
            : "border bg-[#232323] border-orange-400/20"
        )}
      >
        <div className="flex items-center gap-4">
          <span className="block text-2xl font-black text-orange-400 w-8 text-center">
            {idx + 1}
          </span>
          {/* <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                    className="w-12 h-12 rounded-full border-2 border-orange-400 shadow"
                    alt="avatar 1"
                  /> */}
          <span className="text-lg font-bold text-white tracking-wide transition">
            {data.userName}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-extrabold text-lime-400 tracking-wider">
            {data.totalScore}
          </span>
        </div>
      </li>
    );
}
export default function Leaderboard({resultsData}:{resultsData: ResultsData[]}){
    return (
      <section className=" w-[90vw] max-w-[600px] bg-[#161616] border-2 border-orange-400/20 rounded-3xl shadow-xl p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <i className="fa-solid fa-list-ol text-orange-400 text-xl"></i>
          <span className="text-xl font-bold text-lime-400 tracking-wider">
            Leaderboard
          </span>
        </div>
        <div className="overflow-x-auto">
          <ul id="scoreboard-list" className="flex flex-col gap-4">
            {resultsData.map((data, idx) => (
              <ListItem key={data.userName} data={data} idx={idx} />
            ))}
          </ul>
        </div>
      </section>
    );
}