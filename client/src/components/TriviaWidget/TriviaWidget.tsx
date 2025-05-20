import { useState } from 'react';
import styles from './TriviaWidget.module.scss';
import bulb from '../../assets/images/bulb_orange.png';
import spinner from '../../assets/loaders/spin_green.svg';
import { ImShuffle } from 'react-icons/im';
import { TbCopy } from 'react-icons/tb';
import { useTrivia } from '../../context/TriviaContext';

const TriviaWidget = () => {
  const [ loading, toggleLoading] = useState<boolean>(false)
  const { currentQuestion, nextQuestion } = useTrivia()

  const handleNext = async () => {
    await nextQuestion();
    toggleLoading(false);
  };

  const handleShuffle = () => {
    toggleLoading(true)
    setTimeout(() => {
      handleNext()
    },1500)
  };
  
  return (
    <div
      className={`p-4 min-w-[300px] w-full relative bg-black1 rounded-lg border border-main1Dark mb-4`}
    >
      <div className={`flex items-center relative z-10`}>
        <img src={bulb} alt="bulb" className="mr-3 h-8 w-8" />
        <p className="m-0 text-main1 text-lg">Trivia</p>
      </div>
      <div
        className={`w-full min-h-16 flex flex-col items-center relative top-[-10px]`}
      >
        {loading && (
          <div
            className={`absolute top-o left-0 h-full w-full bg-black1 flex items-center justify-center`}
          >
            <img src={spinner} className={`h-14 w-14 mt-[-15px]`} />
          </div>
        )}
        <div className={`${styles.item}`}>
          <h6>Question:</h6>
          <p>{currentQuestion?.question.text}</p>
        </div>
        <div className={`${styles.item}`}>
          <h6>Answer:</h6>
          <p>{currentQuestion?.correctAnswer}</p>
        </div>
      </div>
      <div className={`${styles.icons}`}>
        <TbCopy />
        <ImShuffle onClick={handleShuffle} />
      </div>
    </div>
  );
}


export default TriviaWidget;