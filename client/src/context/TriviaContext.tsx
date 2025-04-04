import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface TriviaState {
  questions: TriviaQuestion[];
  currentQuestion?: TriviaQuestion;
  nextQuestion: () => Promise<boolean>;
  getImgQuestion: () => Promise<TriviaImageQuestion>;
}

const defaultState: TriviaState = {
  questions: [] as TriviaQuestion[],
} as TriviaState;

const TriviaContext = createContext<TriviaState>(defaultState);
interface Props {
  children: React.ReactNode;
}
export const TriviaProvider = ({ children }: Props) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion>();

  const getQuestions = async () => {
    const { data } = await axios.get(`https://the-trivia-api.com/v2/questions`);
    return data;
  };

  const getImgQuestion = async () => {
    const { data } = await axios.get(`/api/trivia/image_round`);
    return data;
  }

  const getInitial = useCallback(async () => {
    const items = await getQuestions();
    setQuestions(items.slice(1));
    setCurrentQuestion(items[0]);
  }, []);

  const nextQuestion = async () => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setQuestions((prev: TriviaQuestion[]) => prev.slice(1));
    } else {
      await getInitial();
    }
    return true
  };

  useEffect(() => {
    getInitial();
  }, [getInitial]);

  return (
    <TriviaContext.Provider
      value={{ questions, currentQuestion, nextQuestion, getImgQuestion }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = (): TriviaState => useContext(TriviaContext);
