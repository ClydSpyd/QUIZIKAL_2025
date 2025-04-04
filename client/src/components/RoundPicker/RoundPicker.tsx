import { BiPlusCircle } from "react-icons/bi";
import styles from "./RoundPicker.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@/main";

interface Props {
  rounds: number;
}

const RoundPicker = ({ rounds }: Props) => {
  const [roundsLocal, setRoundsLocal] = useState(rounds);
  const navigate = useNavigate();
  const { quizId, roundIdx: idxParam = 0 } = useParams();
  const roundIdx = +idxParam;

  const addRound = async () => {
    setRoundsLocal((prev) => prev + 1);
    await axios.post(`/api/quiz/addRound/${quizId}`);
    queryClient.refetchQueries({ queryKey: ["quizData"] });
  };

  const setSelected = (idx: number) => {
    navigate(`/quiz/edit/${quizId}/${idx}`);
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
