/* eslint-disable react-hooks/exhaustive-deps */
import HostSessionProvider, { useHostSession } from "@/context/hostSessionContext";
import Participants from "./Participants";

const Content = () => {
  const { sessionName } = useHostSession();

  return (
    <div className="h-screen w-full flex flex-col items-center pt-20">
      <h1 className="mb-4 text-2xl font-bold">{sessionName}</h1>
      <Participants />
    </div>
  );
};

export default function SessionViewHost() {
  return (
    <HostSessionProvider>
      <Content />
    </HostSessionProvider>
  );
}

// return (
//   <div className={`${styles.viewWrapper}`}>
//     <h5 style={{ margin: "20px 5px 5px" }}>Session: {sessionCode}</h5>
//     {currentQuestion && (
//       <p style={{ color: "#ff8f1c" }}>{currentQuestion.questionText}</p>
//     )}
//     <div style={{ display: "flex", gap: "10px" }}>
//       <h5>round: {roundIdx + 1}</h5>
//       <h5>question: {questionIdx + 1}</h5>
//     </div>
//     <h5>sessionStatus: {sessionStatus}</h5>
//     <h5 style={{ margin: "5px" }}>
//       Sidecar: {`${window.location.host}/play/${sessionCode}/${sidecarCode}`}
//     </h5>
//     <div className={`${styles.userList}`}>
//       <p>Connected users:</p>
//       {connectedUsers?.filter((i) => !i.isHost).length ? (
//         connectedUsers.map(
//           (i: ConnectedUser, idx: number) =>
//             !i.isHost && (
//               <span key={idx}>
//                 {i.username}{" "}
//                 {sessionStatus === "question" &&
//                   roundResponses?.includes(i.username) &&
//                   "ö"}
//               </span>
//             )
//         )
//       ) : (
//         <span>NO USERS</span>
//       )}
//     </div>
//     {!["pending", "pendingRound"].includes(sessionStatus) ? (
//       <div style={{ width: "200px" }}>
//         <div
//           style={{
//             display: "flex",
//             gap: "5px",
//             width: "100%",
//             justifyContent: "space-between",
//           }}
//         >
//           {quizData?.rounds && (
//             <button
//               style={{
//                 width: "calc(50% - 5px)",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//               className={isFirstIdx ? styles.disabled : ""}
//               onClick={() => changeQuestion("prev")}
//             >
//               prev
//             </button>
//           )}
//           {quizData?.rounds && (
//             <button
//               style={{
//                 width: "calc(50% - 5px)",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//               className={isLastIdx ? styles.disabled : ""}
//               onClick={() => changeQuestion("next")}
//             >
//               next
//             </button>
//           )}
//         </div>
//       </div>
//     ) : (
//       <div>
//         <button
//           style={{
//             width: "200px",
//             display: "flex",
//             justifyContent: "center",
//           }}
//           onClick={handleStartSession}
//         >
//           START
//         </button>
//       </div>
//     )}
//     <div
//       style={{
//         width: "200px",
//         marginTop: "5px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "5px",
//       }}
//     >
//       <button
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//         className={isFirstRound ? styles.disabled : ""}
//         onClick={() => changeRound("prev")}
//       >
//         prev round
//       </button>
//       <button
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//         className={isLastRound ? styles.disabled : ""}
//         onClick={() => changeRound("next")}
//       >
//         next round
//       </button>
//       <button
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//         onClick={resetRound}
//       >
//         reset round
//       </button>
//       <button
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//         onClick={reset}
//       >
//         reset quiz
//       </button>
//       <button
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//         onClick={showResults}
//         className={isLastIdx ? styles.highlight : "ö"}
//       >
//         results
//       </button>
//     </div>
//   </div>
// );
