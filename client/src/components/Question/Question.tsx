// import styles from "./Question.module.scss";
// import logo from "assets/images/quizikal_logo1.png";
// import arrow from "assets/images/arrow_square_yellow.png";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/reduxConfig/Store";
// import { useEffect, useState } from "react";
// import { setAnswer, setQuestionIdx } from "@/reduxConfig/reducers/quizReducer";
// import { useSocket } from "@/socket/SocketContext";

// interface Props {
//   questions: QuestionData[];
//   preview?: boolean;
//   active?: boolean;
// }

// const Question = ({ preview, questions, active }: Props) => {
//   const { questionIdx, myAnswers, roundIdx } = useSelector((state: RootState) => state.quiz);
//   const [selectedIdx, setSelectedIdx] = useState<null | number>(null);
//   const activeQuestion = questions[preview ? questionIdx : 0];
//   const dispatch = useDispatch()
//   const { socket } = useSocket()

//   const isFirst: boolean = questionIdx === 0;
//   const isLast: boolean = questions.length - 1 === questionIdx;

//   const handleNext = () => {
//     if (isLast) return;
//     dispatch(setQuestionIdx(questionIdx + 1));
//   };

//   const handlePrev = () => {
//     if (isFirst) return;
//     dispatch(setQuestionIdx(questionIdx - 1));
//   };

//   const handleSelect = (idx: number) => {
//     if (!active || !socket) return;
//     setSelectedIdx(idx);
//     console.log({roundIdx, questionIdx, idx})
//     socket.emit("question-response", { responseIdx: idx, roundIdx, questionIdx });
//     dispatch(setAnswer({ responseIdx: idx, roundIdx, questionIdx }))
//   };
  
//   useEffect(() => {
//     const prevAnswer = myAnswers[roundIdx] && myAnswers[roundIdx][questionIdx];
//     setSelectedIdx(prevAnswer ?? null);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[questions])
  
//   return !activeQuestion ? (
//     <></>
//   ) : (
//     <div className={`${styles.questionContainer} ${preview && styles.preview}`}>
//       {preview && <span className={`${styles.previewTxt}`}>PREVIEW</span>}
//       <div className={`${styles.breadcrumb}`}>
//         <h4>
//           Round {roundIdx + 1} question {questionIdx + 1}
//         </h4>
//       </div>
//       <div className={`${styles.questionText}`}>
//         <h1>{activeQuestion.questionText}</h1>
//       </div>
//       <div className={`${styles.optionsCont}`}>
//         {activeQuestion.questionType === "PICTURE" ? (
//           <div className={`${styles.images}`}>
//             {activeQuestion.options.map((option: string, idx: number) => (
//               <div
//                 onClick={() => handleSelect(idx)}
//                 key={option}
//                 className={`${styles.imageContainer} ${
//                   active && styles.selectable
//                 } ${selectedIdx === idx && styles.selected}`}
//               >
//                 <img
//                   className={`${styles.optionImage}`}
//                   src={option}
//                   alt={`option ${idx}`}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           activeQuestion.options.map((option: string, idx: number) => (
//             <div
//               key={idx}
//               onClick={() => handleSelect(idx)}
//               className={`${styles.optionContainer} ${
//                 active && styles.selectable
//               } ${selectedIdx === idx && styles.selected}`}
//             >
//               <p>{idx + 1}</p>
//               <h4>{option}</h4>
//             </div>
//           ))
//         )}
//       </div>
//       {preview && (
//         <>
//           <img src={logo} className={`${styles.logo}`} />
//           <img
//             onClick={handlePrev}
//             src={arrow}
//             className={`${styles.arrow} ${styles.left} ${
//               isFirst && styles.disabled
//             }`}
//           />
//           <img
//             onClick={handleNext}
//             src={arrow}
//             className={`${styles.arrow} ${styles.right} ${
//               isLast && styles.disabled
//             }`}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default Question;
export const hello = "world"