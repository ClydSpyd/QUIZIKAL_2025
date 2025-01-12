import { BiPlusCircle } from "react-icons/bi";
import styles from "./RoundPicker.module.scss";
import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { queryClient } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reduxConfig/Store";
import { setRoundIdx } from "@/reduxConfig/reducers/quizReducer";

interface Props {
  rounds: number;
}
const RoundPicker = ({ rounds }: Props) => {
  const [ roundsLocal, setRoundsLocal ] = useState(rounds)
  const { roundIdx } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch()
  const { quizId } = useParams();
  const addRound = async () => {
    setRoundsLocal((prev) => prev + 1);
    dispatch(setRoundIdx(roundsLocal))
    await axios.post(`/api/quiz/addRound/${quizId}`)
    queryClient.refetchQueries({ queryKey: ["quizData"] });
  }
  const setSelected = (idx: number) => {
    dispatch(setRoundIdx(idx))
  };
  return (
    <div className={`${styles.roundPickerWrapper}`}>
      <p className={`${styles.sectionTitle}`}>Round:</p>
      <div className={`${styles.radios}`}>
        {[...Array(roundsLocal)].map((_: unknown, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`${styles.item} ${roundIdx === idx && styles.selected}`}
          >
            <h4>{idx + 1}</h4>
          </div>
        ))}
        <BiPlusCircle onClick={addRound} />
      </div>
    </div>
  );
};

export default RoundPicker;
