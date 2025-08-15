import { useQuestions } from "@/queries/quizData";
import textIcon from "assets/images/multiIcon_orange.png";
import imageIcon from "assets/images/imageIcon_orange.png";
import styles from "./ExistingQuestions.module.scss";
import { useCallback, useEffect, useState } from "react";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@/main";
import { IoSearch } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { debounce } from "@/utilities/debounce";

const icons: Partial<Record<QuestionType, string>> = {
  MULTI_TEXT: textIcon,
  PICTURE: imageIcon,
};
export default function ExistingQuestionsPicker() {
  const [inputVal, setInputVal] = useState<string>("");
  const { data, isLoading } = useQuestions();
  const [filteredItems, setFilteredItems] = useState<QuestionData[]>(
    data ?? []
  );
  const { quizId, roundIdx } = useParams();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const debounceSearch = useCallback(
    debounce((input: string) => {
      if (!data) return;
      console.log({ data, input });
      setFilteredItems(
        data?.filter((i) =>
          i.questionText.toLowerCase().includes(input.toLowerCase())
        )
      );
    }, 500),
    [data]
  );

  const handleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev: string[]) => prev.filter((i) => i !== id));
    } else {
      setSelectedItems((prev: string[]) => [...prev, id]);
    }
  };

  const handleSubmit = async () => {
    const { data } = await axios.post(`/api/question/add/existing`, {
      quizId,
      roundIdx,
      questionIds: selectedItems,
    });
    if (!data.error) {
      queryClient.refetchQueries({ queryKey: ["quizData"] });
      navigate(`/quiz/edit/${quizId}/${roundIdx}`);
    }
  };

  useEffect(() => {
    debounceSearch(inputVal);
  },[debounceSearch, inputVal])

  useEffect(() => {
    if (!data) return;
    setFilteredItems(data)
  },[data])

  return (
    <div className={`${styles.existiongContainer}`}>
      <div className={`${styles.topBar}`}>
        <div className={`${styles.radios}`}></div>
        <div className={`${styles.searchContainer}`}>
          <IoSearch className={styles.search} />
          <input
            autoFocus
            value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputVal(e.target.value)
            }
          />
          <TiDelete
            onClick={() => {
              setInputVal("");
              setFilteredItems(data!);
            }}
            className={styles.delete}
          />
        </div>
      </div>
      <div className={`${styles.questionsContainer}`}>
        {isLoading ? (
          <div className={styles.loadingDiv}>
            <p>FETCHING QUESTIONS</p>
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((question: QuestionData) => {
            const isSelected = selectedItems.includes(question._id);
            return (
              <div
                onClick={() => handleItem(question._id)}
                className={`${styles.questionBlock} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                <div className={`${styles.imgWrapper}`}>
                  <img src={icons[question.questionType]} />
                </div>
                <p>{question.questionText}</p>
              </div>
            );
          })
        ) : (
          <div className={styles.loadingDiv}>
            <p>NO RESULTS FOUND</p>
          </div>
        )}
      </div>
      <div className={`${styles.bottomBar}`}>
        <button
          onClick={handleSubmit}
          className={`${selectedItems.length === 0 ? styles.disabled : ""}`}
        >
          {" "}
          <MdOutlinePlaylistAddCheck /> Add selected
        </button>
      </div>
    </div>
  );
}
